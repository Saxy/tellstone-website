---
title: Data Model
description: What a key and value are in Tellstone today, and what's on the roadmap.
sidebar:
  order: 2
---

Today, Tellstone stores a single value type: a byte string, addressed by a
byte-string key. There are no lists, sets, sorted sets, or hashes yet —
those are tracked as Phase 2 work (see
[Introduction](/docs/getting-started/introduction/#whats-here-today-vs-on-the-roadmap)).

## Keys and values

Both the native binary protocol and the RESP2 listener work with the same
underlying `(key, value, ttl)` triple:

- **Key** — arbitrary bytes, typically a UTF-8 string in practice.
- **Value** — arbitrary bytes. Tellstone doesn't interpret or validate the
  contents; encoding (JSON, msgpack, protobuf, plain text) is entirely up
  to your application.
- **TTL** — optional, set in milliseconds on the native protocol
  (`ttlMs=0` means no expiry) or via `EX seconds` / `PX milliseconds` on
  RESP.

## Expiry

A key with a TTL is evicted by the timing wheel described in
[Architecture](/docs/concepts/architecture/), and is also treated as
absent by lazy eviction on read even if the active sweep hasn't reached it
yet — so reads never observe a logically-expired value.

## If you need richer types today

Because Tellstone doesn't yet have native lists/sets/hashes, common
patterns are:

- Encode a small structured value as JSON or msgpack and store it as one
  value under one key.
- Use key naming conventions (e.g. `queue:orders:123`) to emulate
  grouping, and read the full set of related keys back with your own
  application logic — there is no server-side `SCAN`/pattern-match yet.

## Next: the command reference

See the [command reference](/docs/commands/overview/) for the exact
commands available on each protocol today.
