import type { ApplicationId, UserId, WorkspaceId } from "../../common/v2";
import type { WorkspaceInviteGroup } from "../../payloads/v2/workspace";

/**
 * Body of `POST /v2/workspaces`, which creates a workspace you own.
 *
 * Workspaces are available on the Standard, Pro and Enterprise plans, up to
 * the plan's workspace limit.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/create
 */
export interface RESTPostAPIWorkspaceJSONBody {
	/** The workspace name, 1 to 32 letters, numbers, spaces, hyphens or underscores. */
	name: string;
}

/**
 * Body of `DELETE /v2/workspaces`, which deletes a workspace. Only its owner
 * can delete it.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/delete
 */
export interface RESTDeleteAPIWorkspaceJSONBody {
	workspaceId: WorkspaceId;
}

/**
 * Body of `POST /v2/workspaces/applications`, which shares one of your
 * applications with a workspace you own. A workspace holds up to 100
 * applications.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/applications
 */
export interface RESTPostAPIWorkspaceApplicationsJSONBody {
	workspaceId: WorkspaceId;
	appId: ApplicationId;
}

/**
 * Body of `DELETE /v2/workspaces/applications`, which stops sharing an
 * application with a workspace. Only the workspace owner can do it.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/applications
 */
export interface RESTDeleteAPIWorkspaceApplicationsJSONBody {
	workspaceId: WorkspaceId;
	appId: ApplicationId;
}

/**
 * Body of `DELETE /v2/workspaces/leave`, which removes you from a workspace
 * you are a member of. The owner cannot leave and deletes the workspace
 * instead.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/leave
 */
export interface RESTDeleteAPIWorkspaceLeaveJSONBody {
	workspaceId: WorkspaceId;
}

/**
 * Body of `POST /v2/workspaces/members`, which adds a member with the invite
 * code they generated.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/members
 */
export interface RESTPostAPIWorkspaceMembersJSONBody {
	workspaceId: WorkspaceId;
	/** The invite code the new member generated, valid for 5 minutes. */
	code: string;
	/** The role to give the new member. */
	group: WorkspaceInviteGroup;
}

/**
 * Body of `PATCH /v2/workspaces/members`, which changes a member's role. The
 * owner cannot change their own role.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/members
 */
export interface RESTPatchAPIWorkspaceMembersJSONBody {
	workspaceId: WorkspaceId;
	memberId: UserId;
	/** The new role. */
	group: WorkspaceInviteGroup;
}

/**
 * Body of `DELETE /v2/workspaces/members`, which removes a member. Only the
 * workspace owner can do it.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/members
 */
export interface RESTDeleteAPIWorkspaceMembersJSONBody {
	workspaceId: WorkspaceId;
	memberId: UserId;
}
