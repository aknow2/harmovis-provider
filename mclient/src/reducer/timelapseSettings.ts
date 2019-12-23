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

const defaultDuration = 2 * 60 * 60 * 1000; // 2 hour.
const defaultRange = 12 * 60 * 60 * 1000; // 12hour

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
    const { selectedStartDate, selectedEndDate } = state;
    const delta = (() => {
      if (!selectedStartDate || !selectedEndDate) {
        return defaultDuration;
      }
      return selectedEndDate.getTime() - selectedStartDate.getTime();
    })();
    const endDate = new Date(payload.getTime() + delta);
    console.log('selected date');
    console.log(delta);
    console.log(payload);
    console.log(endDate);
    return {
      ...state,
      selectedStartDate: payload,
      selectedEndDate: endDate
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
    const { rangeStartDate, rangeEndDate } = state;
    const delta = (() => {
      if (!rangeStartDate || !rangeEndDate) {
        return defaultRange;
      }
      return rangeEndDate.getTime() - rangeStartDate.getTime();
    })();
    return {
      ...state,
      rangeStartDate: payload,
      rangeEndDate: new Date(payload.getTime() + delta),
      selectedStartDate: payload,
      selectedEndDate: new Date(payload.getTime() + defaultDuration)
    };
  }
  if (isType(action, actions.setRangeEndDate)) {
    const { payload } = action;
    const { rangeStartDate } = state;
    if (payload.getTime() > rangeStartDate.getTime()) {
      return {
        ...state,
        rangeEndDate: payload
      };
    }
  }
  return state;
};
