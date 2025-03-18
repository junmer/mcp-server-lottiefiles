import { CallToolRequest, ListToolsRequest } from "@modelcontextprotocol/sdk/types.js";
import { LottieApiClient } from '../api/LottieApiClient.js';

export class ToolHandler {
  constructor(private apiClient: LottieApiClient) {
    this.apiClient = apiClient
  }

  async listTools(request: ListToolsRequest) {
    return {
      tools: [
        {
          name: "search_animations",
          description: "Search for Lottie animations by keywords, tags, and other criteria. Supports pagination.",
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Search keywords that match animation names, descriptions, tags, etc."
              },
              page: {
                type: "integer",
                description: "Page number, starting from 1",
                minimum: 1,
                default: 1
              },
              limit: {
                type: "integer",
                description: "Number of items per page",
                minimum: 1,
                maximum: 100,
                default: 20
              }
            }
          }
        },
        {
          name: "get_animation_details",
          description: "Get detailed information about a specific Lottie animation, including animation data, preview images, and tags.",
          inputSchema: {
            type: "object",
            properties: {
              id: {
                type: "string",
                description: "Unique identifier of the animation"
              }
            },
            required: ["id"]
          }
        },
        {
          name: "get_popular_animations",
          description: "Get a list of currently popular Lottie animations.",
          inputSchema: {
            type: "object",
            properties: {
              page: {
                type: "integer",
                description: "Page number, starting from 1",
                minimum: 1,
                default: 1
              },
              limit: {
                type: "integer",
                description: "Number of items per page",
                minimum: 1,
                maximum: 100,
                default: 20
              }
            }
          }
        }
      ]
    };
  }

  async callTool(request: CallToolRequest) {
    const { name, arguments: args } = request.params;

    console.log(name, args);

    switch (name) {
      case "search_animations":
        return await this.apiClient.searchAnimations(
          args?.query as string,
          args?.page as number,
          args?.limit as number
        );

      case "get_animation_details":
        return await this.apiClient.getAnimationById(args?.id as string);

      case "get_popular_animations":
        return await this.apiClient.getPopularAnimations(
          args?.page as number,
          args?.limit as number
        );

      default:
        throw new Error(`Unknown tool: ${name}`);
    }
  }
} 