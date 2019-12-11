import { isType } from 'typescript-fsa';
import { Action } from 'redux';
import * as actions from '../actions/actions';
import { DurationUnit } from '../constants/timelapse';

export interface TimeLapseState {
  selecttedDurationUnit: DurationUnit;
  startDate: Date;
  endDate: Date;
  selectedStartDate: Date | null;
  duration: number;
  lowerCorner: number[];
  upperCorner: number[];
}

const initialState: TimeLapseState = {
  selecttedDurationUnit: DurationUnit.min,
  duration: 60,
  startDate: new Date(),
  endDate: new Date(),
  selectedStartDate: null,
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
  if (isType(action, actions.setDuration)) {
    const { payload } = action;
    return {
      ...state,
      duration: payload
    };
  }
  if (isType(action, actions.setDurationUnit)) {
    const { payload } = action;
    return {
      ...state,
      selecttedDurationUnit: payload
    };
  }
  return state;
};
