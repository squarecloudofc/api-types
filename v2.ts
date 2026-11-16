/**
 * Type definitions for the Square Cloud REST API, version 2.
 *
 * Use these types to describe the requests you send to and the responses you
 * get from `https://api.squarecloud.app/v2` when you call the API without an
 * SDK. The package ships types and a few constant objects only, and it makes
 * no requests itself.
 *
 * Types that start with `API` describe what the API returns. Types that start
 * with `REST` are named after a route and describe its query, body or
 * response. Every JSON response uses the {@link APIPayload} envelope, and a
 * failed call carries one of the {@link APIErrorCode} values in `code`.
 *
 * Application routes also accept a workspace application: pass its id as
 * `<appId>-<workspaceId>` wherever a route takes an `appId`.
 *
 * @example
 * ```ts
 * import type { APIApplicationStatusPayload } from "@squarecloud/api-types/v2";
 *
 * const res = await fetch(`https://api.squarecloud.app/v2/apps/${appId}/status`, {
 *   headers: { Authorization: process.env.SQUARECLOUD_API_KEY ?? "" },
 * });
 * const payload = (await res.json()) as APIApplicationStatusPayload;
 *
 * if (payload.status === "success") {
 *   console.log(payload.response.cpu, payload.response.ram);
 * } else {
 *   console.error(payload.code, payload.message);
 * }
 * ```
 *
 * @packageDocumentation
 */

export * from "./common/v2";
export * from "./payloads/v2/index";
export * from "./rest/v2/index";
export * from "./utils";
