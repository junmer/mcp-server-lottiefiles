#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { 
  ListToolsRequestSchema, 
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListPromptsRequestSchema,
  GetPromptRequestSchema
} from "@modelcontextprotocol/sdk/types.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { Config } from "./config/Config.js";
import { LottieApiClient } from "./api/LottieApiClient.js";
import { ToolHandler } from "./handlers/ToolHandler.js";
import { ResourceHandler } from "./handlers/ResourceHandler.js";
import { PromptHandler } from "./handlers/PromptHandler.js";
import { ErrorHandler } from "./error/ErrorHandler.js";

class LottieServer {
  private server: Server;
  private apiClient: LottieApiClient;
  private toolHandler: ToolHandler;
  private resourceHandler: ResourceHandler;
  private promptHandler: PromptHandler;

  constructor() {
    const config = Config.getInstance();
    
    // Initialize API client
    this.apiClient = new LottieApiClient(config.getApiKey());

    // Initialize handlers
    this.toolHandler = new ToolHandler(this.apiClient);
    this.resourceHandler = new ResourceHandler(this.apiClient);
    this.promptHandler = new PromptHandler();

    // Initialize server
    this.server = new Server(
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
            subscribe: false
          },
          prompts: {
            list: true,
            get: true
          }
        }
      }
    );

    this.setupHandlers();
    this.setupErrorHandling();

    this.apiClient.searchAnimations("test", 1, 20);
    this.apiClient.getPopularAnimations(1, 20);
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error("[MCP Error]", error);
    };

    process.on('SIGINT', async () => {
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
    this.server.setRequestHandler(ListResourcesRequestSchema, async (request) => {
      return await this.resourceHandler.listResources(request);
    });

    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      return await this.resourceHandler.readResource(request);
    });

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
  console.error('Failed to start server:', error);
  process.exit(1);
}); 

