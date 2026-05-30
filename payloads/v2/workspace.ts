import type {
	APIPayload,
	ApplicationId,
	ISODateString,
	UserId,
	WorkspaceId,
} from "../../common/v2";
import type { ApplicationLanguage } from "./application";

/**
 * Workspace member permission tier. `owner` and `admin` have full management;
 * `maintain` adds operational access (commit, app actions, files, DNS, cache);
 * `manager` covers monitoring and lifecycle control; `view` is read-only.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/info
 */
export type WorkspaceMemberGroup =
	| "owner"
	| "admin"
	| "maintain"
	| "manager"
	| "view";
export const WorkspaceMemberGroup = {
	Owner: "owner",
	Admin: "admin",
	Maintain: "maintain",
	Manager: "manager",
	View: "view",
} as const;

/**
 * Groups that can be assigned via the invite/edit flow. `owner` is excluded
 * because ownership transfer is not exposed through the members API.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/members
 */
export type WorkspaceInviteGroup = Exclude<WorkspaceMemberGroup, "owner">;

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/info
 */
export interface APIWorkspaceMember {
	id: UserId;
	name: string;
	group: WorkspaceMemberGroup;
	joinedAt: ISODateString;
}

/**
 * Application descriptor as embedded in a workspace listing. `desc` is always
 * present but may be `null` when no description is set.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/info
 */
export interface APIWorkspaceApp {
	id: ApplicationId;
	name: string;
	desc: string | null;
	/** Allocated memory in MB. */
	ram: number;
	lang: ApplicationLanguage;
	domain: string | null;
	custom: string | null;
}

/**
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/info
 */
export interface APIWorkspace {
	/** Workspace identifier — UUID v4 without hyphens (32 hex chars). */
	id: WorkspaceId;
	name: string;
	owner: UserId;
	members: APIWorkspaceMember[];
	applications: APIWorkspaceApp[];
	createdAt: ISODateString;
}

export type APIWorkspacePayload = APIPayload<APIWorkspace>;
export type APIWorkspaceListPayload = APIPayload<APIWorkspace[]>;

/**
 * Response of `POST /v2/workspaces`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/create
 */
export interface APIWorkspaceCreatedResponse {
	id: WorkspaceId;
	name: string;
}

export type APIWorkspaceCreatedPayload =
	APIPayload<APIWorkspaceCreatedResponse>;

/**
 * Response of `GET /v2/workspaces/members/code`. The code is a UUID v4 without
 * hyphens (32 hex chars), valid for 5 minutes.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/members/code
 */
export interface APIWorkspaceInviteCodeResponse {
	code: string;
}

export type APIWorkspaceInviteCodePayload =
	APIPayload<APIWorkspaceInviteCodeResponse>;
