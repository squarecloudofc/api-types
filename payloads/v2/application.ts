import type { APIPayload } from "../../common";

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
	Static = "static",
}

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/info
 */
export interface APIApplication {
	id: string;
	name: string;
	desc?: string;
	owner: string;
	cluster: string;
	ram: number;
	language: ApplicationLanguage;
	/** @deprecated - Check for APIWebsiteApplication#domain instead */
	isWebsite?: never;
}

export type APIApplicationPayload = APIPayload<APIApplication>;

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/info
 */
export interface APIWebsiteApplication extends APIApplication {
	/** @deprecated - Check for APIWebsiteApplication#domain instead */
	isWebsite?: never;
	domain: string;
	custom: string | null;
}

export type APIWebsiteApplicationPayload = APIPayload<APIWebsiteApplication>;
