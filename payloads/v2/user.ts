import type {
	APIPayload,
	ApplicationId,
	ISODateString,
	UserId,
} from "../../common/v2";
import type { ApplicationLanguage } from "./application";
import type { APIDatabaseSummary } from "./database";

/**
 * Available RAM sizes (GB) for the `hobby` tier.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/me
 */
export type HobbyPlanSizes = 1 | 2;

/**
 * Available RAM sizes (GB) for the `standard` tier.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/me
 */
export type StandardPlanSizes = 4 | 6 | 8;

/**
 * Available RAM sizes (GB) for the `pro` tier.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/me
 */
export type ProPlanSizes = 12 | 16 | 24;

/**
 * Available RAM sizes (GB) for the `enterprise` tier.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/me
 */
export type EnterprisePlanSizes =
	| 24
	| 32
	| 48
	| 64
	| 96
	| 128
	| 160
	| 192
	| 224
	| 256
	| 288
	| 320
	| 384
	| 448
	| 512
	| 640
	| 768
	| 1024;

/**
 * Plan slug returned by `/v2/users/me`. Paid tiers are always suffixed with
 * their RAM size (GB); only `free` has no suffix.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/me
 */
export type UserPlanName =
	| "free"
	| `hobby-${HobbyPlanSizes}`
	| `standard-${StandardPlanSizes}`
	| `pro-${ProPlanSizes}`
	| `enterprise-${EnterprisePlanSizes}`;
export const UserPlanName = {
	Free: "free",
	Hobby: (size: HobbyPlanSizes) => `hobby-${size}` as const,
	Standard: (size: StandardPlanSizes) => `standard-${size}` as const,
	Pro: (size: ProPlanSizes) => `pro-${size}` as const,
	Enterprise: (size: EnterprisePlanSizes) => `enterprise-${size}` as const,
};

/**
 * APIUserPlan#memory
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/me
 */
export interface APIUserPlanMemory {
	limit: number;
	available: number;
	used: number;
}

/**
 * APIUser#plan
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/me
 */
export interface APIUserPlan {
	name: UserPlanName;
	memory: APIUserPlanMemory;
	duration: number | null;
}

/**
 * APIUser
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/me
 */
export interface APIUser {
	id: UserId;
	name: string;
	email: string;
	/** Preferred locale (e.g. `pt-BR`, `en-US`, `es-ES`, `zh-CN`). */
	locale: string;
	plan: APIUserPlan;
	created_at: ISODateString;
}

/**
 * APIUserApplication — compact application descriptor returned under
 * `response.applications` of `/v2/users/me`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/me
 */
export interface APIUserApplication {
	id: ApplicationId;
	name: string;
	desc?: string;
	ram: number;
	lang: ApplicationLanguage;
	cluster: string;
	domain: string | null;
	custom: string | null;
	created_at: ISODateString;
}

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/me
 */
export interface APIUserInfo {
	user: APIUser;
	applications: APIUserApplication[];
	databases: APIDatabaseSummary[];
}

export type APIUserInfoPayload = APIPayload<APIUserInfo>;
