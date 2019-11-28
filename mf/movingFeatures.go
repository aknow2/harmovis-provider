package harmovis

import (
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
	timestamp "github.com/golang/protobuf/ptypes/timestamp"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion3 // please upgrade the proto package

type OrderType int32

const (
	OrderType_Time       OrderType = 0
	OrderType_Sequential OrderType = 1
)

var OrderType_name = map[int32]string{
	0: "Time",
	1: "Sequential",
}

var OrderType_value = map[string]int32{
	"Time":       0,
	"Sequential": 1,
}

func (x OrderType) String() string {
	return proto.EnumName(OrderType_name, int32(x))
}

func (OrderType) EnumDescriptor() ([]byte, []int) {
	return fileDescriptor_877f27c0ba68f7eb, []int{0}
}

type MovingFeatures struct {
	BoundedBy            *TBoundedBy `protobuf:"bytes,1,opt,name=boundedBy,proto3" json:"boundedBy,omitempty"`
	Members              []*Member   `protobuf:"bytes,2,rep,name=members,proto3" json:"members,omitempty"`
	Header               *Header     `protobuf:"bytes,3,opt,name=header,proto3" json:"header,omitempty"`
	Foliation            *Foliation  `protobuf:"bytes,4,opt,name=foliation,proto3" json:"foliation,omitempty"`
	XXX_NoUnkeyedLiteral struct{}    `json:"-"`
	XXX_unrecognized     []byte      `json:"-"`
	XXX_sizecache        int32       `json:"-"`
}

func (m *MovingFeatures) Reset()         { *m = MovingFeatures{} }
func (m *MovingFeatures) String() string { return proto.CompactTextString(m) }
func (*MovingFeatures) ProtoMessage()    {}
func (*MovingFeatures) Descriptor() ([]byte, []int) {
	return fileDescriptor_877f27c0ba68f7eb, []int{0}
}

func (m *MovingFeatures) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_MovingFeatures.Unmarshal(m, b)
}
func (m *MovingFeatures) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_MovingFeatures.Marshal(b, m, deterministic)
}
func (m *MovingFeatures) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MovingFeatures.Merge(m, src)
}
func (m *MovingFeatures) XXX_Size() int {
	return xxx_messageInfo_MovingFeatures.Size(m)
}
func (m *MovingFeatures) XXX_DiscardUnknown() {
	xxx_messageInfo_MovingFeatures.DiscardUnknown(m)
}

var xxx_messageInfo_MovingFeatures proto.InternalMessageInfo

func (m *MovingFeatures) GetBoundedBy() *TBoundedBy {
	if m != nil {
		return m.BoundedBy
	}
	return nil
}

func (m *MovingFeatures) GetMembers() []*Member {
	if m != nil {
		return m.Members
	}
	return nil
}

func (m *MovingFeatures) GetHeader() *Header {
	if m != nil {
		return m.Header
	}
	return nil
}

func (m *MovingFeatures) GetFoliation() *Foliation {
	if m != nil {
		return m.Foliation
	}
	return nil
}

type TBoundedBy struct {
	EnvelopeWithTimePeriod *EnvelopeWithTimePeriod `protobuf:"bytes,1,opt,name=envelopeWithTimePeriod,proto3" json:"envelopeWithTimePeriod,omitempty"`
	XXX_NoUnkeyedLiteral   struct{}                `json:"-"`
	XXX_unrecognized       []byte                  `json:"-"`
	XXX_sizecache          int32                   `json:"-"`
}

func (m *TBoundedBy) Reset()         { *m = TBoundedBy{} }
func (m *TBoundedBy) String() string { return proto.CompactTextString(m) }
func (*TBoundedBy) ProtoMessage()    {}
func (*TBoundedBy) Descriptor() ([]byte, []int) {
	return fileDescriptor_877f27c0ba68f7eb, []int{1}
}

func (m *TBoundedBy) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_TBoundedBy.Unmarshal(m, b)
}
func (m *TBoundedBy) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_TBoundedBy.Marshal(b, m, deterministic)
}
func (m *TBoundedBy) XXX_Merge(src proto.Message) {
	xxx_messageInfo_TBoundedBy.Merge(m, src)
}
func (m *TBoundedBy) XXX_Size() int {
	return xxx_messageInfo_TBoundedBy.Size(m)
}
func (m *TBoundedBy) XXX_DiscardUnknown() {
	xxx_messageInfo_TBoundedBy.DiscardUnknown(m)
}

var xxx_messageInfo_TBoundedBy proto.InternalMessageInfo

func (m *TBoundedBy) GetEnvelopeWithTimePeriod() *EnvelopeWithTimePeriod {
	if m != nil {
		return m.EnvelopeWithTimePeriod
	}
	return nil
}

type EnvelopeWithTimePeriod struct {
	SrsName              string               `protobuf:"bytes,1,opt,name=srsName,proto3" json:"srsName,omitempty"`
	LowerCorner          []float32            `protobuf:"fixed32,2,rep,packed,name=lowerCorner,proto3" json:"lowerCorner,omitempty"`
	UpperCorner          []float32            `protobuf:"fixed32,3,rep,packed,name=upperCorner,proto3" json:"upperCorner,omitempty"`
	BeginPosition        *timestamp.Timestamp `protobuf:"bytes,4,opt,name=beginPosition,proto3" json:"beginPosition,omitempty"`
	EndPosition          *timestamp.Timestamp `protobuf:"bytes,5,opt,name=endPosition,proto3" json:"endPosition,omitempty"`
	XXX_NoUnkeyedLiteral struct{}             `json:"-"`
	XXX_unrecognized     []byte               `json:"-"`
	XXX_sizecache        int32                `json:"-"`
}

func (m *EnvelopeWithTimePeriod) Reset()         { *m = EnvelopeWithTimePeriod{} }
func (m *EnvelopeWithTimePeriod) String() string { return proto.CompactTextString(m) }
func (*EnvelopeWithTimePeriod) ProtoMessage()    {}
func (*EnvelopeWithTimePeriod) Descriptor() ([]byte, []int) {
	return fileDescriptor_877f27c0ba68f7eb, []int{2}
}

func (m *EnvelopeWithTimePeriod) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_EnvelopeWithTimePeriod.Unmarshal(m, b)
}
func (m *EnvelopeWithTimePeriod) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_EnvelopeWithTimePeriod.Marshal(b, m, deterministic)
}
func (m *EnvelopeWithTimePeriod) XXX_Merge(src proto.Message) {
	xxx_messageInfo_EnvelopeWithTimePeriod.Merge(m, src)
}
func (m *EnvelopeWithTimePeriod) XXX_Size() int {
	return xxx_messageInfo_EnvelopeWithTimePeriod.Size(m)
}
func (m *EnvelopeWithTimePeriod) XXX_DiscardUnknown() {
	xxx_messageInfo_EnvelopeWithTimePeriod.DiscardUnknown(m)
}

var xxx_messageInfo_EnvelopeWithTimePeriod proto.InternalMessageInfo

func (m *EnvelopeWithTimePeriod) GetSrsName() string {
	if m != nil {
		return m.SrsName
	}
	return ""
}

func (m *EnvelopeWithTimePeriod) GetLowerCorner() []float32 {
	if m != nil {
		return m.LowerCorner
	}
	return nil
}

func (m *EnvelopeWithTimePeriod) GetUpperCorner() []float32 {
	if m != nil {
		return m.UpperCorner
	}
	return nil
}

func (m *EnvelopeWithTimePeriod) GetBeginPosition() *timestamp.Timestamp {
	if m != nil {
		return m.BeginPosition
	}
	return nil
}

func (m *EnvelopeWithTimePeriod) GetEndPosition() *timestamp.Timestamp {
	if m != nil {
		return m.EndPosition
	}
	return nil
}

type Member struct {
	MovingFeature        *MovingFeature `protobuf:"bytes,1,opt,name=movingFeature,proto3" json:"movingFeature,omitempty"`
	XXX_NoUnkeyedLiteral struct{}       `json:"-"`
	XXX_unrecognized     []byte         `json:"-"`
	XXX_sizecache        int32          `json:"-"`
}

func (m *Member) Reset()         { *m = Member{} }
func (m *Member) String() string { return proto.CompactTextString(m) }
func (*Member) ProtoMessage()    {}
func (*Member) Descriptor() ([]byte, []int) {
	return fileDescriptor_877f27c0ba68f7eb, []int{3}
}

func (m *Member) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Member.Unmarshal(m, b)
}
func (m *Member) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Member.Marshal(b, m, deterministic)
}
func (m *Member) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Member.Merge(m, src)
}
func (m *Member) XXX_Size() int {
	return xxx_messageInfo_Member.Size(m)
}
func (m *Member) XXX_DiscardUnknown() {
	xxx_messageInfo_Member.DiscardUnknown(m)
}

var xxx_messageInfo_Member proto.InternalMessageInfo

func (m *Member) GetMovingFeature() *MovingFeature {
	if m != nil {
		return m.MovingFeature
	}
	return nil
}

type MovingFeature struct {
	Id                   string   `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	Name                 string   `protobuf:"bytes,2,opt,name=name,proto3" json:"name,omitempty"`
	Description          string   `protobuf:"bytes,3,opt,name=description,proto3" json:"description,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *MovingFeature) Reset()         { *m = MovingFeature{} }
func (m *MovingFeature) String() string { return proto.CompactTextString(m) }
func (*MovingFeature) ProtoMessage()    {}
func (*MovingFeature) Descriptor() ([]byte, []int) {
	return fileDescriptor_877f27c0ba68f7eb, []int{4}
}

func (m *MovingFeature) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_MovingFeature.Unmarshal(m, b)
}
func (m *MovingFeature) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_MovingFeature.Marshal(b, m, deterministic)
}
func (m *MovingFeature) XXX_Merge(src proto.Message) {
	xxx_messageInfo_MovingFeature.Merge(m, src)
}
func (m *MovingFeature) XXX_Size() int {
	return xxx_messageInfo_MovingFeature.Size(m)
}
func (m *MovingFeature) XXX_DiscardUnknown() {
	xxx_messageInfo_MovingFeature.DiscardUnknown(m)
}

var xxx_messageInfo_MovingFeature proto.InternalMessageInfo

func (m *MovingFeature) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

func (m *MovingFeature) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *MovingFeature) GetDescription() string {
	if m != nil {
		return m.Description
	}
	return ""
}

type Header struct {
	VaryingAttrDefs      []*AttrDef `protobuf:"bytes,1,rep,name=VaryingAttrDefs,proto3" json:"VaryingAttrDefs,omitempty"`
	XXX_NoUnkeyedLiteral struct{}   `json:"-"`
	XXX_unrecognized     []byte     `json:"-"`
	XXX_sizecache        int32      `json:"-"`
}

func (m *Header) Reset()         { *m = Header{} }
func (m *Header) String() string { return proto.CompactTextString(m) }
func (*Header) ProtoMessage()    {}
func (*Header) Descriptor() ([]byte, []int) {
	return fileDescriptor_877f27c0ba68f7eb, []int{5}
}

func (m *Header) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Header.Unmarshal(m, b)
}
func (m *Header) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Header.Marshal(b, m, deterministic)
}
func (m *Header) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Header.Merge(m, src)
}
func (m *Header) XXX_Size() int {
	return xxx_messageInfo_Header.Size(m)
}
func (m *Header) XXX_DiscardUnknown() {
	xxx_messageInfo_Header.DiscardUnknown(m)
}

var xxx_messageInfo_Header proto.InternalMessageInfo

func (m *Header) GetVaryingAttrDefs() []*AttrDef {
	if m != nil {
		return m.VaryingAttrDefs
	}
	return nil
}

type AttrDef struct {
	Name                 string   `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
	SimpleType           []string `protobuf:"bytes,2,rep,name=simpleType,proto3" json:"simpleType,omitempty"`
	AttrAnnotation       string   `protobuf:"bytes,3,opt,name=attrAnnotation,proto3" json:"attrAnnotation,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *AttrDef) Reset()         { *m = AttrDef{} }
func (m *AttrDef) String() string { return proto.CompactTextString(m) }
func (*AttrDef) ProtoMessage()    {}
func (*AttrDef) Descriptor() ([]byte, []int) {
	return fileDescriptor_877f27c0ba68f7eb, []int{6}
}

func (m *AttrDef) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_AttrDef.Unmarshal(m, b)
}
func (m *AttrDef) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_AttrDef.Marshal(b, m, deterministic)
}
func (m *AttrDef) XXX_Merge(src proto.Message) {
	xxx_messageInfo_AttrDef.Merge(m, src)
}
func (m *AttrDef) XXX_Size() int {
	return xxx_messageInfo_AttrDef.Size(m)
}
func (m *AttrDef) XXX_DiscardUnknown() {
	xxx_messageInfo_AttrDef.DiscardUnknown(m)
}

var xxx_messageInfo_AttrDef proto.InternalMessageInfo

func (m *AttrDef) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *AttrDef) GetSimpleType() []string {
	if m != nil {
		return m.SimpleType
	}
	return nil
}

func (m *AttrDef) GetAttrAnnotation() string {
	if m != nil {
		return m.AttrAnnotation
	}
	return ""
}

type Foliation struct {
	OrderType            OrderType             `protobuf:"varint,1,opt,name=orderType,proto3,enum=OrderType" json:"orderType,omitempty"`
	Trajectory           []*AbstractTrajectory `protobuf:"bytes,2,rep,name=trajectory,proto3" json:"trajectory,omitempty"`
	XXX_NoUnkeyedLiteral struct{}              `json:"-"`
	XXX_unrecognized     []byte                `json:"-"`
	XXX_sizecache        int32                 `json:"-"`
}

func (m *Foliation) Reset()         { *m = Foliation{} }
func (m *Foliation) String() string { return proto.CompactTextString(m) }
func (*Foliation) ProtoMessage()    {}
func (*Foliation) Descriptor() ([]byte, []int) {
	return fileDescriptor_877f27c0ba68f7eb, []int{7}
}

func (m *Foliation) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_Foliation.Unmarshal(m, b)
}
func (m *Foliation) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_Foliation.Marshal(b, m, deterministic)
}
func (m *Foliation) XXX_Merge(src proto.Message) {
	xxx_messageInfo_Foliation.Merge(m, src)
}
func (m *Foliation) XXX_Size() int {
	return xxx_messageInfo_Foliation.Size(m)
}
func (m *Foliation) XXX_DiscardUnknown() {
	xxx_messageInfo_Foliation.DiscardUnknown(m)
}

var xxx_messageInfo_Foliation proto.InternalMessageInfo

func (m *Foliation) GetOrderType() OrderType {
	if m != nil {
		return m.OrderType
	}
	return OrderType_Time
}

func (m *Foliation) GetTrajectory() []*AbstractTrajectory {
	if m != nil {
		return m.Trajectory
	}
	return nil
}

type AbstractTrajectory struct {
	Id                   string            `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty"`
	MfIdRef              string            `protobuf:"bytes,2,opt,name=mfIdRef,proto3" json:"mfIdRef,omitempty"`
	Start                uint64            `protobuf:"varint,3,opt,name=start,proto3" json:"start,omitempty"`
	End                  uint64            `protobuf:"varint,4,opt,name=end,proto3" json:"end,omitempty"`
	PosList              []float32         `protobuf:"fixed32,5,rep,packed,name=posList,proto3" json:"posList,omitempty"`
	Attr                 []string          `protobuf:"bytes,6,rep,name=attr,proto3" json:"attr,omitempty"`
	Interpolation        string            `protobuf:"bytes,7,opt,name=interpolation,proto3" json:"interpolation,omitempty"`
	LinearTrajectory     *LinearTrajectory `protobuf:"bytes,8,opt,name=linearTrajectory,proto3" json:"linearTrajectory,omitempty"`
	XXX_NoUnkeyedLiteral struct{}          `json:"-"`
	XXX_unrecognized     []byte            `json:"-"`
	XXX_sizecache        int32             `json:"-"`
}

func (m *AbstractTrajectory) Reset()         { *m = AbstractTrajectory{} }
func (m *AbstractTrajectory) String() string { return proto.CompactTextString(m) }
func (*AbstractTrajectory) ProtoMessage()    {}
func (*AbstractTrajectory) Descriptor() ([]byte, []int) {
	return fileDescriptor_877f27c0ba68f7eb, []int{8}
}

func (m *AbstractTrajectory) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_AbstractTrajectory.Unmarshal(m, b)
}
func (m *AbstractTrajectory) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_AbstractTrajectory.Marshal(b, m, deterministic)
}
func (m *AbstractTrajectory) XXX_Merge(src proto.Message) {
	xxx_messageInfo_AbstractTrajectory.Merge(m, src)
}
func (m *AbstractTrajectory) XXX_Size() int {
	return xxx_messageInfo_AbstractTrajectory.Size(m)
}
func (m *AbstractTrajectory) XXX_DiscardUnknown() {
	xxx_messageInfo_AbstractTrajectory.DiscardUnknown(m)
}

var xxx_messageInfo_AbstractTrajectory proto.InternalMessageInfo

func (m *AbstractTrajectory) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

func (m *AbstractTrajectory) GetMfIdRef() string {
	if m != nil {
		return m.MfIdRef
	}
	return ""
}

func (m *AbstractTrajectory) GetStart() uint64 {
	if m != nil {
		return m.Start
	}
	return 0
}

func (m *AbstractTrajectory) GetEnd() uint64 {
	if m != nil {
		return m.End
	}
	return 0
}

func (m *AbstractTrajectory) GetPosList() []float32 {
	if m != nil {
		return m.PosList
	}
	return nil
}

func (m *AbstractTrajectory) GetAttr() []string {
	if m != nil {
		return m.Attr
	}
	return nil
}

func (m *AbstractTrajectory) GetInterpolation() string {
	if m != nil {
		return m.Interpolation
	}
	return ""
}

func (m *AbstractTrajectory) GetLinearTrajectory() *LinearTrajectory {
	if m != nil {
		return m.LinearTrajectory
	}
	return nil
}

type LinearTrajectory struct {
	Interpolation        string   `protobuf:"bytes,1,opt,name=interpolation,proto3" json:"interpolation,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *LinearTrajectory) Reset()         { *m = LinearTrajectory{} }
func (m *LinearTrajectory) String() string { return proto.CompactTextString(m) }
func (*LinearTrajectory) ProtoMessage()    {}
func (*LinearTrajectory) Descriptor() ([]byte, []int) {
	return fileDescriptor_877f27c0ba68f7eb, []int{9}
}

func (m *LinearTrajectory) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_LinearTrajectory.Unmarshal(m, b)
}
func (m *LinearTrajectory) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_LinearTrajectory.Marshal(b, m, deterministic)
}
func (m *LinearTrajectory) XXX_Merge(src proto.Message) {
	xxx_messageInfo_LinearTrajectory.Merge(m, src)
}
func (m *LinearTrajectory) XXX_Size() int {
	return xxx_messageInfo_LinearTrajectory.Size(m)
}
func (m *LinearTrajectory) XXX_DiscardUnknown() {
	xxx_messageInfo_LinearTrajectory.DiscardUnknown(m)
}

var xxx_messageInfo_LinearTrajectory proto.InternalMessageInfo

func (m *LinearTrajectory) GetInterpolation() string {
	if m != nil {
		return m.Interpolation
	}
	return ""
}

func init() {
	proto.RegisterEnum("OrderType", OrderType_name, OrderType_value)
	proto.RegisterType((*MovingFeatures)(nil), "MovingFeatures")
	proto.RegisterType((*TBoundedBy)(nil), "TBoundedBy")
	proto.RegisterType((*EnvelopeWithTimePeriod)(nil), "EnvelopeWithTimePeriod")
	proto.RegisterType((*Member)(nil), "Member")
	proto.RegisterType((*MovingFeature)(nil), "MovingFeature")
	proto.RegisterType((*Header)(nil), "Header")
	proto.RegisterType((*AttrDef)(nil), "AttrDef")
	proto.RegisterType((*Foliation)(nil), "Foliation")
	proto.RegisterType((*AbstractTrajectory)(nil), "AbstractTrajectory")
	proto.RegisterType((*LinearTrajectory)(nil), "LinearTrajectory")
}

func init() { proto.RegisterFile("movingFeatures.proto", fileDescriptor_877f27c0ba68f7eb) }

var fileDescriptor_877f27c0ba68f7eb = []byte{
	// 631 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x84, 0x53, 0x4d, 0x6f, 0xd3, 0x4a,
	0x14, 0x7d, 0x4e, 0xd2, 0xb8, 0xb9, 0x51, 0xf2, 0xf2, 0xe6, 0x55, 0xc5, 0xea, 0x82, 0x16, 0x0b,
	0x50, 0x61, 0x31, 0x95, 0x52, 0x16, 0x2c, 0x0a, 0xa2, 0x05, 0x2a, 0x90, 0x5a, 0x5a, 0x0d, 0x01,
	0x56, 0x2c, 0x26, 0xf5, 0x4d, 0x3a, 0x95, 0x3d, 0x63, 0x66, 0x26, 0x45, 0xf9, 0x49, 0xfc, 0x41,
	0x24, 0x76, 0xc8, 0x63, 0x3b, 0xb1, 0x93, 0x22, 0x76, 0x73, 0xcf, 0x3d, 0xf7, 0xc3, 0xe7, 0x1e,
	0xc3, 0x56, 0xa2, 0x6e, 0x85, 0x9c, 0x9e, 0x22, 0xb7, 0x33, 0x8d, 0x86, 0xa6, 0x5a, 0x59, 0xb5,
	0xb3, 0x3b, 0x55, 0x6a, 0x1a, 0xe3, 0x81, 0x8b, 0xc6, 0xb3, 0xc9, 0x81, 0x15, 0x09, 0x1a, 0xcb,
	0x93, 0x34, 0x27, 0x84, 0x3f, 0x3c, 0xe8, 0x9f, 0xd7, 0x2a, 0xc9, 0x13, 0xe8, 0x8c, 0xd5, 0x4c,
	0x46, 0x18, 0x9d, 0xcc, 0x03, 0x6f, 0xcf, 0xdb, 0xef, 0x0e, 0xbb, 0x74, 0x74, 0x52, 0x42, 0x6c,
	0x99, 0x25, 0x0f, 0xc0, 0x4f, 0x30, 0x19, 0xa3, 0x36, 0x41, 0x63, 0xaf, 0xb9, 0xdf, 0x1d, 0xfa,
	0xf4, 0xdc, 0xc5, 0xac, 0xc4, 0xc9, 0x2e, 0xb4, 0xaf, 0x91, 0x47, 0xa8, 0x83, 0xa6, 0x6b, 0xe5,
	0xd3, 0x77, 0x2e, 0x64, 0x05, 0x4c, 0xf6, 0xa1, 0x33, 0x51, 0xb1, 0xe0, 0x56, 0x28, 0x19, 0xb4,
	0x1c, 0x07, 0xe8, 0x69, 0x89, 0xb0, 0x65, 0x32, 0xfc, 0x0a, 0xb0, 0x5c, 0x83, 0x5c, 0xc0, 0x36,
	0xca, 0x5b, 0x8c, 0x55, 0x8a, 0x5f, 0x84, 0xbd, 0x1e, 0x89, 0x04, 0x2f, 0x51, 0x0b, 0x15, 0x15,
	0x3b, 0xdf, 0xa3, 0x6f, 0xef, 0x4c, 0xb3, 0x3f, 0x94, 0x85, 0x3f, 0x3d, 0xd8, 0xbe, 0xbb, 0x84,
	0x04, 0xe0, 0x1b, 0x6d, 0x3e, 0xf0, 0x04, 0x5d, 0xf3, 0x0e, 0x2b, 0x43, 0xb2, 0x07, 0xdd, 0x58,
	0x7d, 0x47, 0xfd, 0x5a, 0x69, 0x89, 0xda, 0xa9, 0xd0, 0x60, 0x55, 0x28, 0x63, 0xcc, 0xd2, 0x74,
	0xc1, 0x68, 0xe6, 0x8c, 0x0a, 0x44, 0x5e, 0x41, 0x6f, 0x8c, 0x53, 0x21, 0x2f, 0x95, 0x11, 0x15,
	0x15, 0x76, 0x68, 0x7e, 0x3c, 0x5a, 0x1e, 0x8f, 0x8e, 0xca, 0xe3, 0xb1, 0x7a, 0x01, 0x39, 0x82,
	0x2e, 0xca, 0x68, 0x51, 0xbf, 0xf1, 0xd7, 0xfa, 0x2a, 0x3d, 0x7c, 0x09, 0xed, 0xfc, 0x6a, 0xe4,
	0x19, 0xf4, 0x6a, 0x36, 0x2a, 0xa4, 0xec, 0xd3, 0x9a, 0x45, 0x58, 0x9d, 0x14, 0x7e, 0x82, 0x5e,
	0x2d, 0x4f, 0xfa, 0xd0, 0x10, 0x51, 0xa1, 0x54, 0x43, 0x44, 0x84, 0x40, 0x4b, 0x66, 0xda, 0x35,
	0x1c, 0xe2, 0xde, 0x99, 0x2c, 0x11, 0x9a, 0x2b, 0x2d, 0x52, 0xb7, 0x72, 0xd3, 0xa5, 0xaa, 0x50,
	0x78, 0x04, 0xed, 0xdc, 0x2a, 0x64, 0x08, 0xff, 0x7e, 0xe6, 0x7a, 0x2e, 0xe4, 0xf4, 0xd8, 0x5a,
	0xfd, 0x06, 0x27, 0x26, 0xf0, 0x9c, 0xdd, 0x36, 0x69, 0x01, 0xb0, 0x55, 0x42, 0x88, 0xe0, 0x17,
	0xef, 0xc5, 0x78, 0xaf, 0x32, 0xfe, 0x3e, 0x80, 0x11, 0x49, 0x1a, 0xe3, 0x68, 0x9e, 0xa2, 0x3b,
	0x5b, 0x87, 0x55, 0x10, 0xf2, 0x18, 0xfa, 0xdc, 0x5a, 0x7d, 0x2c, 0xa5, 0xb2, 0xbc, 0xb2, 0xe1,
	0x0a, 0x1a, 0xde, 0x40, 0x67, 0xe1, 0xd5, 0xcc, 0xca, 0x4a, 0x47, 0xa8, 0x5d, 0xcf, 0x6c, 0x5a,
	0x7f, 0x08, 0xf4, 0xa2, 0x44, 0xd8, 0x32, 0x49, 0x0e, 0x01, 0xac, 0xe6, 0x37, 0x78, 0x65, 0x95,
	0x9e, 0x17, 0xff, 0xce, 0xff, 0xf4, 0x78, 0x6c, 0xac, 0xe6, 0x57, 0x76, 0xb4, 0x48, 0xb1, 0x0a,
	0x2d, 0xfc, 0xe5, 0x01, 0x59, 0xa7, 0xac, 0xa9, 0x1d, 0x80, 0x9f, 0x4c, 0xde, 0x47, 0x0c, 0x27,
	0x85, 0xe0, 0x65, 0x48, 0xb6, 0x60, 0xc3, 0x58, 0xae, 0xad, 0xfb, 0x96, 0x16, 0xcb, 0x03, 0x32,
	0x80, 0x26, 0xca, 0xc8, 0x99, 0xae, 0xc5, 0xb2, 0x67, 0xd6, 0x21, 0x55, 0xe6, 0x4c, 0x18, 0x1b,
	0x6c, 0x38, 0xbb, 0x96, 0x61, 0x26, 0x65, 0x26, 0x40, 0xd0, 0x76, 0x82, 0xb9, 0x37, 0x79, 0x08,
	0x3d, 0x21, 0x2d, 0xea, 0x54, 0xc5, 0xb9, 0x52, 0xbe, 0x9b, 0x5a, 0x07, 0xc9, 0x0b, 0x18, 0xc4,
	0x42, 0x22, 0xd7, 0xcb, 0xcd, 0x83, 0x4d, 0xe7, 0xae, 0xff, 0xe8, 0xd9, 0x4a, 0x82, 0xad, 0x51,
	0xc3, 0xe7, 0x30, 0x58, 0x65, 0xad, 0x0f, 0xf6, 0xee, 0x18, 0xfc, 0xf4, 0x11, 0x74, 0x16, 0x27,
	0x20, 0x9b, 0xd0, 0xca, 0x7e, 0x82, 0xc1, 0x3f, 0xa4, 0x0f, 0xf0, 0x11, 0xbf, 0xcd, 0x50, 0x5a,
	0xc1, 0xe3, 0x81, 0x37, 0x6e, 0xbb, 0xbf, 0xe4, 0xf0, 0x77, 0x00, 0x00, 0x00, 0xff, 0xff, 0xe2,
	0xdc, 0xe7, 0x59, 0x48, 0x05, 0x00, 0x00,
}
