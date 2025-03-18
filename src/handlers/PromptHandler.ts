import { McpError, ErrorCode, ListPromptsRequest, GetPromptRequest } from "@modelcontextprotocol/sdk/types.js";
import { Prompt } from "../types.js";

export class PromptHandler {

  async listPrompts(request: ListPromptsRequest) {
    return {
      prompts: [
        {
          name: "search_animations",
          description: "Search for Lottie animations",
          inputSchema: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Search keywords"
              }
            }
          }
        },
        {
          name: "get_popular_animations",
          description: "Get popular Lottie animations",
          inputSchema: {
            type: "object",
            properties: {}
          }
        }
      ]
    };
  }

  async getPrompt(request: GetPromptRequest) {
    const { name, arguments: args } = request.params;

    switch (name) {
      case "search_animations":
        return {
          prompt: `Please help me search for Lottie animations related to "${args?.query}".`,
          tools: ["search_animations"]
        };

      case "get_popular_animations":
        return {
          prompt: "Please help me get the most popular Lottie animations.",
          tools: ["get_popular_animations"]
        };

      default:
        throw new Error(`Unknown prompt: ${name}`);
    }
  }

} 