import React from 'react';
import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';
import { useSelector, useDispatch } from 'react-redux';
import { TimeLapseState } from '../reducer/timelapseSettings';
import { DurationUnit } from '../constants/timelapse';
import * as actions from '../actions/actions';

const dateString = (date: Date): string => {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const dateStr = new Date(date.getTime() - tzoffset).toISOString();
  const result = dateStr.split('.')[0];
  debugger;
  return result;
};

const defaultDate = new Date();

const DatePicker: React.FC<any> = prop => {
  const state = useSelector<any, TimeLapseState>(st => {
    return st.timelapseSettings;
  });
  const dispatcher = useDispatch();
  const onChangeStartDateHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(ev.currentTarget.value);
    dispatcher(actions.setStartDate(date));
  };
  const onChangeEndDateHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(ev.currentTarget.value);
    dispatcher(actions.setEndDate(date));
  };
  const date = state.selectedStartDate ? state.selectedStartDate : defaultDate;
  const endDate = state.selectedEndDate ? state.selectedEndDate : defaultDate;
  return (
    <div>
      <span>begin position</span>
      <input
        type="datetime-local"
        min={dateString(state.startDate)}
        max={dateString(state.endDate)}
        value={dateString(date)}
        onInput={onChangeStartDateHandler}
        onChange={onChangeStartDateHandler}
      />
      <span>begin position</span>
      <input
        type="datetime-local"
        min={dateString(state.startDate)}
        max={dateString(state.endDate)}
        value={dateString(date)}
        onInput={onChangeStartDateHandler}
        onChange={onChangeStartDateHandler}
      />
      <Range
        min={0}
        max={1000}
        count={2}
        tipFormatter={value => dateString(new Date(value))}
        value={[100, 400]}
        allowCross={false}
      />
    </div>
  );
};

export default React.memo(DatePicker);
