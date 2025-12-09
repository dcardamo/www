import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const photoProjects = defineCollection({
  loader: glob({
    pattern: "**/project.{md,yaml}",
    base: "./src/content/photos",
    generateId: ({ entry }) => {
      // Remove '/project.md' or '/project.yaml' from the path to get the project slug
      return entry.replace(/\/project\.(md|yaml)$/, "");
    },
  }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    date: z.coerce.date().optional(),
    featured: z.boolean().default(false),
    coverImage: z.string().optional(),
    exifDisplay: z.enum(["on", "off", "inherit"]).default("inherit"),
    exifFields: z.array(z.string()).optional(),
  }),
});

const blog = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/blog",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("Dan"),
    featured: z.boolean().default(false),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { photoProjects, blog };
