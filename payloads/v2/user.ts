import type {
	APIPayload,
	ApplicationId,
	ISODateString,
	UserId,
} from "../../common/v2";
import type { ApplicationLanguage } from "./application";
import type { APIDatabaseSummary } from "./database";

/**
 * The memory sizes of the `hobby` plans, in GB.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/me
 */
export type HobbyPlanSizes = 1 | 2;

/**
 * The memory sizes of the `standard` plans, in GB.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/me
 */
export type StandardPlanSizes = 4 | 6 | 8;

/**
 * The memory sizes of the `pro` plans, in GB.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/me
 */
export type ProPlanSizes = 12 | 16 | 24;

/**
 * The memory sizes of the `enterprise` plans, in GB.
 *
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
 * The name of a plan. A paid plan ends with its memory size in GB, such as
 * `standard-8`, and `free` means the account has no active plan.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/me
 */
export type UserPlanName =
	| "free"
	| `hobby-${HobbyPlanSizes}`
	| `standard-${StandardPlanSizes}`
	| `pro-${ProPlanSizes}`
	| `enterprise-${EnterprisePlanSizes}`;
/** Builds {@link UserPlanName} values from a tier and a size. */
export const UserPlanName = {
	Free: "free",
	Hobby: (size: HobbyPlanSizes) => `hobby-${size}` as const,
	Standard: (size: StandardPlanSizes) => `standard-${size}` as const,
	Pro: (size: ProPlanSizes) => `pro-${size}` as const,
	Enterprise: (size: EnterprisePlanSizes) => `enterprise-${size}` as const,
};

/**
 * The memory of your plan across all applications and databases, in MB.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/me
 */
export interface APIUserPlanMemory {
	/** The total memory the plan grants, in MB. */
	limit: number;
	/** The memory not allocated yet, which is `limit` minus `used`, in MB. */
	available: number;
	/** The memory allocated to applications and databases, in MB. */
	used: number;
}

/**
 * Your plan and its memory.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/me
 */
export interface APIUserPlan {
	name: UserPlanName;
	memory: APIUserPlanMemory;
	/**
	 * When the current plan expires, as a Unix timestamp in milliseconds. It
	 * is `null` when the account has no active plan.
	 */
	duration: number | null;
}

/**
 * Your Square Cloud user profile.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/me
 */
export interface APIUser {
	id: UserId;
	/** The display name, 1 to 24 characters. */
	name: string;
	email: string;
	/**
	 * The preferred locale, such as `pt-BR`, `en-US`, `es-ES`, `zh-CN`,
	 * `ja-JP`, `fr-FR`, `de-DE` or `it-IT`.
	 */
	locale: string;
	plan: APIUserPlan;
	/** When the account was created. */
	created_at: ISODateString;
}

/**
 * A short description of one of your applications, as listed in your account
 * details.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/me
 */
export interface APIUserApplication {
	id: ApplicationId;
	/** The display name. */
	name: string;
	/** The description. The key is omitted when no description is set. */
	desc?: string;
	/** The memory allocated to the application, in MB. */
	ram: number;
	lang: ApplicationLanguage;
	/** The cluster that hosts the application. */
	cluster: string;
	/** The default hostname. It is omitted or `null` when the application has none. */
	domain?: string | null;
	/** The custom domain. It is omitted or `null` when no custom domain is set. */
	custom?: string | null;
	/** When the application was created. */
	created_at: ISODateString;
}

/**
 * Your account details: your profile and plan, with the applications and
 * databases you own.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/users/me
 */
export interface APIUserInfo {
	user: APIUser;
	applications: APIUserApplication[];
	databases: APIDatabaseSummary[];
}

/** The response envelope that carries an {@link APIUserInfo}. */
export type APIUserInfoPayload = APIPayload<APIUserInfo>;
