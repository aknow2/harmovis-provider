import actionCreatorFactory from 'typescript-fsa';
import HeatmapType from '../constants/heatmapTypes';

const actionCreator = actionCreatorFactory();

export const setHeatmapRadius = actionCreator<number>('SET_HEATMAP_SIZE');
export const setParticleCount = actionCreator<number>('SET_PARTICLE_COUNT');
export const toggleHeatmap = actionCreator<boolean>('TOGGLE_HEATMAP');
export const selectHeatmapType = actionCreator<HeatmapType>(
  'CHANGE_HEATMAP_TYPE'
);
export const extrudeHeatmap = actionCreator<boolean>('EXTRUDE_HEATMAP');
export const subscribeFleet = actionCreator<void>('SUBSCRIBE_FLEET');
