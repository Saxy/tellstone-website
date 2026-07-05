---
title: Command Reference
description: Commands supported by the RESP2 listener and the native binary protocol today.
sidebar:
  order: 1
---

:::note
Tellstone's command set is intentionally small right now (Phase 1). As it
grows, split this into one page per command and link it from here —
Starlight's sidebar `autogenerate` will pick new pages up automatically.
:::

## RESP2 (Redis-compatible)

| Command | Description |
|---|---|
| `PING` | Health check. Replies `PONG`. |
| `GET key` | Retrieve a value, or a nil reply if the key doesn't exist or has expired. |
| `SET key value [EX seconds \| PX milliseconds]` | Set a value, optionally with a TTL. |
| `DEL key` | Delete a key. Replies with the number of keys removed (`0` or `1`). |

Unknown or unimplemented commands return a `-ERR` reply without dropping
the connection, so a client library that speaks standard RESP2 won't hang
or crash when it hits a command Tellstone doesn't support yet.

## Native binary protocol

The binary protocol exposes the same operations as typed Go calls via the
client in `internal/network`, rather than as a text command line:

| Client call | Equivalent to |
|---|---|
| `c.Get(key, scratch)` | `GET` |
| `c.Set(key, value, ttlMs, scratch)` | `SET` with a millisecond TTL (`0` = no expiry) |
| `c.Del(key, scratch)` *(see package docs)* | `DEL` |

See [Architecture](/docs/concepts/architecture/) for how `internal/network`
and `internal/resp` share the same underlying storage engine.

## On the roadmap (Phase 2)

Not yet implemented: RESP3, `INCR`, `EXPIRE`, `MULTI`/`EXEC`, and any
commands operating on list/set/hash types, since those types don't exist
in the storage engine yet either. See
[Data Model](/docs/concepts/data-model/) for the current key/value shape.
