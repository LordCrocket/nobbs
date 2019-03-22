package main

import (
	"github.com/google/go-cmp/cmp"
	"github.com/google/go-cmp/cmp/cmpopts"
	"github.com/oklog/ulid"
	"nobbs"
	"testing"
)

func TestConvertMessage(t *testing.T) {

	var externalMessage = GitlabEvent{
		Ref: "refs/heads/master",
		Project: GitlabProject{
			Name:       "testproject",
			GitSshUrl:  "git:projects/hej.git",
			GitHttpUrl: "",
			Namespace:  "projects",
		},
	}

	var expectedMessage = nobbs.Trigger{
		Url:       "git:projects/hej.git",
		HttpUrl:   "",
		Ref:       "master",
		Namespace: "projects",
		Name:      "testproject",
	}

	var convertedMessage = convertMessage(externalMessage)
	var options = cmpopts.IgnoreFields(convertedMessage, "Id")

	if !cmp.Equal(expectedMessage, convertedMessage, options) {
		t.Errorf(`Expected: %v got: %v`, expectedMessage, convertedMessage)
	}
	var id = convertedMessage.Id
	var ulid, err = ulid.Parse(id.String())
	if err != nil {
		t.Errorf(`Expected valid ULID, got: %v error: %v`, id, err)
	}
	if ulid.String() == "00000000000000000000000000" {
		t.Errorf(`Expected non-empty ULID, got: %v`, id)
	}

}

func TestExtractMessage(t *testing.T) {
	var body = []byte(`{"ref":"refs/heads/master","project":{"name":"hej","git":"git:projects/hej.git","git_http_url":"http://git/projects/hej.git","namespace":"projects"}}`)

	var expectedMessage = GitlabEvent{
		Ref: "refs/heads/master",
		Project: GitlabProject{
			Name:       "hej",
			GitSshUrl:  "git:projects/hej.git",
			GitHttpUrl: "http://git/projects/hej.git",
			Namespace:  "projects",
		},
	}

	var extractedMessage = extractGitlabEvent(body)

	if !cmp.Equal(expectedMessage, extractedMessage) {
		t.Errorf(`Expected: %v got: %v`, expectedMessage, extractedMessage)
	}
}
