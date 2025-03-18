# LottieFiles MCP Server

A Model Context Protocol (MCP) server for searching and retrieving Lottie animations from LottieFiles.

## Features

- Search Lottie animations
- Get animation details
- Get popular animations list

## Installation

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
