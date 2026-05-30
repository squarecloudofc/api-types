import type { APIPayload, ApplicationId, ISODateString } from "../../common/v2";

/**
 * APIApplication#language
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/info
 */
export type ApplicationLanguage =
	| "javascript"
	| "typescript"
	| "python"
	| "java"
	| "elixir"
	| "go"
	| "rust"
	| "php"
	| "dotnet"
	| "static";
export const ApplicationLanguage = {
	JavaScript: "javascript",
	TypeScript: "typescript",
	Python: "python",
	Java: "java",
	Elixir: "elixir",
	Go: "go",
	Rust: "rust",
	PHP: "php",
	Dotnet: "dotnet",
	Static: "static",
} as const;

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/info
 */
export interface APIApplication {
	id: ApplicationId;
	name: string;
	desc?: string;
	owner: string;
	cluster: string;
	ram: number;
	language: ApplicationLanguage;
	created_at: ISODateString;
}

export type APIApplicationPayload = APIPayload<APIApplication>;

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/info
 */
export interface APIWebsiteApplication extends APIApplication {
	domain: string;
	custom: string | null;
}

export type APIWebsiteApplicationPayload = APIPayload<APIWebsiteApplication>;
