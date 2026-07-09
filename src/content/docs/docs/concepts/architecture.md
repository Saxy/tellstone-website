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
| Storage engine | `internal/storage` | 256 sharded buckets, per-shard `RWMutex`, timing-wheel eviction |
| Crypto | `internal/crypto` | Optional ChaCha20-Poly1305 for at-rest encryption |
| Metrics / tracing | `internal/metrics`, `internal/trace` | Prometheus text exporter, OTLP/gRPC tracing for observability |

## Two protocols, one engine

Both listeners — the native binary protocol and the RESP2 listener — sit in
front of the same sharded storage engine. Nothing about the engine assumes
which protocol a given connection is using; RESP support is additive, not
a separate code path with its own semantics. This design ensures consistency
across protocols while maximizing performance.

## Sharded, low-contention storage

The keyspace is split across 256 buckets by key hash. Each bucket has its
own `RWMutex`, so operations against different buckets proceed without
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

## Where persistence and clustering fit

Today, Tellstone is a single-node, in-memory store — there is no
replication or on-disk persistence yet. See
[Clustering & Replication](/docs/operations/clustering/) for what's
planned versus what exists today. The architecture is designed to support
future distributed features while maintaining the core principles of performance
and simplicity.
