---
title: Configuration
description: Configure a Tellstone node with flags or environment variables.
sidebar:
  order: 1
---

Every option is available as a flag and an environment variable; flags
take precedence when both are set.

| Flag | Env | Default | Description |
|---|---|---|---|
| `--addr` | `TSD_ADDR` | `127.0.0.1:9988` | Binary-protocol listen address |
| `--enable-resp` | `TSD_ENABLE_RESP` | `false` | Enable the Redis-compatible RESP listener |
| `--resp-addr` | `TSD_RESP_ADDR` | `127.0.0.1:6379` | RESP listen address |
| `--max-msg-size` | `TSD_MAX_MSG_SIZE` | `16MiB` | Per-message size limit |
| `--max-mem-bytes` | `TSD_MAX_MEM_BYTES` | `0` (unlimited) | Total engine memory ceiling |
| `--evict-interval` | `TSD_EVICT_INTERVAL` | `1s` | Chronometer tick interval (`0` disables active eviction) |
| `--evict-slots` | `TSD_EVICT_SLOTS` | `256` | Timing-wheel slot count |
| `--enable-encryption` | `TSD_ENABLE_ENCRYPTION` | `false` | Enable ChaCha20-Poly1305 at-rest encryption |
| `--encryption-key` | `TSD_ENCRYPTION_KEY` | *(none)* | 32-byte key (required when encryption is on) |
| `--enable-metrics` | `TSD_ENABLE_METRICS` | `false` | Enable the Prometheus exporter |
| `--metrics-addr` | `TSD_METRICS_ADDR` | `:9100` | Prometheus exporter address (`/metrics`) |
| `--trace-ratio` | `TSD_TRACE_RATIO` | `0.0` | OpenTelemetry sample ratio (`0` disables) |
| `--num-shards` | `TSD_NUM_SHARDS` | `GOMAXPROCS` | Number of shared-nothing shards (one goroutine + one lock-free map per shard) |
| `--shutdown-timeout` | `TSD_SHUTDOWN_TIMEOUT` | `10s` | Max time to wait for graceful shutdown on SIGINT/SIGTERM |

Example:

```sh
./bin/tellstone \
  --addr 127.0.0.1:9988 \
  --enable-resp \
  --resp-addr 127.0.0.1:6379 \
  --enable-metrics \
  --num-shards 8 \
  --shutdown-timeout 30s
```

## Runtime tuning (environment only)

These aren't exposed as flags:

| Env | Description |
|---|---|
| `TSD_GC_PERCENT` | Default `-1` — disables the Go GC for a zero-GC hot path. |
| `TSD_MEM_LIMIT_BYTES` | Soft heap ceiling for the Go runtime. |
| `TSD_ENABLE_PROFILING` | Serves `pprof` on `127.0.0.1:6060` when set. |

## Observability

- **Metrics:** with `--enable-metrics`, Prometheus text is exposed at
  `http://<metrics-addr>/metrics` (default `:9100`).
- **Profiling:** set `TSD_ENABLE_PROFILING=1` to serve `pprof` on
  `127.0.0.1:6060`, e.g. `go tool pprof http://127.0.0.1:6060/debug/pprof/profile`.
- **Tracing:** set `TSD_TRACE_RATIO` to enable OpenTelemetry tracing for performance analysis.

## Production Recommendations

For production deployments, consider these settings:

- Set `TSD_GC_PERCENT=-1` to minimize GC pauses for maximum performance
- Set `TSD_MEM_LIMIT_BYTES` to approximately 85-90% of your container memory limit to prevent OOM kills
- Enable metrics with `--enable-metrics` for monitoring
- Use `--num-shards` to match your CPU core count for optimal performance
- Set appropriate `--shutdown-timeout` to allow for graceful shutdown in containerized environments
