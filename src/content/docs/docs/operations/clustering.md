---
title: Clustering & Replication
description: Current status — single-node today, replication and clustering planned for Phase 2.
sidebar:
  order: 2
---

:::caution
Tellstone runs as a **single node** today. There is no replication or
cluster membership yet — this page describes what's planned, not what's
configurable right now.
:::

## Current status

A running Tellstone process is one process holding one in-memory keyspace.
If it restarts, the keyspace is gone — there's no persistence layer yet
either. Plan deployments accordingly: Tellstone today is best suited to
being an in-cluster accelerator or cache in front of a system of record,
not the system of record itself.

## Planned for Phase 2

The project's stated roadmap includes:

- **Event-driven replication** (for example, backed by NATS JetStream) to
  propagate writes from a primary to one or more followers.
- **Write-through / write-behind persistence** to a downstream durable
  store, matching the "Write-Behind Puffer" framing the project uses to
  describe itself.
- **Official client SDKs** beyond the current Go client.
- **A broader RESP command set** (RESP3, `INCR`, `EXPIRE`, `MULTI`/`EXEC`).

None of this is implemented yet. If you're interested in helping design or
build replication, persistence, or a wider command set, see
[Contributing](https://github.com/Saxy/Tellstone#-contributing) in the
main repo — that's explicitly called out as an area where help is wanted.

## Scaling today, without clustering

Until replication lands, options for scaling beyond one node are
application-level:

- Shard keys across independent Tellstone instances yourself (consistent
  hashing in your client), since Tellstone doesn't do this for you across
  nodes yet.
- Run Tellstone as a cache in front of a durable, already-replicated
  database, so a lost node only costs you cache warmth, not data.
