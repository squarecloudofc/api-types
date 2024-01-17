import { APICommonPayload } from "../../common";

/**
 * /user
 */

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
  name: string;
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
  ram: number;
  lang: string;
  cluster: string;
  isWebsite: boolean;
}

/**
 * https://docs.squarecloud.app/api-reference/endpoint/user/info
 */
export interface APIUserInfo {
  user: APIUser;
  applications: APIUserApplication[];
}

export type APIUserInfoPayload = APICommonPayload<APIUserInfo>;
