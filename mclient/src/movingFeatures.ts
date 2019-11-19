export interface Movinterface {
  boundedBy: TBoundedBy;

  members: Member[];

  header: Header;

  foliation: Foliation;
}

interface TBoundedBy {
  envelopeWithTimePeriod: EnvelopeWithTimePeriod;
}

interface EnvelopeWithTimePeriod {
  srsName: String;

  lowerCorner: number[];

  // left bottom lat lon
  upperCorner: number[];

  // top right lat lon
  beginPosition: Date;

  // begin time
  endPosition: Date; // end time
}

interface Member {
  movingFeature: MovingFeature;
}

interface MovingFeature {
  id: String;

  name: String;

  description: String;
}

interface Header {
  VaryingAttrDefs: AttrDef[];
}

interface AttrDef {
  name: String;

  simpleType: String[];

  // enum ex) Walk, Running
  attrAnnotation: String;
}

interface Foliation {
  orderType: OrderType;

  trajectoryList: AbstractTrajectory[];
}

enum OrderType {
  Time = 0,
  Sequential = 1
}

abstract class AbstractTrajectory {
  id: String;

  mfIdRef: String;

  // MovingFeature id ref
  start: number;

  end: number;

  posList: number[];

  // lat lon list
  attr: String[];

  //
  interpolation: String; // enum Lininear
}

export class LinearTrajectory extends AbstractTrajectory {
  interpolation = 'Linier';
}
