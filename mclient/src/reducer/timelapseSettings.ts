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

const startDate = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000);
const initialState: TimeLapseState = {
  startDate,
  endDate: new Date(),
  rangeStartDate: startDate,
  rangeEndDate: new Date(startDate.getTime() + defaultRange),
  selectedStartDate: startDate,
  selectedEndDate: new Date(startDate.getTime() + defaultDuration),
  lowerCorner: [],
  upperCorner: []
};

export default (state = initialState, action: Action): TimeLapseState => {
  if (isType(action, actions.setBounded)) {
    const {
      rangeStartDate,
      rangeEndDate,
      selectedStartDate,
      selectedEndDate
    } = state;
    const { payload } = action;
    const { start, end, lowerCorner, upperCorner } = payload;
    return {
      ...state,
      startDate: start,
      endDate: end,
      rangeStartDate:
        rangeStartDate.getTime() < start.getTime() ? start : rangeStartDate,
      rangeEndDate: rangeEndDate.getTime() > end.getTime() ? end : rangeEndDate,
      selectedStartDate:
        selectedStartDate.getTime() < start.getTime()
          ? start
          : selectedStartDate,
      selectedEndDate:
        selectedEndDate.getTime() > end.getTime() ? end : selectedEndDate,
      lowerCorner,
      upperCorner
    };
  }
  if (isType(action, actions.setRangeStartDate)) {
    const { payload } = action;
    const { rangeStartDate, rangeEndDate, endDate } = state;
    const delta = (() => {
      if (!rangeStartDate || !rangeEndDate) {
        return defaultRange;
      }
      return rangeEndDate.getTime() - rangeStartDate.getTime();
    })();
    let newRangeEndDate = new Date(payload.getTime() + delta);
    if (newRangeEndDate.getTime() > endDate.getTime()) {
      newRangeEndDate = endDate;
    }
    let newSelectedEndDate = new Date(payload.getTime() + defaultDuration);
    if (newSelectedEndDate.getTime() > newRangeEndDate.getTime()) {
      newSelectedEndDate = newRangeEndDate;
    }
    return {
      ...state,
      rangeStartDate: payload,
      rangeEndDate: newRangeEndDate,
      selectedStartDate: payload,
      selectedEndDate: newSelectedEndDate
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
  if (isType(action, actions.setSelectedStartDate)) {
    const { payload } = action;
    const { selectedStartDate, selectedEndDate, rangeEndDate } = state;
    const delta = (() => {
      if (!selectedStartDate || !selectedEndDate) {
        return defaultDuration;
      }
      return selectedEndDate.getTime() - selectedStartDate.getTime();
    })();
    let endDate = new Date(payload.getTime() + delta);
    if (endDate.getTime() > rangeEndDate.getTime()) {
      endDate = rangeEndDate;
    }
    return {
      ...state,
      selectedStartDate: payload,
      selectedEndDate: endDate
    };
  }
  if (isType(action, actions.setSelectedEndDate)) {
    const { selectedStartDate } = state;
    const { payload } = action;
    if (payload.getTime() > selectedStartDate.getTime()) {
      return {
        ...state,
        selectedEndDate: payload
      };
    }
  }
  return state;
};
