import { APICommonPayload } from "../../common";

/**
 * /service/statistics
 */

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/service/statistics
 */
export interface APIStatistics {
  worker: number;
  statistics: {
    users: number;
    apps: number;
    websites: number;
    ping: number;
    time: number;
  };
}

export type APIStatisticsPayload = APICommonPayload<APIStatistics>;
