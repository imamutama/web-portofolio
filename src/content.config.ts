import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string().max(180),
    year: z.number(),
    company: z.string(),
    role: z.string(),
    stack: z.array(z.string()).default([]),
    cover: z.string().optional(),
    outcome: z.string().optional(),
    liveUrl: z.url().optional(),
    repoUrl: z.url().optional(),
    status: z.enum(['public', 'internal', 'concept']).default('public'),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    draft: z.boolean().default(false),
  }),
});

export const collections = { projects };
