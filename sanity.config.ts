"use client";

import { codeInput } from "@sanity/code-input";
import { table } from "@sanity/table";
import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { apiVersion, dataset, projectId } from "./lib/sanity/env";
import { structure } from "./lib/sanity/structure";
import { schemaTypes } from "./schemas";

export default defineConfig({
  basePath: "/studio",
  projectId,
  dataset,

  schema: {
    types: schemaTypes,
  },
  plugins: [
    codeInput(),
    table(),
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
