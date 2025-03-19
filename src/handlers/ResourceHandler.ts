import { LottieApiClient } from '../api/LottieApiClient.js';
import { ListResourcesRequest, ReadResourceRequest } from '@modelcontextprotocol/sdk/types.js';

export class ResourceHandler {
  constructor(private apiClient: LottieApiClient) {
    this.apiClient = apiClient;
  }

  async listResources(request: ListResourcesRequest) {
    return {
      resources: [{
        uri: "lottiefiles://resources/popular",
        name: "popular",
        mimeType: "application/json",
        description: "Popular Lottie animations"
      }]
    };
  }

  async readResource(request: ReadResourceRequest) {
    const { name, uri } = request.params;

    switch (name) {
      case "popular": {
        const popularList = await this.apiClient.getPopularAnimations(
          request.params.page as number,
          request.params.limit as number
        );
        return {
          contents: [{
            uri,
            mimeType: "application/json",
            text: JSON.stringify(popularList, null, 2)
          }]
        };
      }

      default:
        throw new Error(`Unknown resource: ${name}`);
    }
  }
} 