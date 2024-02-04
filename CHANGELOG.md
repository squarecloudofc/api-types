# @squarecloud/api-types

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
