import React from 'react';
import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';
import { useSelector, useDispatch } from 'react-redux';
import { TimeLapseState } from '../reducer/timelapseSettings';
import * as actions from '../actions/actions';
import './datePicker.scss';

const dateString = (date: Date): string => {
  const tzoffset = new Date().getTimezoneOffset() * 60000;
  const dateStr = new Date(date.getTime() - tzoffset).toISOString();
  const result = dateStr.split('.')[0];
  return result;
};

const formatTime = (time: number) => {
  const date = new Date(time);
  return `${date.getFullYear()}/${date.getMonth() +
    1}/${date.getDate()}/${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

const defaultDate = new Date();

interface Props {
  settime: number;
}

const dotted: React.CSSProperties = {
  borderTop: '10px dotted #fff',
  borderRight: 'none',
  borderLeft: 'none',
  borderBottom: 'none'
};

const DatePicker: React.FC<Props> = prop => {
  const { settime } = prop;
  const state = useSelector<any, TimeLapseState>(st => {
    return st.timelapseSettings;
  });
  const dispatcher = useDispatch();
  const onChangeRangeStartDateHandler = (
    ev: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = new Date(ev.currentTarget.value);
    dispatcher(actions.setRangeStartDate(date));
  };
  const onChangeRangeEndDateHandler = (
    ev: React.ChangeEvent<HTMLInputElement>
  ) => {
    const date = new Date(ev.currentTarget.value);
    dispatcher(actions.setRangeEndDate(date));
  };
  const onChangeRange = (positions: number[]) => {
    debugger;
    const startTime = positions[0];
    const current = positions[0];
    const endTime = positions[0];
    dispatcher(actions.setSelectedStartDate(new Date(startTime)));
    dispatcher(actions.setSelectedEndDate(new Date(endTime)));
  };
  const selectedStartDate = state.selectedStartDate
    ? state.selectedStartDate
    : defaultDate;
  const selectedEndDate = state.selectedEndDate
    ? state.selectedEndDate
    : defaultDate;
  const rangeStartDate = state.rangeStartDate
    ? state.rangeStartDate
    : defaultDate;
  const rangeEndDate = state.rangeEndDate ? state.rangeEndDate : defaultDate;
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <div
          style={{
            width: '15%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div>
            <span className="p-left arrow-left-down">
              {formatTime(state.startDate.getTime())}
            </span>
          </div>
          <div>
            <hr style={dotted} />
          </div>
        </div>
        <div
          style={{
            width: '70%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between'
            }}
          >
            <div className="p-left arrow-left-down">
              <input
                type="datetime-local"
                min={dateString(state.startDate)}
                max={dateString(rangeEndDate)}
                value={dateString(rangeStartDate)}
                onInput={onChangeRangeStartDateHandler}
                onChange={onChangeRangeStartDateHandler}
              />
            </div>
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              time:
              {formatTime(settime * 1000)}
            </div>
            <div className="p-right arrow-right-down">
              <input
                type="datetime-local"
                min={dateString(rangeStartDate)}
                max={dateString(state.endDate)}
                value={dateString(rangeEndDate)}
                onInput={onChangeRangeEndDateHandler}
                onChange={onChangeRangeEndDateHandler}
              />
            </div>
          </div>
          <div>
            <Range
              min={rangeStartDate.getTime()}
              max={rangeEndDate.getTime()}
              count={3}
              tipFormatter={value => dateString(new Date(value))}
              onChange={onChangeRange}
              value={[
                selectedStartDate.getTime(),
                settime * 1000,
                selectedEndDate.getTime()
              ]}
              allowCross={false}
            />
          </div>
        </div>
        <div
          style={{
            width: '15%',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div
            style={{
              textAlign: 'right'
            }}
          >
            <span className="p-right arrow-right-down">
              {formatTime(state.endDate.getTime())}
            </span>
          </div>
          <div>
            <hr style={dotted} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DatePicker);
