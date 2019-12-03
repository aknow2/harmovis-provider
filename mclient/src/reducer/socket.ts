import { isType } from 'typescript-fsa';
import { Action } from 'redux';
import * as actions from '../actions/actions';

export interface SocketState {
  client?: SocketIOClient.Socket;
}

const initialState: SocketState = {};

export default (state = initialState, action: Action): SocketState => {
  if (isType(action, actions.setSocketClient)) {
    return {
      ...state,
      client: action.payload
    };
  }
  return state;
};
