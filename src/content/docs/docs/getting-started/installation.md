---
title: Installation
description: Install Tellstone via APT, Homebrew, pre-built binaries, or build from source.
sidebar:
  order: 2
---

## APT (Debian/Ubuntu)

```sh
# Import the signing key
curl -fsSL https://saxy.github.io/tellstone-apt/key.gpg \
  | sudo gpg --dearmor -o /usr/share/keyrings/tellstone.gpg

# Add the repository
echo "deb [signed-by=/usr/share/keyrings/tellstone.gpg] https://saxy.github.io/tellstone-apt stable main" \
  | sudo tee /etc/apt/sources.list.d/tellstone.list

# Install
sudo apt update && sudo apt install tellstone
```

## Homebrew (macOS/Linux)

```sh
brew tap Saxy/tellstone-tap
brew install --cask Saxy/tellstone-tap/tellstone
```

## Binary downloads

Pre-built binaries for Linux, macOS, and Windows (amd64/arm64) are available on the
[GitHub Releases](https://github.com/Saxy/Tellstone/releases) page.

```sh
# Example: Linux amd64
curl -fsSL https://github.com/Saxy/Tellstone/releases/latest/download/tellstone_1.0.0_linux_amd64.tar.gz \
  | tar xz
sudo mv tellstone /usr/local/bin/
```

Verify the installation:

```sh
tellstone --version
```

## Build from source

### Prerequisites

- **Go 1.26+**
- Optional: [`task`](https://taskfile.dev) (go-task) for the shortcuts below
- Optional, for RESP benchmarking: `redis-cli`, `memtier_benchmark`, or `redis-tools`

### Build

```sh
git clone https://github.com/Saxy/Tellstone
cd Tellstone
task build          # -> ./bin/tellstone
```

Without `task`, build directly with Go:

```sh
go build -o bin/tellstone ./cmd/tellstone
```

### Run

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
- `TSD_ENABLE_PERSISTENCE=true` to enable WAL persistence for crash recovery

Next: run through the [quickstart](/docs/getting-started/quickstart/) to store and read your first key.
