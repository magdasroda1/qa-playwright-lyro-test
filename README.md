# QA Engineer Recruitment test

## Overview

This project contains the QA Engineer recruitment test for Lyro AI using Playwright v1.57.0.

## Before you start

The test is based on Playwright v1.57.0. You can find the full playwright documentation [here](https://playwright.dev/docs/intro). To build the project you will need [Node.js](https://nodejs.org/en/download/) and [Yarn](https://yarnpkg.com/getting-started/install).
In the file `lyro.test.ts` are the initial steps of the test.

Before starting, create an `.env` file in the main directory and put shared values into it. Without this, you will not be able to log in to the test project.

## Setup

1. Clone this repository locally:
   git clone https://github.com/magdasroda1/qa-playwright-lyro-test.git
   cd qa-playwright-lyro-test
2. Install dependencies 
    yarn
    yarn playwright install 
3. Create an .env file in the project root and add shared credentials (do not push this file):
    LYRO_USER=
    LYRO_PASS=

### Commands

In the project directory, you can run:

#### `yarn`

Installs a package and any packages that it depends on.

#### `yarn playwright install`

Installs playwright browsers.

#### `yarn run test`

Launches test headless.

#### `yarn run dev`

Launches test non-headless with playwright inspector.

## Rules

- Please do not fork the repo, clone it and put it in your own github.
- When possible use selectors which resemble how users interacts with the page.
- Don't push the .env file to the repository.
- If you have any questions or need help please ask us.

## Part 1

Add two missing steps to the test case:

- Check the Lyro AI response for the question added in the Data Sources.
- In the LiveChat preview: dismiss the running chatbot, send a message, and confirm the Lyro AI response is correct.

## Part 2 (Optional)

Containerize the project using Docker (use the official Playwright image or a custom one). Please include instructions in the README on how to run tests from the Docker container. You can also add a pipeline to build the project and execute the tests.

Good luck!
