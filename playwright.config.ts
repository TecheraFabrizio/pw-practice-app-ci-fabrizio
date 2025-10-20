import { defineConfig, devices } from "@playwright/test";
import type { TestOptions } from "./test-options";
import * as dotenv from "dotenv";
import * as path from "path";
dotenv.config({ path: path.resolve(__dirname, ".env") });

export default defineConfig<TestOptions>({
  timeout: 60000,
  //globalTimeout: 60000,
  expect: {
    timeout: 4000,
  },
  retries: 1,
  reporter: [
    ["json", { outputFile: "test-results/jsonReport.json" }],
    ["junit", { outputFile: "test-results/junitReport.xml" }],
    ["html"],
  ],
  use: {
    globalsQaURL: "https://www.globalsqa.com/demo-site/draganddrop/",
    baseURL: process.env.DEV === "1" ? "http://localhost:4200/" : process.env.STAGING === "1" ? "http://localhost:4200/" : "http://localhost:4200/",

    trace: "on-first-retry",
    actionTimeout: 20000,
    navigationTimeout: 25000,
    video: {
      mode: "off",
      size: { width: 1920, height: 1080 },
    },
  },
  projects: [
    {
      name: "dev",
      use: { ...devices["Desktop Chrome"], baseURL: "http://localhost:4200/" },
    },
    {
      name: "chromium",
      timeout: 60000,
    },
    {
      name: "firefox",
      use: {
        browserName: "firefox",
        video: {
          mode: "on",
          size: { width: 1920, height: 1080 },
        },
      },
    },
    {
      name: "pageObjectFullScreen",
      testMatch: "usePageObjects.spec.ts",
      use: {
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: "mobile",
      testMatch: "testMobile.spec.ts",
      use: {
        ...devices["Pixel 5"],
      },
    },
  ],
  webServer : {
    command: "npm run start",
    url: "http://localhost:4200/"
  }
});
