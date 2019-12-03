module harmovis

go 1.12

replace harmovis/mf => ./mf

require (
	github.com/golang/protobuf v1.3.2
	github.com/googollee/go-socket.io v1.4.2
	github.com/gorilla/websocket v1.4.1 // indirect
	github.com/lithammer/shortuuid/v3 v3.0.4
	github.com/mtfelian/golang-socketio v1.5.2
	github.com/rs/cors v1.7.0
	github.com/stretchr/objx v0.2.0 // indirect
	github.com/synerex/proto_fleet v0.0.1
	github.com/synerex/synerex_api v0.0.1
	github.com/synerex/synerex_proto v0.1.1
	github.com/synerex/synerex_sxutil v0.3.4
	golang.org/x/tools/gopls v0.2.1 // indirect
	google.golang.org/grpc v1.23.1
)
