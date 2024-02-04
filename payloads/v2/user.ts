import { APICommonPayload } from "../../common";

/**
 * /user
 */

/**
 * APIUser#plan#memory
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
  name: string;
  memory: APIUserPlanMemory;
  duration: number | null;
}

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/user/info
 */
export interface APIUser {
  id: string;
  tag: string;
  locale: string;
  email: string;
  plan: APIUserPlan;
}

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/user/info
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
 * @see https://docs.squarecloud.app/api-reference/endpoint/user/info
 */
export interface APIUserInfo {
  user: APIUser;
  applications: APIUserApplication[];
}

export type APIUserInfoPayload = APICommonPayload<APIUserInfo>;
