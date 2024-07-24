import type { APIPayload, ApplicationId } from "../../common/v2";

/**
 * APIApplication#language
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/info
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
	Dotnet = "dotnet",
	Static = "static",
}

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/info
 */
export interface APIApplication {
	id: ApplicationId;
	name: string;
	desc?: string;
	owner: string;
	cluster: string;
	ram: number;
	language: ApplicationLanguage;
}

export type APIApplicationPayload = APIPayload<APIApplication>;

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/info
 */
export interface APIWebsiteApplication extends APIApplication {
	domain: string;
	custom: string | null;
}

export type APIWebsiteApplicationPayload = APIPayload<APIWebsiteApplication>;
