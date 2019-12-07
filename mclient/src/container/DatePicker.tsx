import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TimeLapseState } from '../reducer/timelapseSettings';
import { DurationUnit } from '../constants/timelapse';
import * as actions from '../actions/actions';

const dateString = (date: Date): string => {
  return date.toISOString().split('.')[0];
};

const defaultDate = new Date();

const DatePicker: React.FC<any> = prop => {
  const state = useSelector<any, TimeLapseState>(st => {
    return st.timelapseSettings;
  });
  const dispatcher = useDispatch();
  const onChangeDateHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(ev.currentTarget.value);
    dispatcher(actions.setStartDate(date));
  };
  const onChangeDurationHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const duration = parseInt(ev.currentTarget.value, 10);
    if (!Number.isNaN(duration)) {
      dispatcher(actions.setDuration(duration));
    }
  };
  const onChangeDurationUnitHandler = (
    ev: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const unit = ev.currentTarget.value as DurationUnit;
    dispatcher(actions.setDurationUnit(unit));
  };
  const date = state.selectedStartDate ? state.selectedStartDate : defaultDate;
  return (
    <div>
      <span>Date(begin position):</span>
      <input
        type="datetime-local"
        min={dateString(state.startDate)}
        max={dateString(state.endDate)}
        value={dateString(date)}
        onInput={onChangeDateHandler}
        onChange={onChangeDateHandler}
      />
      <div>
        <span>Duration(end position):</span>
        <div style={{ display: 'flex' }}>
          <input
            type="number"
            value={state.duration}
            onChange={onChangeDurationHandler}
          />
          <select
            value={state.selecttedDurationUnit}
            onChange={onChangeDurationUnitHandler}
          >
            {Object.keys(DurationUnit).map(value => {
              return <option key={value} value={value} label={value} />;
            })}
          </select>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DatePicker);
