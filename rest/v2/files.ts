import { APIPayloadStatusOnly } from "../../common";

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/filemanager/create
 */
export interface RESTPostAPIFileCreateJSONBody {
  path: string;
  buffer: number[];
}

export type RESTPostAPIFileCreateResultPayload = APIPayloadStatusOnly;

/**
 * @see https://docs.squarecloud.app/api-reference/endpoint/apps/filemanager/delete
 */
export interface RESTDeleteAPIFileDeleteQuery {
  path: string;
}

export type RESTDeleteAPIFileDeleteResultPayload = APIPayloadStatusOnly;
