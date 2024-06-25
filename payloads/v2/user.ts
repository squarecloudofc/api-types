import type { APIPayload } from "../../common";
import type { ApplicationLanguage } from "./application";

/**
 * APIUserPlan#name
 * @see https://docs.squarecloud.app/api-reference/endpoint/user/info
 */
export enum UserPlanName {
	Free = "free",
	Student = "student",
	Hobby = "hobby",
	Standard = "standard",
	Pro = "pro",
	Business = "business",
	Enterprise32 = "enterprise-32",
	Enterprise48 = "enterprise-48",
	Enterprise64 = "enterprise-64",
	Enterprise96 = "enterprise-96",
	Enterprise128 = "enterprise-128",
	Enterprise160 = "enterprise-160",
	Enterprise192 = "enterprise-192",
	Enterprise224 = "enterprise-224",
	Enterprise256 = "enterprise-256",
	Enterprise288 = "enterprise-288",
	Enterprise320 = "enterprise-320",
	Enterprise384 = "enterprise-384",
	Enterprise448 = "enterprise-448",
	Enterprise512 = "enterprise-512",
}

/**
 * APIUserPlan#memory
 * @see https://docs.squarecloud.app/api-reference/endpoint/user/info
 */
export interface APIUserPlanMemory {
	limit: number;
	available: number;
	used: number;
}

/**
 * APIUser#plan
 * @see https://docs.squarecloud.app/api-reference/endpoint/user/info
 */
export interface APIUserPlan {
	name: UserPlanName;
	memory: APIUserPlanMemory;
	duration: number | null;
}

/**
 * APIUser
 * @see https://docs.squarecloud.app/api-reference/endpoint/user/info
 */
export interface APIUser {
	id: string;
	tag: string;
	email: string;
	plan: APIUserPlan;
}

/**
 * APIUserApplication
 * @see https://docs.squarecloud.app/api-reference/endpoint/user/info
 */
export interface APIUserApplication {
	id: string;
	tag: string;
	desc?: string;
	ram: number;
	lang: ApplicationLanguage;
	cluster: string;
	isWebsite: boolean;
}

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/user/info
 */
export interface APIUserInfo {
	user: APIUser;
	applications: APIUserApplication[];
}

export type APIUserInfoPayload = APIPayload<APIUserInfo>;
