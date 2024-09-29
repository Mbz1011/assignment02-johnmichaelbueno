import { APIRequestContext } from "@playwright/test";

export class APIHelper {
  private baseUrl: string;
  private tokenValue: string | null;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.tokenValue = null; // Initialize tokenValue as null
  }

  // Method to login and acquire token
  async loginAndGetToken(request: APIRequestContext): Promise<string> {
    // If token is already set, return it (token caching mechanism)
    if (this.tokenValue) {
      return this.tokenValue;
    }

    const respToken = await request.post(`${this.baseUrl}/login`, {
      data: {
        username: "tester01",
        password: "GteteqbQQgSr88SwNExUQv2ydb7xuf8c"
      }
    });

    // Check if the token acquisition was successful
    if (!respToken.ok()) {
      throw new Error(`Failed to acquire token: ${respToken.status()}`);
    }

    // Extract token from response
    const token = (await respToken.json()).token;

    // Ensure token is a valid string before storing
    if (!token) {
      throw new Error("Token is null or undefined");
    }

    this.tokenValue = token;
    return this.tokenValue;
  }

  // Example method to get rooms using the token
  async getAllRooms(request: APIRequestContext): Promise<any> {
    const token = await this.loginAndGetToken(request); // Get token

    const response = await request.get(`${this.baseUrl}/rooms`, {
      headers: {
        "Content-Type": "application/json",
        "X-user-auth": JSON.stringify({
          username: "tester01",
          token: token
        })
      }
    });

    return response;
  }

  // Additional methods can be added, such as creating, editing, or deleting rooms
}
