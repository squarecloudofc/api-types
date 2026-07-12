<div align="center">
  <img alt="Square Cloud Banner" src="https://cdn.squarecloud.app/png/github-readme.png">
</div>

<h1 align="center">@squarecloud/api-types</h1>

<p align="center">Official type definitions for the <a href="https://squarecloud.app" target="_blank">Square Cloud</a> API.</p>

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

Visit the [official API reference](https://docs.squarecloud.app/en/api-reference/) for details about every route, payload and error code.

## Getting Started

Specify the desired API version by appending `/v*` to the import path, where `*` is your chosen API version:

```ts
// Importing the API definitions for version 2
import { APIApplication, APIErrorCode } from "@squarecloud/api-types/v2";
```

You can also import only the specific parts of the module that you need. Your choices include `common/v*`, `utils`, `payloads/v*` and `rest/v*`:

```ts
// Importing a specific REST endpoint type for version 2
import { RESTPostAPIApplicationCommitQuery } from "@squarecloud/api-types/rest/v2";
```

> [!NOTE]
> The `v*` exports (`@squarecloud/api-types/v*`) include the relevant version of `payloads` and `rest`, alongside the `common` and `utils` exports.

## Project Structure

The exported types for each API version are organized into two main categories:

- Types with an `API` prefix represent payloads you may receive from the REST API.
- Types with a `REST` prefix represent data that is sent to and received from the REST API.

For endpoint options in the `REST` category, they follow a specific structure: `REST<HTTP Method><Type><Query|(JSON|FormData)Body|Result|ResultPayload>`, where the type indicates the expected return data. For example, `RESTPostAPIApplicationCommitQuery` or `RESTPostAPIApplicationUploadResult`.

- If a type name ends with `Result`, it represents the expected result when calling its corresponding route.
- If a type name ends with `ResultPayload`, it represents the raw result you can expect when calling its corresponding route.

Machine-readable error codes returned by the API are available through the `APIErrorCode` constant, which also keeps the pre-standardization names as deprecated aliases.

## Related Projects

- [`@squarecloud/api`](https://github.com/squarecloudofc/sdk-api-js) — NodeJS SDK for the Square Cloud API
- [`@squarecloud/blob`](https://github.com/squarecloudofc/sdk-blob-js) — NodeJS SDK for Square Cloud Blob storage

## Contributing

Bug reports and PRs are welcome at [`squarecloudofc/api-types`](https://github.com/squarecloudofc/api-types).
