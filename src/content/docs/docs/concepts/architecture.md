---
title: Architecture
description: How Tellstone's protocols, storage engine, and observability fit together.
sidebar:
  order: 1
---

Tellstone is organized into a small set of packages, each with one job:

| Layer | Package | Notes |
|---|---|---|
| Binary protocol | `internal/network` | `MsgRequest`/`MsgResponse` frames (`GET`/`SET`/`DEL`, TTL, key, value) |
| RESP2 protocol | `internal/resp` | Redis-compatible listener reusing the same engine |
| Storage engine | `internal/storage` | `GOMAXPROCS` sharded buckets (`--shards`), per-shard `RWMutex`, timing-wheel eviction |
| Persistence | `internal/persistence` | Per-shard append-only WAL for crash recovery (`--enable-persistence`) |
| Crypto | `internal/crypto` | Optional ChaCha20-Poly1305 for at-rest encryption |
| Metrics / tracing | `internal/metrics`, `internal/trace` | Prometheus text exporter, OTLP/gRPC tracing for observability |

## Two protocols, one engine

Both listeners — the native binary protocol and the RESP2 listener — sit in
front of the same sharded storage engine. Nothing about the engine assumes
which protocol a given connection is using; RESP support is additive, not
a separate code path with its own semantics. This design ensures consistency
across protocols while maximizing performance.

## Sharded, low-contention storage

The keyspace is split across `N` shards (default `GOMAXPROCS`, configurable via `--num-shards`) by key hash. Each shard has its
own `RWMutex`, so operations against different shards proceed without
contending on a single global lock — this is what lets throughput scale
close to linearly as you add cores. The sharded design minimizes lock
contention and maximizes parallelism.

## TTL eviction

An active timing wheel (the "chronometer") walks expiring keys and evicts
them in O(1) per tick, configurable via `--evict-interval` and
`--evict-slots`. Lazy eviction on read backs this up, so a key that
expired between ticks is still treated as gone the moment it's accessed,
even before the chronometer catches up. This dual approach ensures efficient
TTL management without impacting performance.

## Persistence

Tellstone includes a per-shard, append-only **write-ahead log (WAL)** for
crash recovery. Each shard writes to its own file (`shard_000.db`,
`shard_001.db`, ...), and every SET and DEL is recorded before it hits the
in-memory engine. On startup, the WAL is replayed to restore the keyspace,
skipping expired keys and applying tombstone deletes.

The WAL is disabled by default. Enable it with `--enable-persistence` and
optionally set `--persistence-dir` to choose where the `.db` files are
written. See [Configuration](/docs/operations/configuration/) for details.

## Clustering

Tellstone runs as a **single node** today — there is no replication or
cluster membership yet. See
[Clustering & Replication](/docs/operations/clustering/) for what's
planned and how to scale without built-in clustering. The architecture is
designed to support future distributed features while maintaining the core
principles of performance and simplicity.
