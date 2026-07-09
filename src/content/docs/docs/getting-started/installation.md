---
title: Installation
description: Build Tellstone from source with Go and Task.
sidebar:
  order: 2
---

Tellstone doesn't publish packaged binaries yet — build it from source.

## Prerequisites

- **Go 1.26+**
- Optional: [`task`](https://taskfile.dev) (go-task) for the shortcuts below
- Optional, for RESP benchmarking: `redis-cli`, `memtier_benchmark`, or `redis-tools`

## Build

```sh
git clone https://github.com/Saxy/Tellstone
cd Tellstone
task build          # -> ./bin/tellstone
```

Without `task`, build directly with Go:

```sh
go build -o bin/tellstone ./cmd/tellstone
```

## Run

```sh
task run            # binary protocol on 127.0.0.1:9988
task run:resp       # binary on :9988  +  Redis-compatible RESP on :6379
```

Or run the binary directly with flags or environment variables:

```sh
./bin/tellstone --addr 127.0.0.1:9988 --enable-resp --resp-addr 127.0.0.1:6379
```

```sh
TSD_ADDR=127.0.0.1:9988 TSD_ENABLE_RESP=true ./bin/tellstone
```

See [Configuration](/docs/operations/configuration/) for the full list of
flags and environment variables.

## Advanced Configuration

For production deployments, consider setting additional environment variables:

- `TSD_GC_PERCENT=-1` to disable Go's garbage collector for maximum performance
- `TSD_MEM_LIMIT_BYTES` to set a memory ceiling for the Go runtime
- `TSD_ENABLE_PROFILING=1` to enable pprof profiling on 127.0.0.1:6060

Next: run through the [quickstart](/docs/getting-started/quickstart/) to store and read your first key.
