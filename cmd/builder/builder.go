package main

import (
	"encoding/json"
	"fmt"
	"github.com/mediocregopher/radix/v3"
	"log"
	"math/rand"
	"nobbs"
	"os"
	"time"
)

func build(trigger nobbs.Trigger) nobbs.Result {
	nobbs.LogMessage("Building " + trigger.Name)

	var startTime = time.Now()
	// Simulate work
	r := rand.Intn(10000)
	time.Sleep(time.Duration(r) * time.Millisecond)

	var result nobbs.Result
	result.Id = nobbs.GetNewId()
	result.Trigger = trigger
	result.Status = "OK"
	if rand.Float32() < 0.5 {
		result.Status = "FAILED"
	}
	result.Time = startTime.Unix()
	result.Duration = uint64(time.Since(startTime) / time.Millisecond)
	return result
}

//func getPushEventsChannel() chan radix.PubSubMessage {
//	conn, err := radix.Dial("tcp", "127.0.0.1:6379")
//	if err != nil {
//		log.Fatal(err)
//	}
//
//	ps := radix.PubSub(conn)
//
//	var msgCh = make(chan radix.PubSubMessage)
//
//	if err := ps.Subscribe(msgCh, "push_events"); err != nil {
//		log.Fatal(err)
//	}
//	return msgCh
//}

func publishBuildResult(pool *radix.Pool, result nobbs.Result) {

	var msg, err = json.Marshal(result)

	if err != nil {
		fmt.Fprintf(os.Stderr, "Could not marshal: %v\n", err)
		return
	}

	if err := pool.Do(radix.Cmd(nil, "PUBLISH", "build_results", string(msg))); err != nil {
		fmt.Fprintf(os.Stderr, "Could not publish message: %v\n", err)
		return
	}
}

func main() {
	rand.Seed(time.Now().UnixNano())

	//var msgCh = getPushEventsChannel()

	customConnFunc := func(network, addr string) (radix.Conn, error) {
		return radix.Dial(network, addr,
			radix.DialReadTimeout(0),
		)
	}

	triggerPool, err := radix.NewPool("tcp", "127.0.0.1:6379", 10, radix.PoolConnFunc(customConnFunc))
	if err != nil {
		log.Fatal(err)
	}

	publishPool, err := radix.NewPool("tcp", "127.0.0.1:6379", 10)
	if err != nil {
		log.Fatal(err)
	}

	for {
		var msg []string
		if err := triggerPool.Do(radix.Cmd(&msg, "BRPOP", "push_events", "0")); err != nil {
			fmt.Fprintf(os.Stderr, "Could not fetch message: %v\n", err)
			log.Fatal(err)
		}

		var trigger nobbs.Trigger
		if err := json.Unmarshal([]byte(msg[1]), &trigger); err != nil {
			fmt.Fprintf(os.Stderr, "Could not unmarshal: %v\n", err)
		}

		var result = build(trigger)
		publishBuildResult(publishPool, result)
	}

}
