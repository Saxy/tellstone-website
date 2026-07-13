---
title: Introduction
description: What Tellstone is, and when to reach for it.
sidebar:
  order: 1
---

Tellstone is an ultra-high-performance, cloud-native **in-memory key/value
store** written entirely in **Go**. It speaks two protocols over TCP — a
compact custom binary protocol and a **Redis-compatible (RESP2)** protocol —
on top of a sharded, low-contention storage engine with optional TTL
eviction, at-rest encryption, and **per-shard WAL persistence** for crash
recovery.

```
+---------------------------------------------+
|             Your K8s Cluster                 |
|                                               |
|  [App Pod] --( binary :9988 / RESP :6379 )-->|
|                                               |
|     +---------------------------------+       |
|     |        TELLSTONE CORE           |       |
|     |  (N Sharded In-Memory Buckets — GOMAXPROCS by default)|       |
|     +---------------------------------+       |
+---------------------------------------------+
```

## Why Tellstone?

Many managed databases (PostgreSQL, MySQL, ...) become bottlenecks under
high-frequency workloads. Tellstone offers a lean, memory-efficient buffer
in front of them:

- **Zero-copy binary protocol** — direct binary messages avoid text
  parsing or Protobuf overhead for maximum performance.
- **Redis-compatible** — an optional RESP2 listener lets you drive
  Tellstone with `redis-cli`, `redis-benchmark`, `memtier_benchmark`, and
  existing Redis client libraries for seamless integration.
- **Sharded, low-contention engine** — `N` shards (default `GOMAXPROCS`, configurable) indexed by key hash,
  each guarded by its own `RWMutex`, for near-linear scaling across cores.
- **Configurable TTL eviction** — an active timing wheel evicts expired
  keys in O(1); lazy eviction on read backs it up for efficient key management.
- **Optional at-rest encryption** — ChaCha20-Poly1305, off by default, for
  secure data storage when needed.
- **Per-shard WAL persistence** — an append-only write-ahead log per shard
  for crash recovery. Disabled by default; enable with `--enable-persistence`.
- **Metrics & tracing** — a built-in Prometheus exporter and optional
  OpenTelemetry tracing for comprehensive observability.

## What's here today vs. on the roadmap

Tellstone's core engine (Phase 1) and persistence (Phase 1.5) are done:
the sharded store, both protocols, TTL eviction, encryption, observability,
and per-shard WAL for crash recovery. Clustering, replication, and a
broader command set are **Phase 2** — see the
[clustering page](/docs/operations/clustering/) for current status.

**Phase 1 — Core Engine (done):** sharded in-memory engine with TTL
eviction, binary TCP protocol, Redis-compatible RESP listener
(`PING`/`GET`/`SET`/`DEL`), at-rest encryption, Prometheus metrics, and
OpenTelemetry tracing.

**Phase 1.5 — Persistence (done):** per-shard append-only WAL with
TTL-aware replay, tombstone deletes, crash-safe truncation, and
zero-allocation writes. Enable with `--enable-persistence`.

**Phase 2 — Distributed (future):** event-driven replication (e.g. NATS
JetStream), write-through/write-behind persistence to external stores,
official client SDKs, and a broader RESP command set (RESP3, `INCR`,
`EXPIRE`, `MULTI`/`EXEC`).

## Where to go next

- [Install and build Tellstone](/docs/getting-started/installation/) from source.
- Walk through the [quickstart](/docs/getting-started/quickstart/) to store
  and read your first key.
- Read [Architecture](/docs/concepts/architecture/) for how the protocols
  and storage engine fit together.
- Explore [Concepts](/docs/concepts/data-model/) to understand the data model and key/value structure.
