# Square Cloud API Types

Simple type definitions for the [Square Cloud API](https://docs.squarecloud.app/api-reference/).

[![GitHub](https://img.shields.io/github/license/discordjs/discord-api-types)](https://github.com/discordjs/discord-api-types/blob/main/LICENSE.md)
[![npm](https://img.shields.io/npm/v/@squarecloud/api-types?color=crimson&logo=npm)](https://www.npmjs.com/package/@squarecloud/api-types)

## Installation

Install with [npm](https://www.npmjs.com/) / [yarn](https://yarnpkg.com) / [pnpm](https://pnpm.js.org/):

```sh
npm install @squarecloud/api-types
yarn add @squarecloud/api-types
pnpm add @squarecloud/api-types
```

## Getting Started

Using these type definitions is straightforward. You just need to specify the desired API version by appending `/v*` to the import path, where `*` represents your chosen API version. Here are some usage examples:

```ts
// Importing the API definitions for version 2
import { APIApplication } from '@squarecloud/api-types/v2';
```

You can also opt to import only the specific parts of the module that you need. Your choices include `common`, `utils`, `payloads/v*`, `rest/v*`. Here are examples:

```ts
// Importing a specific REST endpoint for version 2
import { RESTPostAPIApplicationCommitQuery } from '@squarecloud/api-types/rest/v2';
```

> _**Note:** The `v*` exports (`@squarecloud/api-types/v*`) include the relevant  version of `payloads` and `rest`, alongside the `common` and `utils` exports._

## Project Structure

The exported types for each API version are organized into two main categories:

- Types with an `API` prefix represent payloads you may receive from the REST API.
- Types with a `REST` prefix represent data that is sent to and received from the REST API.
  
For endpoint options in the `REST` category, they follow a specific structure: `REST<HTTP Method><Type><Query|(JSON|FormData)Body|Result|ResultPayload>`, where the type indicates the expected return data. For example, `RESTPostAPIApplicationCommitQuery` or `RESTPostAPIApplicationUploadResult`.

- If a type name ends with `Result`, it represents the expected result when calling its corresponding route.
- If a type name ends with `ResultPayload`, it represents the raw result you can expect when calling its corresponding route.
