import axios from "axios";
import { assert } from "console";

export class LottieApiClient {
  private baseUrl: string;
  private apiKey: string;
  private axiosInstance: any;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = "https://lottiefiles.com/api"; 
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      params: {
        key: apiKey,
        format: 'json'
      }
    });
  }

  async searchAnimations(query: string, page: number = 1, limit: number = 20) {
    try {
      const response = await this.axiosInstance.get(
        `${this.baseUrl}/search/get-animations`,
        {
          params: {
            query,
            page,
            limit,
          },
        }
      );
      return response.data.data.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to search animations: ${error.message}`);
      }
      throw new Error('Failed to search animations: Unknown error');
    }
  }

  async getAnimationById(id: string) {
    try {
      const response = await this.axiosInstance.get(`${this.baseUrl}/animations/get-animation-data`, {
        params: {
          fileId: id
        }
      });
      
      return response.data
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get animation: ${error.message}`);
      }
      throw new Error('Failed to get animation: Unknown error');
    }
  }

  async getAnimationByUser(user: string, page: number = 1, limit: number = 20) {
    try {
      const response = await this.axiosInstance.get(
        `${this.baseUrl}/search/get-users`,
        {
          params: {
            query: user,
            page,
            limit,
          },
        }
      );
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get animation: ${error.message}`);
      }
      throw new Error('Failed to get animation: Unknown error');
    }
  }

  async getPopularAnimations(page: number = 1, limit: number = 20) {
    try {
      const response = await this.axiosInstance.get(`${this.baseUrl}/iconscout/popular-animations-weekly?api=%26sort%3Dpopular`, {
        params: {
          page,
          limit
        },
      });

      return response.data.popularWeeklyData.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Failed to get popular animations: ${error.message}`);
      }
      throw new Error('Failed to get popular animations: Unknown error');
    }
  }
}
