import { APIPayload } from "../../common";

/**
 * [language] https://docs.squarecloud.app/api-reference/endpoint/apps/info
 */
export enum ApplicationLanguage {
  JavaScript = "javascript",
  TypeScript = "typescript",
  Python = "python",
  Java = "java",
  Elixir = "elixir",
  Go = "go",
  Rust = "rust",
  PHP = "php",
}

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/info
 */
export interface APIApplication {
  id: string;
  name: string;
  desc?: string;
  avatar: string;
  owner: string;
  cluster: string;
  ram: number;
  language: ApplicationLanguage;
  isWebsite: boolean;
  gitIntegration: boolean;
}

export type APIApplicationPayload = APIPayload<APIApplication>;

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/info
 */
export interface APIWebsiteApplication extends APIApplication {
  isWebsite: true;
  domain: string;
  custom: string | null;
}

export type APIWebsiteApplicationPayload = APIPayload<APIWebsiteApplication>;
