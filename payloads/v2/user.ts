import { APICommonPayload } from "./common";

/**
 * /user
 */

/**
 * https://docs.squarecloud.app/api-reference/endpoint/user/info > user > plan > memory
 */
export interface APIUserPlanMemory {
  limit: number;
  available: number;
  used: number;
}

/**
 * https://docs.squarecloud.app/api-reference/endpoint/user/info > user > plan
 */
export interface APIUserPlan {
  name: string;
  memory: APIUserPlanMemory;
  duration: number | null;
}

/**
 * https://docs.squarecloud.app/api-reference/endpoint/user/info > user
 */
export interface APIUser {
  id: string;
  tag: string;
  locale: string;
  email: string;
  plan: APIUserPlan;
}

/**
 * https://docs.squarecloud.app/api-reference/endpoint/user/info > applications
 */
export interface APIUserApplication {
  id: string;
  tag: string;
  ram: number;
  lang: string;
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
