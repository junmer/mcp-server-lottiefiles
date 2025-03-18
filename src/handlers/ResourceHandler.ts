import { LottieApiClient } from '../api/LottieApiClient.js';
import { ListResourcesRequest, ReadResourceRequest } from '@modelcontextprotocol/sdk/types.js';

export class ResourceHandler {
  constructor(private apiClient: LottieApiClient) {
    this.apiClient = apiClient
  }

  async listResources(request: ListResourcesRequest) {
    return {
      resources: [
        {
          name: "animations",
          description: "List of Lottie animations",
          schema: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "Search keywords"
              },
              page: {
                type: "integer",
                description: "Page number"
              },
              limit: {
                type: "integer",
                description: "Number of items per page"
              }
            }
          }
        },
        {
          name: "popular",
          description: "Popular Lottie animations",
          schema: {
            type: "object",
            properties: {
              page: {
                type: "integer",
                description: "Page number"
              },
              limit: {
                type: "integer",
                description: "Number of items per page"
              }
            }
          }
        }
      ]
    };
  }

  async readResource(request: ReadResourceRequest) {
    const { uri } = request.params;
    const name = uri.split('/')[0];

    switch (name) {
      case "animations":
        return await this.apiClient.searchAnimations(
          request.params.query as string,
          request.params.page as number,
          request.params.limit as number
        );

      case "popular":
        return await this.apiClient.getPopularAnimations(
          request.params.page as number,
          request.params.limit as number
        );

      default:
        throw new Error(`Unknown resource: ${name}`);
    }
  }
} 