import { APICommonPayload } from "../../common";

/**
 * /apps/{app_id}/deploy/list
 */

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/deploy/list
 */
export interface APIDeploy {
  id: string;
  status: string;
  date: string;
}

export type APIDeployPayload = APICommonPayload<APIDeploy[]>;
