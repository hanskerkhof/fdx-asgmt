# fdx-asgmt

## About

This project was generated using the amazing [Nx](https://nx.dev) build system.
It uses most of the default settings for an NX project. For the form inputs and error display [Angular Material Components](https://material.angular.io/) is used.

The reactive form is an ui-component in a (publishable) library. The workspace app shows the implementation and will submit the form data to a test endpoint.

The reactive form covers the use of Angular `formBuilder`, `Validators` and a custom validator for the password check. To make use of the material `mat-error` component a custom `ErrorStateMatcher` is implemented.

## Prerequisites

To run this app locally you must have the following tools installed.

1. Node.js 16.x LTS [Node.js Downloads](https://nodejs.org/en/download/)
2. Git (see [Download Git](https://git-scm.com/))

## Installation

1. Clone the git repository in your terminal

```bash
git clone git@github.com:hanskerkhof/fdx-asgmt.git
```

2. Go to the app directory

```bash
cd dx-asgmt.git
```

3. Install dependencies

```bash
npm i
```

## Running the development app

```bash
npm run start workspace
```

> Once it is running, open it in your browser [http://localhost:4200/](http://localhost:4200/)

## Developing

Running the tests (unit and e2e)

```bash
npx nx test --watch
```

```bash
npx nx e2e workspace-e2e --watch
```

> Make sure that you do not have the workspace app running on port 4200 when running the e2e test.

## Development

### Building

Build the application

```bash
npm run build
```

> To run the compiled app you can use `npx http-serve dist/apps/workspace/`

### Linting

Format un-formatted code

```bash
npm run format
```

Runs the eslint linter

```bash
npm run lint
```
