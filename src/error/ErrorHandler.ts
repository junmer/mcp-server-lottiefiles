import { McpError, ErrorCode } from "@modelcontextprotocol/sdk/types.js";
import axios from "axios";

export class ErrorHandler {
  static handleError(error: unknown): never {
    if (axios.isAxiosError(error)) {
      throw new McpError(
        ErrorCode.InternalError,
        `LottieFiles API error: ${error.response?.data?.message || error.message}`
      );
    }

    if (error instanceof McpError) {
      throw error;
    }

    if (error instanceof Error) {
      throw new McpError(
        ErrorCode.InternalError,
        error.message
      );
    }

    throw new McpError(
      ErrorCode.InternalError,
      'An unknown error occurred'
    );
  }

  static validateRequiredParam(param: unknown, paramName: string): void {
    if (param === undefined || param === null) {
      throw new McpError(
        ErrorCode.InvalidRequest,
        `Missing required parameter: ${paramName}`
      );
    }
  }
} 