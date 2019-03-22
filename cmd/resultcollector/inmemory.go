package main

import (
	"encoding/json"
	"fmt"
	"github.com/mediocregopher/radix/v3"
	"log"
	"net/http"
	"nobbs"
	"os"
	"sync"
)

var buildResultLock sync.Mutex

func collectBuildResults(msgCh chan radix.PubSubMessage, buildResults *[]nobbs.Result) {
	for msg := range msgCh {

		var result nobbs.Result
		var err = json.Unmarshal(msg.Message, &result)

		if err != nil {
			fmt.Fprintf(os.Stderr, "Could not unmarshal: %v\n", err)
		}

		buildResultLock.Lock()
		*buildResults = append(*buildResults, result)
		buildResultLock.Unlock()
		log.Printf("(%d) publish to channel %q received: %q", len(*buildResults), msg.Channel, msg.Message)
	}
}

func main() {

	var ps radix.PubSubConn
	{
		conn, err := radix.Dial("tcp", "127.0.0.1:6379")
		if err != nil {
			log.Fatal(err)
		}
		ps = radix.PubSub(conn)
	}

	msgCh := make(chan radix.PubSubMessage)
	if err := ps.Subscribe(msgCh, "build_results"); err != nil {
		log.Fatal(err)
	}

	var buildResults = make([]nobbs.Result, 0)
	go collectBuildResults(msgCh, &buildResults)

	getBuildResults := func(w http.ResponseWriter, req *http.Request) {
		if req.Method == http.MethodGet {
			w.Header().Set("Content-Type", "application/json")
			w.Header().Add("Access-Control-Allow-Origin", "*")
			buildResultLock.Lock()
			json.NewEncoder(w).Encode(buildResults)
			buildResultLock.Unlock()
		}
	}

	http.HandleFunc("/builds", getBuildResults)
	log.Fatal(http.ListenAndServe(":8081", nil))

}
