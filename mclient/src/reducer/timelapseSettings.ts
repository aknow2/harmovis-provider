import { isType } from 'typescript-fsa';
import { Action } from 'redux';
import * as actions from '../actions/actions';

export interface TimeLapseState {
  selecttedDurationUnit: DurationUnit;
  startDate: Date;
  endDate: Date;
  selectedStartDate: Date;
  duration: number;
  lowerCorner: number[];
  upperCorner: number[];
}

export enum DurationUnit {
  seconds = 'secondes',
  min = 'min',
  hour = 'hour',
  day = 'day',
  month = 'month'
}

const initialState: TimeLapseState = {
  selecttedDurationUnit: DurationUnit.min,
  duration: 60,
  startDate: new Date(),
  endDate: new Date(),
  selectedStartDate: new Date(),
  lowerCorner: [],
  upperCorner: []
};

export default (state = initialState, action: Action): TimeLapseState => {
  if (isType(action, actions.setBounded)) {
    const { payload } = action;
    return {
      ...state,
      startDate: payload.start,
      endDate: payload.end,
      selectedStartDate: payload.start,
      lowerCorner: payload.lowerCorner,
      upperCorner: payload.upperCorner
    };
  }
  return state;
};
