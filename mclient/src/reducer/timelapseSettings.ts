import { isType } from 'typescript-fsa';
import { Action } from 'redux';
import * as actions from '../actions/actions';
import { DurationUnit } from '../constants/timelapse';

export interface TimeLapseState {
  startDate: Date;
  endDate: Date;
  selectedStartDate: Date | null;
  selectedEndDate: Date|null,
  lowerCorner: number[];
  upperCorner: number[];
}

const initialState: TimeLapseState = {
  startDate: new Date(),
  endDate: new Date(),
  selectedStartDate: null,
  selectedEndDate: null,
  lowerCorner: [],
  upperCorner: []
};

export default (state = initialState, action: Action): TimeLapseState => {
  if (isType(action, actions.setBounded)) {
    const { payload } = action;
    debugger;
    return {
      ...state,
      startDate: payload.start,
      endDate: payload.end,
      lowerCorner: payload.lowerCorner,
      upperCorner: payload.upperCorner
    };
  }
  if (isType(action, actions.setStartDate)) {
    const { payload } = action;
    return {
      ...state,
      selectedStartDate: payload
    };
  }
  if (isType(action, actions.setEndDate)) {
    const { payload } = action;
    return {
      ...state,
      selectedEndDate: payload
    };
  }
  return state;
};
