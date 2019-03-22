package nobbs

import (
	"fmt"
	"github.com/oklog/ulid"
	"io"
	"math/rand"
	"os"
	"sync"
	"time"
)

var generator = struct {
	entropy io.Reader
	sync.Mutex
}{
	entropy: ulid.Monotonic(rand.New(rand.NewSource(time.Now().UnixNano())), 0),
}

type Trigger struct {
	Id        Id     `json:"id"`
	Url       string `json:"url"`
	HttpUrl   string `json:"http_url"`
	Ref       string `json:"ref"`
	Namespace string `json:"namespace"`
	Name      string `json:"name"`
}

type Result struct {
	Id       Id      `json:"id"`
	Trigger  Trigger `json:"trigger"`
	Status   string  `json:"status"`
	Log      string  `json:"log"`
	Duration uint64  `json:"duration"`
	Time     int64   `json:"time"`
}

type Id struct {
	ulid.ULID
}

func GetNewId() Id {
	generator.Lock()
	defer generator.Unlock()

	id, err := ulid.New(ulid.Now(), generator.entropy)
	if err != nil {
		LogMessage("WARN: Could not generate id")
		return Id{ulid.ULID{}}
	}
	return Id{id}
}

func (id *Id) GetTime() time.Time {
	return ulid.Time(id.Time())
}

func LogMessage(message string) {
	var date = time.Now().Format("2006-01-02 15:04:05")
	fmt.Fprintf(os.Stderr, "%v\n", date+" "+message)
}
