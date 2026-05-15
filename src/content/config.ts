import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    status:      z.enum(['WIP', 'Shipped', 'RIP', 'Soon', 'One day']),
    type:        z.enum(['Project', 'Job', 'Freelance Gig']),
    emoji:       z.string().optional(),
    dateRange:   z.string().optional(),
    tags:        z.array(z.string()).default([]),
    description: z.string().optional(),
    url:         z.string().url().optional(),     // live URL (deployed site)
    repo:        z.string().optional(),           // owner/repo  — drives GH stats
    repoUrl:     z.string().url().optional(),     // overrides if not on github
    employer:    z.string().optional(),
    image:       z.string().optional(),
    featured:    z.boolean().default(false),      // 2 max get promoted in gallery
    // Visual identity for the placeholder preview while the iframe is off
    previewBase:   z.string().optional(),         // hex bg
    previewAccent: z.string().optional(),         // hex accent
    previewMood:   z.enum([
      'editor','voice','map','graph','list','doc','cli','table','dashboard','reader','system','cms','default'
    ]).default('default'),
  }),
});

export const collections = { projects };
