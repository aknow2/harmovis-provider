class MovingFeatures {
  header: Header;
  members: Member[];
  foliation: Foliation;
  boundedBy: TBoundedBy;
}
class TBoundedBy {
  envelopeWithTimePeriod: EnvelopeWithTimePeriod;
}

class EnvelopeWithTimePeriod {
  srsName: String;
  lowerCorner: number[][];
  upperCorner: number[][];
  beginPosition: Date;
  endPosition: Date;
}

class Member {
  id: String;
}

class MovingFeature {
  id: String;
  name: String;
}

class Header {
  hints?: Hints;
  varingAttrDefs: VaryingAttrDefs;
}

class Hints {
  hint: Hint[]
}

class Hint {
  type: hintType;
  text: String;
}

type hintType = String;

class VaryingAttrDefs {
  attrDefs: AttrDef[]; 
}

class AttrDef {
  type: String;
  attrAnnotation: AttrAnnotation;
}

class AttrAnnotation {
  text: String;
}

type simpleType = String;


type AbstractFeatureType = String;

interface FeaturePropertyType {
  ext_ref_1
}

interface Foliation {
  orderType: OrderType;
}

enum OrderType {
  Time,
  Sequential,
}

abstract class AbstractTrajectory {
  mfIdRef: String;
  end: number;
  start: number;
  modelGroup: ModelGroup1;
  interpolationType: InterpolationType;
}

enum InterpolationType {
  Linear,
}

class ModelGroup1 {
  ext_ref_2: number[][]; // pos list
}

class ModelGroup2 {
  ext_ref_3: number[]; // pos
  ext_ref_4: PointProperty;
}

class PointProperty {}

class LinearTrajectory<A> extends AbstractTrajectory {
  ext_ref_5: number[][] // poslist
  attr: A;
}
