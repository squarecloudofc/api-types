import { APICommonPayloadStatusOnly } from "../../common";

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/filemanager/create
 */
export interface RESTPostAPIFileCreateJSONBody {
  path: string;
  buffer: ReturnType<Buffer["toJSON"]>;
}

export type RESTPostAPIFileCreateResultPayload = APICommonPayloadStatusOnly;

/**
 * https://docs.squarecloud.app/api-reference/endpoint/apps/filemanager/delete
 */
export interface RESTDeleteAPIFileDeleteQuery {
  path: string;
}

export type RESTDeleteAPIFileDeleteResultPayload = APICommonPayloadStatusOnly;
