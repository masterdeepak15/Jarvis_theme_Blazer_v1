#!/usr/bin/env bash
# ============================================================
#  Vercel build script for the JarvisUI WebAssembly docs app.
#  Vercel's build image has no .NET, so we install the SDK,
#  then publish the Blazor WASM project to ./output.
#  Vercel then serves ./output/wwwroot as a static site.
# ============================================================
set -euo pipefail

DOTNET_VERSION="8.0"
DOTNET_DIR="$HOME/.dotnet"

echo "▶ Installing .NET SDK ${DOTNET_VERSION} ..."
curl -sSL https://dot.net/v1/dotnet-install.sh -o dotnet-install.sh
chmod +x dotnet-install.sh
./dotnet-install.sh --channel "${DOTNET_VERSION}" --install-dir "${DOTNET_DIR}" --no-path

export PATH="${DOTNET_DIR}:${PATH}"
export DOTNET_CLI_TELEMETRY_OPTOUT=1
export DOTNET_SKIP_FIRST_TIME_EXPERIENCE=1

echo "▶ .NET version: $(dotnet --version)"

echo "▶ Publishing JarvisUI.Docs.Wasm ..."
dotnet publish JarvisUI.Docs.Wasm/JarvisUI.Docs.Wasm.csproj \
  -c Release \
  -o output

echo "✔ Publish complete. Static output is in ./output/wwwroot"
