import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { HeatmapState } from '../reducer/heatmapSettings';
import * as actions from '../actions/actions';

interface HeatmapRadiusRangeProps {
  min?: number;
  max?: number;
}

const HeatmapRadiusRange: React.FC<HeatmapRadiusRangeProps> = (
  props: HeatmapRadiusRangeProps
) => {
  const state = useSelector<any, HeatmapState>(st => {
    return st.heatmapSettings;
  });
  const dispatcher = useDispatch();
  const onChangeHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    dispatcher(actions.setHeatmapRadius(parseInt(ev.currentTarget.value, 10)));
  };
  const { min, max } = props;
  return (
    <div>
      {state.gridSize}
      <input
        type="range"
        value={state.gridSize}
        onChange={onChangeHandler}
        min={min}
        max={max}
      />
    </div>
  );
};

HeatmapRadiusRange.defaultProps = {
  min: 100,
  max: 5000
};

export default HeatmapRadiusRange;
