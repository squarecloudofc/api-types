import type { APIPayload, ApplicationId, ISODateString } from "../../common/v2";

/**
 * APIApplication#language — canonical runtime slug returned by the API.
 * `static` covers HTML/CSS sites.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/info
 * @see https://docs.squarecloud.app/en/getting-started/config-file
 */
export type ApplicationLanguage =
	| "javascript"
	| "typescript"
	| "python"
	| "java"
	| "elixir"
	| "go"
	| "rust"
	| "ruby"
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
	Ruby: "ruby",
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
	/** Default `<subdomain>.squareweb.app` hostname. `null` for non-web apps. */
	domain: string | null;
	/** Custom domain bound to the app, when configured. */
	custom: string | null;
	created_at: ISODateString;
}

export type APIApplicationPayload = APIPayload<APIApplication>;

/**
 * Narrowing of {@link APIApplication} for web applications — `domain` is
 * always present.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/apps/info
 */
export interface APIWebsiteApplication extends APIApplication {
	domain: string;
}

export type APIWebsiteApplicationPayload = APIPayload<APIWebsiteApplication>;
