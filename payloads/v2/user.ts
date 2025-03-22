import type { APIPayload, ApplicationId, UserId } from "../../common/v2";
import type { ApplicationLanguage } from "./application";

/**
 * APIUserPlan#name
 * @see https://docs.squarecloud.app/api-reference/endpoint/users/me
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
 * APIUserPlan#name
 * @see https://docs.squarecloud.app/api-reference/endpoint/users/me
 */
type UserPlanName =
	| "free"
	| "hobby"
	| "standard"
	| "advanced"
	| "pro"
	| `enterprise-${EnterprisePlanSizes}`;
export const UserPlanName = {
	Free: "free",
	Hobby: "hobby",
	Standard: "standard",
	Advanced: "advanced",
	Pro: "pro",
	Enterprise: (size: EnterprisePlanSizes) => `enterprise-${size}`,
};

/**
 * APIUserPlan#memory
 * @see https://docs.squarecloud.app/api-reference/endpoint/users/me
 */
export interface APIUserPlanMemory {
	limit: number;
	available: number;
	used: number;
}

/**
 * APIUser#plan
 * @see https://docs.squarecloud.app/api-reference/endpoint/users/me
 */
export interface APIUserPlan {
	name: UserPlanName;
	memory: APIUserPlanMemory;
	duration: number | null;
}

/**
 * APIUser
 * @see https://docs.squarecloud.app/api-reference/endpoint/users/me
 */
export interface APIUser {
	id: UserId;
	name: string;
	email: string;
	plan: APIUserPlan;
}

/**
 * APIUserApplication
 * @see https://docs.squarecloud.app/api-reference/endpoint/users/me
 */
export interface APIUserApplication {
	id: ApplicationId;
	name: string;
	desc?: string;
	ram: number;
	lang: ApplicationLanguage;
	cluster: string;
}

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/users/me
 */
export interface APIUserInfo {
	user: APIUser;
	applications: APIUserApplication[];
}

export type APIUserInfoPayload = APIPayload<APIUserInfo>;
