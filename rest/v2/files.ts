import { APICommonPayloadStatusOnly } from "../../common";

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/filemanager/create
 */
export interface RESTPostAPIFileCreateJSONBody {
  path: string;
  buffer: number[];
}

export type RESTPostAPIFileCreateResultPayload = APICommonPayloadStatusOnly;

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/filemanager/delete
 */
export interface RESTDeleteAPIFileDeleteQuery {
  path: string;
}

export type RESTDeleteAPIFileDeleteResultPayload = APICommonPayloadStatusOnly;
