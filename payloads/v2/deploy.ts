import { APICommonPayload, ISODateString } from "../../common";

/**
 * /apps/{app_id}/deploy/list
 */

/**
 * [state] https://docs.squarecloud.app/api-reference/endpoint/apps/deploy/list
 */
export enum DeployState {
  Pending = "pending",
  Clone = "clone",
  Success = "success",
  Error = "error",
}

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/deploy/list
 */
export interface APIDeploy {
  id: `git-${string}`;
  state: DeployState;
  date: ISODateString;
}

export type APIDeployPayload = APICommonPayload<APIDeploy[]>;
