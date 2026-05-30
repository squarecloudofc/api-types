import type { ApplicationId, UserId, WorkspaceId } from "../../common/v2";
import type { WorkspaceInviteGroup } from "../../payloads/v2/workspace";

/**
 * Body for `POST /v2/workspaces`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/create
 */
export interface RESTPostAPIWorkspaceJSONBody {
	/** Workspace name, 1-32 chars. */
	name: string;
}

/**
 * Body for `DELETE /v2/workspaces`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/delete
 */
export interface RESTDeleteAPIWorkspaceJSONBody {
	workspaceId: WorkspaceId;
}

/**
 * Body for `POST /v2/workspaces/applications` — share an application with the
 * workspace.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/applications
 */
export interface RESTPostAPIWorkspaceApplicationsJSONBody {
	workspaceId: WorkspaceId;
	appId: ApplicationId;
}

/**
 * Body for `DELETE /v2/workspaces/applications`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/applications
 */
export interface RESTDeleteAPIWorkspaceApplicationsJSONBody {
	workspaceId: WorkspaceId;
	appId: ApplicationId;
}

/**
 * Body for `DELETE /v2/workspaces/leave` — leave a workspace as a member.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/leave
 */
export interface RESTDeleteAPIWorkspaceLeaveJSONBody {
	workspaceId: WorkspaceId;
}

/**
 * Body for `POST /v2/workspaces/members` — add a member by invite code.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/members
 */
export interface RESTPostAPIWorkspaceMembersJSONBody {
	workspaceId: WorkspaceId;
	/** Invite code from `GET /v2/workspaces/members/code`. */
	code: string;
	group: WorkspaceInviteGroup;
}

/**
 * Body for `PATCH /v2/workspaces/members` — change a member's group.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/members
 */
export interface RESTPatchAPIWorkspaceMembersJSONBody {
	workspaceId: WorkspaceId;
	memberId: UserId;
	group: WorkspaceInviteGroup;
}

/**
 * Body for `DELETE /v2/workspaces/members`.
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/members
 */
export interface RESTDeleteAPIWorkspaceMembersJSONBody {
	workspaceId: WorkspaceId;
	memberId: UserId;
}
