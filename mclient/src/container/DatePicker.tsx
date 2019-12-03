import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TimeLapseState, DurationUnit } from '../reducer/timelapseSettings';
import * as actions from '../actions/actions';

const dateString = (date: Date): string => {
  return date.toISOString().split('.')[0];
};

const DatePicker: React.FC<any> = prop => {
  const state = useSelector<any, TimeLapseState>(st => {
    return st.timelapseSettings;
  });
  const dispatcher = useDispatch();
  const onChangeDateHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const date = new Date(ev.currentTarget.value);
    debugger;
    dispatcher(actions.changeBeginPosition(date));
  };
  return (
    <div>
      <span>Date(begin position):</span>
      <input
        type="datetime-local"
        min={dateString(state.startDate)}
        max={dateString(state.endDate)}
        defaultValue={dateString(state.selectedStartDate)}
        onInput={onChangeDateHandler}
      />
      <div>
        <span>Duration(end position):</span>
        <div style={{ display: 'flex' }}>
          <input type="number" defaultValue={state.duration} />
          <select defaultValue={state.selecttedDurationUnit}>
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
