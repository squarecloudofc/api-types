import { APICommonPayload } from "../../common";
import { ApplicationLanguage } from "./application";

/**
 * [user.plan.name] https://docs.squarecloud.app/api-reference/endpoint/user/info
 */
export enum UserPlanName {
  Free = "free",
  Basic = "basic",
  Medium = "medium",
  Advanced = "advanced",
  Senior = "senior",
  Deluxe = "deluxe",
  Orion = "orion",
  Enterprise32 = "enterprise-32",
  Enterprise48 = "enterprise-48",
  Enterprise64 = "enterprise-64",
  Enterprise96 = "enterprise-96",
  Enterprise128 = "enterprise-128",
  Enterprise160 = "enterprise-160",
  Enterprise192 = "enterprise-192",
  Enterprise224 = "enterprise-224",
  Enterprise256 = "enterprise-256",
}

/**
 * [user.plan.memory] https://docs.squarecloud.app/api-reference/endpoint/user/info
 */
export interface APIUserPlanMemory {
  limit: number;
  available: number;
  used: number;
}

/**
 * [user.plan] https://docs.squarecloud.app/api-reference/endpoint/user/info
 */
export interface APIUserPlan {
  name: UserPlanName;
  memory: APIUserPlanMemory;
  duration: number | null;
}

/**
 * [user] https://docs.squarecloud.app/api-reference/endpoint/user/info
 */
export interface APIUser {
  id: string;
  tag: string;
  locale: string;
  email: string;
  plan: APIUserPlan;
}

/**
 * [applications] https://docs.squarecloud.app/api-reference/endpoint/user/info
 */
export interface APIUserApplication {
  id: string;
  tag: string;
  desc?: string;
  ram: number;
  lang: ApplicationLanguage;
  cluster: string;
  isWebsite: boolean;
  avatar: string;
}

/**
 * https://docs.squarecloud.app/api-reference/endpoint/user/info
 */
export interface APIUserInfo {
  user: APIUser;
  applications: APIUserApplication[];
}

export type APIUserInfoPayload = APICommonPayload<APIUserInfo>;
