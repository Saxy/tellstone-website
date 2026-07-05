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

Example:

```sh
./bin/tellstone \
  --addr 127.0.0.1:9988 \
  --enable-resp \
  --resp-addr 127.0.0.1:6379 \
  --enable-metrics
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
