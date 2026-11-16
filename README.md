<div align="center">
  <img alt="Square Cloud Banner" src="https://cdn.squarecloud.app/png/github-readme.png">
</div>

<h1 align="center">@squarecloud/api-types</h1>

<p align="center">Official type definitions for the <a href="https://squarecloud.app" target="_blank">Square Cloud</a> API.</p>

> [!TIP]
> [`@squarecloud/api`](https://github.com/squarecloudofc/sdk-api-js) 6 ships its own types and is the recommended way to use the Square Cloud API from JavaScript and TypeScript. Use this package when you call the REST API directly, without the SDK.

<div align="center">
  <div style="width: fit-content; display: flex; align-items: flex-start; gap: 4px;">
    <img alt="NPM License" src="https://img.shields.io/npm/l/@squarecloud/api-types">
    <img alt="NPM Downloads" src="https://img.shields.io/npm/dw/@squarecloud/api-types">
    <a href="https://npmjs.com/package/@squarecloud/api-types">
      <img alt="NPM Version" src="https://img.shields.io/npm/v/@squarecloud/api-types">
    </a>
  </div>
</div>

## Installation

```bash
npm install @squarecloud/api-types
# or
yarn add @squarecloud/api-types
# or
pnpm add @squarecloud/api-types
```

## Documentation

The [API reference](https://docs.squarecloud.app/en/api-reference/) describes every route, payload and error code. Most types in this package also link to their page there.

## Getting started

Import the types from `@squarecloud/api-types/v2`, which covers the `/v2` routes of the REST API:

```ts
import type { APIApplicationStatusPayload } from "@squarecloud/api-types/v2";

const res = await fetch(`https://api.squarecloud.app/v2/apps/${appId}/status`, {
  headers: { Authorization: process.env.SQUARECLOUD_API_KEY ?? "" },
});
const payload = (await res.json()) as APIApplicationStatusPayload;

if (payload.status === "success") {
  console.log(payload.response.cpu, payload.response.ram);
} else {
  console.error(payload.code, payload.message);
}
```

You can also import one part of the package: `common/v2`, `utils`, `payloads/v2` or `rest/v2`.

```ts
import type { RESTPostAPIApplicationCommitQuery } from "@squarecloud/api-types/rest/v2";
```

> [!NOTE]
> `@squarecloud/api-types/v2` includes `payloads/v2` and `rest/v2`, together with `common/v2` and `utils`.

## Project structure

The types of each API version fall into two groups:

- Types with an `API` prefix describe data the REST API returns.
- Types with a `REST` prefix are named after a route and describe what you send to it and what it returns.

`REST` type names follow the pattern `REST<HTTP method><Type><Query|JSONBody|FormDataBody|Result|ResultPayload>`, such as `RESTPostAPIApplicationCommitQuery` or `RESTPostAPIApplicationUploadResult`.

- A name that ends with `Result` is the data the route returns.
- A name that ends with `ResultPayload` is the whole response, with the `status` envelope around the data.

The `APIErrorCode` constant lists the error codes the API returns in `code`, and each code says when it happens and what to do. The list grows over time, so treat a code you do not know as a generic failure of the HTTP status it came with.

## Related projects

- [`@squarecloud/api`](https://github.com/squarecloudofc/sdk-api-js) is the official JavaScript SDK for the Square Cloud API.
- [`@squarecloud/blob`](https://github.com/squarecloudofc/sdk-blob-js) is the official JavaScript SDK for Square Cloud Blob Storage.

## Contributing

Bug reports and pull requests are welcome at [`squarecloudofc/api-types`](https://github.com/squarecloudofc/api-types).
