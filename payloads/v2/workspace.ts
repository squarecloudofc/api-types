import type {
	APIPayload,
	ApplicationId,
	ISODateString,
	UserId,
	WorkspaceId,
} from "../../common/v2";
import type { ApplicationLanguage } from "./application";

/**
 * The role of a workspace member. `owner` and `admin` can do everything,
 * `maintain` adds operational access such as commits, application actions,
 * files, DNS and cache, `manager` covers monitoring and starting, stopping
 * and restarting applications, and `view` can only read.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/info
 */
export type WorkspaceMemberGroup =
	| "owner"
	| "admin"
	| "maintain"
	| "manager"
	| "view";
/** The {@link WorkspaceMemberGroup} values by name. */
export const WorkspaceMemberGroup = {
	Owner: "owner",
	Admin: "admin",
	Maintain: "maintain",
	Manager: "manager",
	View: "view",
} as const;

/**
 * The roles you can give when you add a member or change a member's role.
 * `owner` is not one of them, because the members API cannot transfer
 * ownership.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/members
 */
export type WorkspaceInviteGroup = Exclude<WorkspaceMemberGroup, "owner">;

/**
 * One member of a workspace.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/info
 */
export interface APIWorkspaceMember {
	id: UserId;
	/** The display name. It is `null` when it cannot be found, for example for a deleted account. */
	name: string | null;
	group: WorkspaceMemberGroup;
	/** When the member joined. For the owner, it is when the workspace was created. */
	joinedAt: ISODateString;
}

/**
 * An application shared with a workspace.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/info
 */
export interface APIWorkspaceApp {
	id: ApplicationId;
	/** The display name. */
	name: string;
	/** The description. It is always present and is `null` when no description is set. */
	desc: string | null;
	/** The memory allocated to the application, in MB. */
	ram: number;
	lang: ApplicationLanguage;
	/** The default hostname. It is omitted or `null` when the application has none. */
	domain?: string | null;
	/** The custom domain. It is omitted or `null` when no custom domain is set. */
	custom?: string | null;
}

/**
 * A workspace, with its members and shared applications.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/info
 */
export interface APIWorkspace {
	id: WorkspaceId;
	/** The workspace name, 1 to 32 characters. */
	name: string;
	/** The user id of the workspace's owner. */
	owner: UserId;
	members: APIWorkspaceMember[];
	applications: APIWorkspaceApp[];
	/** When the workspace was created. */
	createdAt: ISODateString;
}

/** The response envelope that carries an {@link APIWorkspace}. */
export type APIWorkspacePayload = APIPayload<APIWorkspace>;
/** The response envelope that carries a list of {@link APIWorkspace}. It is empty when you have no workspaces. */
export type APIWorkspaceListPayload = APIPayload<APIWorkspace[]>;

/**
 * The new workspace, returned when you create one.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/create
 */
export interface APIWorkspaceCreatedResponse {
	id: WorkspaceId;
	/** The workspace name. */
	name: string;
}

/** The response envelope that carries an {@link APIWorkspaceCreatedResponse}. */
export type APIWorkspaceCreatedPayload =
	APIPayload<APIWorkspaceCreatedResponse>;

/**
 * An invite code that lets a workspace owner add you as a member.
 *
 * The code is a UUID v4 without hyphens, 32 hexadecimal characters, and it
 * is valid for 5 minutes. You can generate one every 5 minutes.
 *
 * @see https://docs.squarecloud.app/en/api-reference/endpoint/workspaces/members/code
 */
export interface APIWorkspaceInviteCodeResponse {
	/** The invite code. Give it to the workspace owner. */
	code: string;
}

/** The response envelope that carries an {@link APIWorkspaceInviteCodeResponse}. */
export type APIWorkspaceInviteCodePayload =
	APIPayload<APIWorkspaceInviteCodeResponse>;
