# LottieFiles MCP Server
[![smithery badge](https://smithery.ai/badge/mcp-server-lottiefiles)](https://smithery.ai/server/mcp-server-lottiefiles)

A Model Context Protocol (MCP) server for searching and retrieving Lottie animations from LottieFiles.

## Features

- Search Lottie animations
- Get animation details
- Get popular animations list

## Installation

### Installing via Smithery

To install LottieFiles Server for Claude Desktop automatically via [Smithery](https://smithery.ai/server/mcp-server-lottiefiles):

```bash
npx -y smithery install mcp-server-lottiefiles --client claude
```

### Manual Installation
```bash
npm install
```

## Usage

1. Start the server:

```bash
npm start
```

2. Connect using an MCP client

## API Tools

### Search Animations

Search for Lottie animations by keywords.

Parameters:
- `query`: Search keywords
- `page`: Page number (optional, default: 1)
- `limit`: Items per page (optional, default: 20)

### Get Animation Details

Get detailed information about a specific Lottie animation.

Parameters:
- `id`: Unique identifier of the animation

### Get Popular Animations

Get a list of currently popular Lottie animations.

Parameters:
- `page`: Page number (optional, default: 1)
- `limit`: Items per page (optional, default: 20)

## Development

```bash
# Build
npm run build
```

## License

MIT
