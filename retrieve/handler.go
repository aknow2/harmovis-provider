package harmovis

import (
	"fmt"
	"log"
	"math/rand"
	"time"

	mf "harmovis/mf"
	math "math"

	"github.com/golang/protobuf/ptypes/timestamp"
	"github.com/lithammer/shortuuid/v3"
	gosocketio "github.com/mtfelian/golang-socketio"
)

type MovingFeatureRetriever struct {
	ioserv *gosocketio.Server
}

func CreateMovingFeatureRetriever(ioserv *gosocketio.Server) IMovingFeatureRetriever {
	return &MovingFeatureRetriever{
		ioserv: ioserv,
	}
}

type IMovingFeatureRetriever interface {
	SubscribeIOEventFromClient()
}
type DemandMovingFeatures struct {
	Start        int64     `json:"start"`
	End          int64     `json:"end"`
	LowerCorner  []float32 `json:"lowerCorner"`
	UppderCorner []float32 `json:"upperCorner"`
}

func (retriever *MovingFeatureRetriever) onDemandMovingFeaturesHandler(c *gosocketio.Channel, param DemandMovingFeatures) {
	ioserv := retriever.ioserv
	log.Printf("Received SEND on %s with ", c.Id())
	log.Println(param)
	fmt.Println("demand_moving_features")
	movingFeatures := createDummyMovignFeatures(param)
	ioserv.BroadcastToAll("moving_features", movingFeatures)
}

func (retriever *MovingFeatureRetriever) subscribeDemandMovingFeature() {
	fmt.Println("ready demand_moving_features")
	if err := retriever.ioserv.On("demand_moving_features", retriever.onDemandMovingFeaturesHandler); err != nil {
		log.Fatal(err)
	}
}

func (retriever *MovingFeatureRetriever) onDemandBoundedHandler(c *gosocketio.Channel, param interface{}) {
	ioserv := retriever.ioserv
	fmt.Println("demand_bounded_by")
	bounded := createDummyBounded()
	log.Println(ioserv)
	ioserv.BroadcastToAll("bounded_by", bounded)
}

func (retriever *MovingFeatureRetriever) subscribeDemandBounded() {
	fmt.Println("ready demand_bounded_by")
	retriever.ioserv.On("demand_bounded_by", retriever.onDemandBoundedHandler)
}

func (retriever *MovingFeatureRetriever) SubscribeIOEventFromClient() {
	retriever.subscribeDemandBounded()
	retriever.subscribeDemandMovingFeature()
}

func createRandomAbstractTrajectory(member *mf.Member, count int, lowerCorner []float32, upperCorner []float32) []*mf.AbstractTrajectory {
	id := member.MovingFeature.Id
	trajectories := []*mf.AbstractTrajectory{}
	latRange := []float32{lowerCorner[1], upperCorner[1]}
	lonRange := []float32{lowerCorner[0], upperCorner[0]}

	baseLat := (rand.Float32() * (latRange[1] - latRange[0])) + latRange[0]
	baseLon := (rand.Float32() * (lonRange[1] - lonRange[0])) + lonRange[0]
	baseTime := uint64(0)
	timeRange := uint64(20)

	for i := 0; i < count; i++ {
		nextLat := baseLat + (2*rand.Float32()-1)/1000
		nextLon := baseLon + (2*rand.Float32()-1)/1000
		mfid := fmt.Sprintf("%s-%d", id, i)
		trajectory := &mf.AbstractTrajectory{
			Id:            mfid,
			MfIdRef:       id,
			PosList:       []float32{baseLon, baseLat, nextLon, nextLat},
			Start:         baseTime,
			End:           baseTime + timeRange,
			Attr:          []string{"Taxi", "Gass"},
			Interpolation: "Linear",
		}
		baseTime = baseTime + timeRange
		baseLat = nextLat
		baseLon = nextLon
		trajectories = append(trajectories, trajectory)
	}
	return trajectories
}

func createDummyMovignFeatures(param DemandMovingFeatures) mf.MovingFeatures {
	bounded := &mf.TBoundedBy{
		SrsName:     "EPSG:4326",
		LowerCorner: param.LowerCorner,
		UpperCorner: param.LowerCorner,
		BeginPosition: &timestamp.Timestamp{
			Seconds: param.Start,
		},
		EndPosition: &timestamp.Timestamp{
			Seconds: param.End,
		},
	}

	header := &mf.Header{
		VaryingAttrDefs: []*mf.AttrDef{
			&mf.AttrDef{
				Name:       "CarType",
				SimpleType: []string{"Bus", "Taxi"},
			},
			&mf.AttrDef{
				Name:       "Fuel",
				SimpleType: []string{"Gass", "Electric"},
			},
		},
	}
	memberA := &mf.Member{
		MovingFeature: &mf.MovingFeature{
			Id:          "a1",
			Name:        "AA-AAAA",
			Description: "Mie kotu",
		},
	}
	members := []*mf.Member{}
	numOfMember := 300
	for i := 0; i < numOfMember; i++ {
		members = append(members, &mf.Member{
			MovingFeature: &mf.MovingFeature{
				Id:          shortuuid.New(),
				Name:        shortuuid.New(),
				Description: "Kintetsu",
			},
		})
	}
	timerange := 60.0 // sec
	startTime := float64(param.Start)
	endTime := float64(param.End)
	count := int(math.Ceil((endTime - startTime) / timerange))
	log.Printf("mf start time: %v", startTime)
	log.Printf("mf end time: %v", endTime)
	log.Printf("Trajectory count: %d", count)
	trajectories := createRandomAbstractTrajectory(memberA, count, param.LowerCorner, param.UppderCorner)
	for _, v := range members {
		trajectories = append(trajectories, createRandomAbstractTrajectory(v, count, param.LowerCorner, param.UppderCorner)...)
	}

	foliation := &mf.Foliation{
		OrderType:  mf.OrderType_Time,
		Trajectory: trajectories,
	}
	movingFeatures := mf.MovingFeatures{
		BoundedBy: bounded,
		Header:    header,
		Members:   append(members, memberA),
		Foliation: foliation,
	}
	return movingFeatures
}

func createDummyBounded() mf.TBoundedBy {
	end := time.Now()
	date := mf.TBoundedBy{
		BeginPosition: &timestamp.Timestamp{
			Seconds: end.AddDate(-1, 0, 0).Unix(),
		},
		EndPosition: &timestamp.Timestamp{
			Seconds: end.Unix(),
		},
		LowerCorner: []float32{136.7536, 35.1721},
		UpperCorner: []float32{136.9933, 35.2999},
	}
	return date
}
