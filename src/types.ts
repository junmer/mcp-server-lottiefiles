export interface LottieAnimation {
  id: string;
  name: string;
  description: string;
  previewUrl: string;
  downloadUrl: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SearchAnimationsParams {
  query: string;
  page?: number;
  limit?: number;
}

export interface GetAnimationParams {
  id: string;
}

export interface GetPopularAnimationsParams {
  page?: number;
  limit?: number;
}

export interface SearchAnimationsResponse {
  animations: LottieAnimation[];
  total: number;
  page: number;
  limit: number;
}

export interface GetPopularAnimationsResponse {
  animations: LottieAnimation[];
  total: number;
  page: number;
  limit: number;
}

export interface Prompt {
  name: string;
  description: string;
  arguments: Array<{
    name: string;
    description: string;
    required: boolean;
  }>;
} 