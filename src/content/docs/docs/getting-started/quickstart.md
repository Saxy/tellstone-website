---
title: Quickstart
description: Store and read your first key with redis-cli or the native Go client.
sidebar:
  order: 3
---

This assumes a Tellstone server is already running locally. See
[Installation](/docs/getting-started/installation/) if it isn't.

## Redis-compatible (RESP) — easiest

Start the server with RESP enabled, then use any Redis client:

```sh
task run:resp
```

```sh
redis-cli -p 6379 PING            # PONG
redis-cli -p 6379 SET foo bar     # OK
redis-cli -p 6379 GET foo         # "bar"
redis-cli -p 6379 SET k v EX 60   # OK (60s TTL)
redis-cli -p 6379 DEL foo         # (integer) 1
```

Supported commands today: `PING`, `GET`, `SET` (with `EX`/`PX`), `DEL`.
Unknown commands return a `-ERR` reply without dropping the connection.

## Native binary protocol (Go client)

The native protocol is the fastest path. Use the bundled client in
`internal/network`:

```go
import "github.com/Saxy/Tellstone/internal/network"

c, _ := network.Dial("127.0.0.1:9988", 2*time.Second)
defer c.Close()

scratch := make([]byte, 4096)              // reusable response buffer (zero-alloc)
c.Set([]byte("hello"), []byte("world"), 0, scratch)   // ttlMs=0 -> no expiry
val, _ := c.Get([]byte("hello"), scratch)             // val == "world"
```

A runnable example lives in `cmd/example/client` in the main repo.

## Next steps

- See the [command reference](/docs/commands/overview/) for the exact
  commands and flags supported by each protocol.
- Read [Data Model](/docs/concepts/data-model/) for how keys, values, and
  TTLs are represented today.
- Check [Configuration](/docs/operations/configuration/) for tuning memory
  limits, eviction, and enabling **WAL persistence** for crash recovery.
- Explore [Architecture](/docs/concepts/architecture/) to understand how the protocols,
  storage engine, and persistence layer fit together.
