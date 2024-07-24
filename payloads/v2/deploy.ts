import type { APIPayload, ISODateString } from "../../common/v2";

/**
 * APIDeploy#state
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/deploy/list
 */
export enum DeploymentState {
	Pending = "pending",
	Clone = "clone",
	Success = "success",
	Error = "error",
}

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/deploy/list
 */
export interface APIDeployment {
	id: `git-${string}`;
	state: DeploymentState;
	date: ISODateString;
}

export type APIDeployPayload = APIPayload<APIDeployment[]>;

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/deploy/info
 */
export interface APIDeploymentCurrent {
	webhook: string;
}

export type APIDeploymentCurrentPayload = APIPayload<APIDeploymentCurrent>;
