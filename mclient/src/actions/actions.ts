import actionCreatorFactory from 'typescript-fsa';
import HeatmapType from '../constants/heatmapTypes';
import { DurationUnit } from '../constants/timelapse';

const actionCreator = actionCreatorFactory();
export interface Bounded {
  start: Date;
  end: Date;
  lowerCorner: number[];
  upperCorner: number[];
}
export const setHeatmapRadius = actionCreator<number>('SET_HEATMAP_SIZE');
export const setParticleCount = actionCreator<number>('SET_PARTICLE_COUNT');
export const toggleHeatmap = actionCreator<boolean>('TOGGLE_HEATMAP');
export const selectHeatmapType = actionCreator<HeatmapType>(
  'CHANGE_HEATMAP_TYPE'
);
export const extrudeHeatmap = actionCreator<boolean>('EXTRUDE_HEATMAP');
export const subscribeFleet = actionCreator<void>('SUBSCRIBE_FLEET');
export const updateFromMovingFeatures = actionCreator<any>(
  'UPDATE_FROM_MOVING_FEATURE'
);
export const demandMovingFeatures = actionCreator<Bounded>(
  'DEMAND_MOVING_FEATURES'
);
export const setSocketClient = actionCreator<SocketIOClient.Socket>(
  'SET_SOCKET_CLIENT'
);

export const setBounded = actionCreator<Bounded>('SET_BOUNDED');
export const demandBounded = actionCreator<void>('DEMAND_BOUNDED');
export const changeBeginPosition = actionCreator<Date>('CHANGE_BEGIN_POSITION');
export const fetchInitialData = actionCreator<void>('FETCH_INITIAL_DATA');
export const setStartDate = actionCreator<Date>('SET_START_DATE');
export const setDurationUnit = actionCreator<DurationUnit>('SET_DURATION_UNIT');
export const setDuration = actionCreator<number>('SET_DURATION');
