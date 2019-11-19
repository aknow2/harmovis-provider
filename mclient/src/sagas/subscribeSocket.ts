import { all, fork, call, take } from 'redux-saga/effects';
import io from 'socket.io-client';
import { eventChannel } from 'redux-saga';

const connectSocket = () => {
  const socket = io('http://localhost:10080');
  debugger;
  return new Promise(resolve => {
    debugger;
    socket.on('connect', () => {
      debugger;
      resolve(socket);
    });
  });
};
function createSocketChannel(socket: SocketIOClient.Socket) {
  return eventChannel(emit => {
    const eventHandler = event => {
      console.log(event);
    };
    const errorHandler = errorEvent => {
      emit(new Error(errorEvent.reason));
    };
    socket.on('event', eventHandler);
    socket.on('error', errorHandler);
    const unsubscribe = () => {
      socket.off('ping', eventHandler);
    };
    return unsubscribe;
  });
}

function* watchOnData() {
  const socket = yield call(connectSocket);
  const socketChannel = yield call(createSocketChannel, socket);
  try {
    const payload = yield take(socketChannel);
    console.log(payload);
  } catch (e) {
    console.log(e);
  }
}

export default function* rootSaga() {
  debugger;
  yield all([fork(watchOnData)]);
}
