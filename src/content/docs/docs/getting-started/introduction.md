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
eviction and at-rest encryption.

```
+---------------------------------------------+
|             Your K8s Cluster                 |
|                                               |
|  [App Pod] --( binary :9988 / RESP :6379 )-->|
|                                               |
|     +---------------------------------+       |
|     |        TELLSTONE CORE           |       |
|     |  (256 Sharded In-Memory Buckets)|       |
|     +---------------------------------+       |
+---------------------------------------------+
```

## Why Tellstone?

Many managed databases (PostgreSQL, MySQL, ...) become bottlenecks under
high-frequency workloads. Tellstone offers a lean, memory-efficient buffer
in front of them:

- **Zero-copy binary protocol** — direct binary messages avoid text
  parsing or Protobuf overhead.
- **Redis-compatible** — an optional RESP2 listener lets you drive
  Tellstone with `redis-cli`, `redis-benchmark`, `memtier_benchmark`, and
  existing Redis client libraries.
- **Sharded, low-contention engine** — 256 buckets indexed by key hash,
  each guarded by its own `RWMutex`, for near-linear scaling across cores.
- **Configurable TTL eviction** — an active timing wheel evicts expired
  keys in O(1); lazy eviction on read backs it up.
- **Optional at-rest encryption** — ChaCha20-Poly1305, off by default.
- **Metrics & tracing** — a built-in Prometheus exporter and optional
  OpenTelemetry tracing.

## What's here today vs. on the roadmap

Tellstone's core engine (Phase 1) is done: the sharded store, both
protocols, TTL eviction, encryption, and observability. Clustering,
replication, persistence, and a broader command set are **Phase 2** and
not yet implemented — see the [clustering page](/docs/operations/clustering/)
for current status.

**Phase 1 — Core Engine (done):** sharded in-memory engine with TTL
eviction, binary TCP protocol, Redis-compatible RESP listener
(`PING`/`GET`/`SET`/`DEL`), at-rest encryption, Prometheus metrics, and
OpenTelemetry tracing.

**Phase 2 — Distributed (future):** event-driven replication (e.g. NATS
JetStream), write-through/write-behind persistence, official client SDKs,
and a broader RESP command set (RESP3, `INCR`, `EXPIRE`, `MULTI`/`EXEC`).

## Where to go next

- [Install and build Tellstone](/docs/getting-started/installation/) from source.
- Walk through the [quickstart](/docs/getting-started/quickstart/) to store
  and read your first key.
- Read [Architecture](/docs/concepts/architecture/) for how the protocols
  and storage engine fit together.
