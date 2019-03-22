package main

import (
	"encoding/json"
	"fmt"
	"github.com/mediocregopher/radix/v3"
	"io/ioutil"
	"log"
	"net/http"
	"nobbs"
	"os"
	"regexp"
)

type GitlabEvent struct {
	Ref     string        `json:"ref"`
	Project GitlabProject `json:"project"`
}

type GitlabProject struct {
	Name       string `json:"name"`
	GitSshUrl  string `json:"git"`
	GitHttpUrl string `json:"git_http_url"`
	Namespace  string `json:"namespace"`
}

func convertMessage(event GitlabEvent) nobbs.Trigger {
	var refRegex = regexp.MustCompile(`refs/heads/(.*)`)
	var trigger nobbs.Trigger
	trigger.Url = event.Project.GitSshUrl
	trigger.HttpUrl = event.Project.GitHttpUrl
	var matches = refRegex.FindStringSubmatch(event.Ref)
	if len(matches) == 2 {
		trigger.Ref = refRegex.FindStringSubmatch(event.Ref)[1]
	}
	trigger.Namespace = event.Project.Namespace
	trigger.Name = event.Project.Name
	trigger.Id = nobbs.GetNewId()
	return trigger
}

func extractGitlabEvent(body []byte) GitlabEvent {

	var gitlabEvent GitlabEvent

	var err = json.Unmarshal(body, &gitlabEvent)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Could not unmarshal: %v\n", err)
	}
	return gitlabEvent
}

func publishPushEvent(pool *radix.Pool, internalMessage nobbs.Trigger) {

	var msg, err = json.Marshal(internalMessage)
	if err != nil {
		fmt.Fprintf(os.Stderr, "Could not marshal: %v\n", err)
	}

	if err := pool.Do(radix.Cmd(nil, "LPUSH", "push_events", string(msg))); err != nil {
		fmt.Fprintf(os.Stderr, "Could not publish message: %v\n", err)
	}
}

func main() {
	pool, err := radix.NewPool("tcp", "127.0.0.1:6379", 10)
	if err != nil {
		log.Fatal(err)
	}

	triggerHandler := func(w http.ResponseWriter, req *http.Request) {

		if req.Method == http.MethodPost {
			var body, err = ioutil.ReadAll(req.Body)
			if err != nil {
				fmt.Fprintf(os.Stderr, "Failed to read body: %v\n", err)
			}
			var gitlabEvent GitlabEvent = extractGitlabEvent(body)
			var internalMessage = convertMessage(gitlabEvent)
			publishPushEvent(pool, internalMessage)
		}
	}

	http.HandleFunc("/webhook", triggerHandler)
	log.Fatal(http.ListenAndServe(":8080", nil))
}
