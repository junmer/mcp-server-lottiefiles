#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import dotenv from "dotenv";

import { LottieApiClient } from "./api/LottieApiClient.js";
import { ToolHandler } from "./handlers/ToolHandler.js";
import { ResourceHandler } from "./handlers/ResourceHandler.js";
import { PromptHandler } from "./handlers/PromptHandler.js";
import { ErrorHandler } from "./error/ErrorHandler.js";
class LottieServer {
  private readonly server: Server;
  private readonly apiClient: LottieApiClient;
  private readonly toolHandler: ToolHandler;
  private readonly resourceHandler: ResourceHandler;
  private readonly promptHandler: PromptHandler;

  constructor() {
    // Load environment variables
    dotenv.config();

    // Initialize API client
    this.apiClient = new LottieApiClient();

    // Initialize handlers
    this.toolHandler = new ToolHandler(this.apiClient);
    this.resourceHandler = new ResourceHandler(this.apiClient);
    this.promptHandler = new PromptHandler();

    // Initialize server with configuration
    this.server = this.initializeServer();

    // Setup handlers and error handling
    this.setupHandlers();
    this.setupErrorHandling();
  }

  private initializeServer(): Server {
    return new Server(
      {
        name: "lottiefiles-server",
        version: "1.0.0",
      },
      {
        capabilities: {
          tools: {},
          resources: {
            list: true,
            read: true,
            subscribe: false,
          },
          prompts: {
            list: true,
            get: true,
          },
        },
      }
    );
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error("[MCP Error]", error);
    };
    process.on("SIGINT", async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupHandlers(): void {
    // Tool handlers
    this.server.setRequestHandler(ListToolsRequestSchema, async (request) => {
      return await this.toolHandler.listTools(request);
    });

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      return await this.toolHandler.callTool(request);
    });

    // Resource handlers
    this.server.setRequestHandler(
      ListResourcesRequestSchema,
      async (request) => {
        return await this.resourceHandler.listResources(request);
      }
    );

    this.server.setRequestHandler(
      ReadResourceRequestSchema,
      async (request) => {
        return await this.resourceHandler.readResource(request);
      }
    );

    // Prompt handlers
    this.server.setRequestHandler(ListPromptsRequestSchema, async (request) => {
      return await this.promptHandler.listPrompts(request);
    });

    this.server.setRequestHandler(GetPromptRequestSchema, async (request) => {
      return await this.promptHandler.getPrompt(request);
    });
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
  }
}

// Start the server
const server = new LottieServer();
server.run().catch((error) => {
  ErrorHandler.handleError(error);
});
