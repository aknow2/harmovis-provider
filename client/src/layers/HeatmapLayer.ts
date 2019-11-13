import { LayerProps, CompositeLayer, HexagonLayer, GridLayer } from 'deck.gl';
import { MovedData } from 'harmoware-vis';
import HeatmapType from '../constants/heatmapTypes';

interface HeatmapLayerProps extends LayerProps {
  type: HeatmapType;
  movedData: MovedData[];
  size: number;
  extruded: boolean;
}

export default class HeatmapLayer extends CompositeLayer<HeatmapLayerProps> {
  static layerName = 'HeatmapLayer';

  renderLayers() {
    const { movedData, type, size, visible, extruded } = this.props;
    if (type === HeatmapType.Hexagon) {
      return [
        new HexagonLayer({
          visible,
          extruded,
          opacity: 0.1,
          elevationScale: 10,
          data: movedData,
          radius: size,
          getPosition: (d: MovedData) => [
            d.longitude as number,
            d.latitude as number
          ]
        })
      ];
    }
    return [
      new GridLayer({
        visible,
        extruded,
        opacity: 0.1,
        elevationScale: 10,
        cellSize: size,
        data: movedData,
        getPosition: (d: MovedData) => [
          d.longitude as number,
          d.latitude as number
        ]
      })
    ];
  }
}
