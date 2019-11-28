import { all, fork, call, take, select, put } from 'redux-saga/effects';
import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { Actions as HarmovisActions } from 'harmoware-vis';

const connectSocket = () => {
  return new Promise(resolve => {
    const socket = io('http://localhost:10080');
    socket.on('connect', () => {
      console.log('connected socket');
      resolve(socket);
    });
  });
};
function createSocketChannel(socket: SocketIOClient.Socket) {
  return eventChannel(emit => {
    const eventHandler = (socketData: string) => {
      const obj = JSON.parse(socketData);
      emit(obj);
    };
    const errorHandler = errorEvent => {
      emit(new Error(errorEvent.reason));
    };

    const periodDateHandler = (periodStr: string) => {
      console.log(periodStr);
    };
    const movingFeaturesHandler = (periodStr: string) => {
      debugger;
      console.log(periodStr);
    };
    socket.on('event', eventHandler);
    socket.on('period_date', periodDateHandler);
    socket.on('moving_features', movingFeaturesHandler);
    socket.on('error', errorHandler);
    const unsubscribe = () => {
      socket.off('event', eventHandler);
      socket.off('period_date', periodDateHandler);
      socket.off('moving_features', movingFeaturesHandler);
    };
    socket.emit('demand_moving_features', 'test');
    return unsubscribe;
  });
}

interface SocketData {
  mtype: any;
  id: any;
  lat: number;
  lon: number;
  angle: number;
  speed: number;
}

function* updateMovesObject(socketData: SocketData) {
  const state = yield select();
  const { mtype, id, lat, lon, angle, speed } = socketData;
  const time = Date.now() / 1000;
  let hit = false;
  const movesbasedata = [...state.base.movesbase];
  const setMovesbase = [];
  for (let i = 0, lengthi = movesbasedata.length; i < lengthi; i += 1) {
    const setMovedata = movesbasedata[i];
    if (mtype === setMovedata.mtype && id === setMovedata.id) {
      hit = true;
      setMovedata.arrivaltime = time;
      setMovedata.operation.push({
        elapsedtime: time,
        position: [lon, lat, 0],
        angle,
        speed
      });
    }
    setMovesbase.push(setMovedata);
  }
  if (!hit) {
    setMovesbase.push({
      mtype,
      id,
      departuretime: time,
      arrivaltime: time,
      operation: [
        {
          elapsedtime: time,
          position: [lon, lat, 0],
          angle,
          speed
        }
      ]
    });
  }
  yield put(HarmovisActions.updateMovesBase(setMovesbase));
}

function* watchOnData() {
  const socket = yield call(connectSocket);
  const socketChannel = yield call(createSocketChannel, socket);
  while (true) {
    try {
      const payload = yield take(socketChannel);
      yield call(updateMovesObject, payload);
    } catch (e) {
      console.log(e);
      socketChannel.close();
    }
  }
}

export default function* rootSaga() {
  yield all([fork(watchOnData)]);
}
