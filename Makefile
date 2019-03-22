.PHONY: all builder gitlab-trigger rc-inmemory


OUTPUT := bin

all: nobbs

nobbs:  $(addprefix $(OUTPUT)/,builder gitlab-trigger rc-inmemory)
	@ mkdir -p $(OUTPUT)

$(OUTPUT)/builder:
	go build -o $(OUTPUT)/builder cmd/builder/builder.go

$(OUTPUT)/gitlab-trigger: 
	go build -o $(OUTPUT)/gitlab-trigger cmd/trigger/gitlab.go

$(OUTPUT)/rc-inmemory:
	go build -o $(OUTPUT)/rc-inmemory cmd/resultcollector/inmemory.go
clean:
	rm $(OUTPUT)/*
