# @squarecloud/api-types

## 0.4.0

### Minor Changes

- 4d7babe: Update `UserPlanName` to include `Enterprise-16` new plan.
  Remove `Business` plan from `UserPlanName`.

## 0.3.3

### Patch Changes

- df0a13d: Remove `RESTPostAPIApplicationCommitQuery` due to API changes

## 0.3.2

### Patch Changes

- 79b1e02: Make deployment state an enum: `DeploymentState`
- 5b1f4af: Update `ApplicationLanguage` enum with new `dotnet` lang

## 0.3.1

### Patch Changes

- 5e67a46: Add typings for `/apps/:appId/deployments/current` (`APIDeploymentCurrent`)

## 0.3.0

### Minor Changes

- ef69efb: Add typings for `/apps/:appId/network/dns` (`APINetworkDNS`)
- 78f00c9: Add `RESTPostAPIApplicationBackup` and update `APIApplicationBackup`
- 211a9d4: Update file-related typings to match new API convention
- 3ef25a4: Implement branded types for UserId and ApplicationId
- 211a9d4: Add typings for `PATCH /apps/:appId/files`
- 58d009d: Add typings for `/apps/:appId/network/custom` (`RESTPostAPINetworkCustomDomainJSONBody`)
- a15ce71: Add typings for `/service/status` (`APIServiceStatus`)

### Patch Changes

- b3c226d: Completely remove deprecated `tag` and `isWebsite` properties

## 0.2.5

### Patch Changes

- b3f1a17: Update `UserPlanName` with new Enterprise plans

## 0.2.4

### Patch Changes

- 4b4ddc1: Deprecate APIUser, APIUserApplication and RESTPostAPIApplicationUploadResult `tag` property.
- 4b4ddc1: Deprecate APIApplication, APIWebsiteApplication and APIUserApplication `isWebsite` property.

## 0.2.3

### Patch Changes

- ecd05cf: Add `free` and `student` to `UserPlanName`
- ab66f4c: remove `locale` from `APIUser`

## 0.2.2

### Patch Changes

- 881b9a1: Add `static` to `ApplicationLanguage` enum

## 0.2.1

### Patch Changes

- c013db0: remove `APIApplication#gitIntegration` due to API changes

## 0.2.0

### Minor Changes

- c4b38e3: remove `avatar` from `APIApplication`, `APIUserApplication` and `RESTPostAPIApplicationUploadResult`
- 59da443: update `UserPlanName` enum to new plans

### Patch Changes

- 2504cbd: improve JSDocs

## 0.1.0

### Minor Changes

- 004808a: add typings for /apps/all/status route

### Patch Changes

- 0f3cd4e: improve common interfaces naming
- d3dbca7: rename some typings under application#files

## 0.0.4

### Patch Changes

- b24724c: improve comments and file structure
- b4865e1: simplify `RESTPostAPIFileCreateJSONBody#buffer`
- 2dcfab4: add descriptions properties to Applications\*

## 0.0.3

### Patch Changes

- 19c73d1: fix `APIDeploy#state` named incorrectly
  remove `APIApplication#cpu`
  make `RESTPostAPIApplicationUploadResult#cpu` not nullable
  add enum for `APIApplication#language`
  add enum for `APIApplicationStatus#status`
  add enum for `APIDeploy#state`
  add enum for `APIFile#type`
  improve typings for `APIDeploy`

## 0.0.2

### Patch Changes

- 9e85d33: added README

## 0.0.1

### Patch Changes

- 1baa4f5: First version!
