import type { APIPayload } from "../../common/v2";

/**
 * APINetworkAnalytics Generic Group
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/network/analytics
 */
export type APINetworkAnalyticsGroup<GroupName extends string = string> = {
	[K in GroupName]: string;
} & { visits: number; bytes: number };

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/network/analytics
 */
export interface APINetworkAnalytics {
	hostname: string;
	total: APINetworkAnalyticsGroup;
	countries: APINetworkAnalyticsGroup<"country">[];
	methods: APINetworkAnalyticsGroup<"method">[];
	referers: APINetworkAnalyticsGroup<"referer">[];
	browsers: APINetworkAnalyticsGroup<"browser">[];
	deviceTypes: APINetworkAnalyticsGroup<"device">[];
	operatingSystems: APINetworkAnalyticsGroup<"os">[];
	agents: APINetworkAnalyticsGroup<"agent">[];
	hosts: APINetworkAnalyticsGroup<"host">[];
	paths: APINetworkAnalyticsGroup<"path">[];
}

export type APINetworkAnalyticsPayload = APIPayload<APINetworkAnalytics>;

/**
 * APINetworkDNS#status
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/network/dns
 */
export type APINetworkDNSStatus = "pending" | "pending_validation" | "active";
export const APINetworkDNSStatus = {
	Pending: "pending",
	PendingValidation: "pending_validation",
	Active: "active",
};

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/network/dns
 */
export interface APINetworkDNS {
	type: string;
	name: string;
	value: string;
	status: APINetworkDNSStatus;
}

export type APINetworkDNSPayload = APIPayload<APINetworkDNS[]>;
