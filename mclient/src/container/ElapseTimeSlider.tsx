import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ElapsedTimeRange } from 'harmoware-vis';
import { TimeLapseState } from '../reducer/timelapseSettings';

interface Props {
  settime: number;
  timeLength: number;
  timeBegin: number;
  actions: any;
}

const formatTime = (begin: number, time: number) => {
  const date = new Date(time * 1000);
  return `${date.getFullYear()}/${date.getMonth() +
    1}/${date.getDate()}/${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

const ElapsedTimeSlider: React.FC<any> = ({
  settime,
  timeLength,
  timeBegin,
  actions
}: Props) => {
  const state = useSelector<any, TimeLapseState>(st => {
    return st.timelapseSettings;
  });
  return (
    <div>
      <p>
        time:
        {formatTime(state.startDate.getTime(), settime)}
      </p>
      <ElapsedTimeRange
        settime={settime}
        timeLength={timeLength}
        timeBegin={timeBegin}
        actions={actions}
      />
    </div>
  );
};

export default React.memo(ElapsedTimeSlider);
