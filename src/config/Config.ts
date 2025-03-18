import dotenv from 'dotenv';

export class Config {
  private static instance: Config | null = null;
  private readonly apiKey: string;

  private constructor() {
    dotenv.config();
    
    const apiKey = process.env.LOTTIFILES_API_KEY;
    // maybe we can use api key in the future
    // if (!apiKey) {
    //   throw new Error("LOTTIFILES_API_KEY environment variable is required");
    // }
    this.apiKey = apiKey || "";
  }

  static getInstance(): Config {
    if (!Config.instance) {
      Config.instance = new Config();
    }
    return Config.instance;
  }

  getApiKey(): string {
    return this.apiKey;
  }
} 