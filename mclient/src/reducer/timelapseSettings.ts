import { isType } from 'typescript-fsa';
import { Action } from 'redux';
import * as actions from '../actions/actions';

export interface TimeLapseState {
  startDate: Date;
  endDate: Date;
  rangeStartDate: Date | null;
  rangeEndDate: Date | null;
  selectedStartDate: Date | null;
  selectedEndDate: Date | null;
  lowerCorner: number[];
  upperCorner: number[];
}

const initialState: TimeLapseState = {
  startDate: new Date(),
  endDate: new Date(),
  rangeStartDate: null,
  rangeEndDate: null,
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
  if (isType(action, actions.setSelectedStartDate)) {
    const { payload } = action;
    return {
      ...state,
      selectedStartDate: payload
    };
  }
  if (isType(action, actions.setSelectedEndDate)) {
    const { payload } = action;
    return {
      ...state,
      selectedEndDate: payload
    };
  }
  if (isType(action, actions.setRangeStartDate)) {
    const { payload } = action;
    return {
      ...state,
      rangeStartDate: payload
    };
  }
  if (isType(action, actions.setRangeEndDate)) {
    const { payload } = action;
    return {
      ...state,
      rangeEndDate: payload
    };
  }
  return state;
};
