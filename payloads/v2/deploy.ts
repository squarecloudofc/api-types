import type { APIPayload, ISODateString } from "../../common";

/**
 * APIDeploy#state
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/deploy/list
 */
export enum DeployState {
	Pending = "pending",
	Clone = "clone",
	Success = "success",
	Error = "error",
}

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/deploy/list
 */
export interface APIDeploy {
	id: `git-${string}`;
	state: DeployState;
	date: ISODateString;
}

export type APIDeployPayload = APIPayload<APIDeploy[]>;
