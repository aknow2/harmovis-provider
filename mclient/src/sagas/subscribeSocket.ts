import {
  all,
  fork,
  call,
  take,
  select,
  put,
  takeEvery
} from 'redux-saga/effects';
import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';
import { Actions as HarmovisActions, Movesbase } from 'harmoware-vis';
import { MovingFeatures } from '../constants/movingFeatures_pb';
import {
  updateFromMovingFeatures,
  demandMovingFeatures,
  PeriodDate,
  setSocketClient,
  demandBounded,
  setBounded
} from '../actions/actions';

const UPDATE_FLEET_OBJECT = 'UPDATE_FLEET_OBJECT';

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
    const fleetHandler = (socketData: string) => {
      const obj = JSON.parse(socketData);
      emit({
        type: UPDATE_FLEET_OBJECT,
        payload: obj
      });
    };
    const errorHandler = errorEvent => {
      emit(new Error(errorEvent.reason));
    };

    const boundedByHandler = (bounded: any) => {
      emit(
        setBounded({
          start: new Date(bounded.beginPosition.seconds * 1000),
          end: new Date(bounded.endPosition.seconds * 1000),
          lowerCorner: bounded.lowerCorner,
          upperCorner: bounded.upperCorner
        })
      );
    };
    const movingFeaturesHandler = (movingFeatures: MovingFeatures) => {
      emit(updateFromMovingFeatures(movingFeatures));
    };
    socket.on('fleet', fleetHandler);
    socket.on('bounded_by', boundedByHandler);
    socket.on('moving_features', movingFeaturesHandler);
    socket.on('error', errorHandler);
    const unsubscribe = () => {
      socket.off('fleet', fleetHandler);
      socket.off('period_date', boundedByHandler);
      socket.off('moving_features', movingFeaturesHandler);
    };

    socket.emit('demand_bounded_by', {});
    return unsubscribe;
  });
}

interface FleetData {
  mtype: any;
  id: any;
  lat: number;
  lon: number;
  angle: number;
  speed: number;
}

function* doUpdateFromMovingFeatures(action) {
  const { boundedBy, foliation } = action.payload;
  const startTime = boundedBy.beginPosition.seconds;
  const trajectories = foliation.trajectory as any[];
  const movesbases = [];
  trajectories.forEach(trajectory => {
    const tstart = trajectory.start ? trajectory.start : 0;
    const departuretime = startTime + tstart;
    const arrivaltime = startTime + trajectory.end;
    const movebase = movesbases.find(
      m => m.id === trajectory.mfIdRef
    ) as Movesbase;
    const { posList } = trajectory;
    if (movebase) {
      movebase.departuretime =
        departuretime < movebase.departuretime
          ? departuretime
          : movebase.departuretime;
      movebase.arrivaltime =
        arrivaltime > movebase.arrivaltime ? arrivaltime : movebase.arrivaltime;
      movebase.operation.push({
        elapsedtime: arrivaltime,
        position: [posList[2], posList[3], 0]
      } as any);
    } else {
      movesbases.push({
        id: trajectory.mfIdRef,
        departuretime,
        arrivaltime,
        operation: [
          {
            elapsedtime: 0,
            position: [posList[0], posList[1], 0]
          },
          {
            elapsedtime: arrivaltime,
            position: [posList[2], posList[3], 0]
          }
        ]
      });
    }
  });
  yield put(HarmovisActions.updateMovesBase(movesbases));
}

function* updateFleetObject({ type, payload }) {
  const state = yield select();
  const { mtype, id, lat, lon, angle, speed } = payload;
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
  yield put(setSocketClient(socket));
  const socketChannel = yield call(createSocketChannel, socket);
  while (true) {
    try {
      const action = yield take(socketChannel);
      yield put(action);
    } catch (e) {
      socketChannel.close();
    }
  }
}

function* doDemandMovingFeatures(action) {
  const state = yield select();
  const { client } = state.socket;
  const periodDate = action.payload as PeriodDate;
  const requirePeriod = {
    start: periodDate.start.getTime() / 1000,
    end: periodDate.end.getTime() / 1000,
    lowerCorner: [136.9536, 34.9721],
    upperCorner: [137.1933, 34.9999]
  };
  client.emit('demand_moving_features', requirePeriod);
}

function* doDemandBounded(action) {
  const state = yield select();
  const { client } = state.socket;
  client.emit('demand_bounded_by', {});
}

export default function* rootSaga() {
  yield all([
    takeEvery(UPDATE_FLEET_OBJECT, updateFleetObject),
    takeEvery(updateFromMovingFeatures, doUpdateFromMovingFeatures),
    takeEvery(demandMovingFeatures, doDemandMovingFeatures),
    takeEvery(demandBounded, doDemandBounded),
    fork(watchOnData)
  ]);
}
