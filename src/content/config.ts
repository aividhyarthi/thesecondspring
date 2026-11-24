import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    pubDate:     z.date(),
    updatedDate: z.date().optional(),
    author:      z.string().default('Journal Desk'),
    tags:        z.array(z.string()).default([]),
    readTime:    z.string().default('5 min read'),
    featured:    z.boolean().default(false),
    image:       z.string().optional(),
    imageAlt:    z.string().optional(),
  }),
});

const community = defineCollection({
  type: 'content',
  schema: z.object({
    question:     z.string(),
    askerName:    z.string(),
    askerAge:     z.number(),
    askerCity:    z.string(),
    category:     z.string(),
    answeredBy:   z.string(),
    replies:      z.array(z.object({
      name: z.string(),
      text: z.string(),
    })).default([]),
    relatedJournals: z.array(z.object({
      title: z.string(),
      href:  z.string(),
    })).default([]),
    tags:    z.array(z.string()).default([]),
    date:    z.date(),
  }),
});

const windBlog = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    pubDate:     z.date(),
    updatedDate: z.date().optional(),
    author:      z.string().default('Journal Desk'),
    tags:        z.array(z.string()).default([]),
    readTime:    z.string().default('5 min read'),
    featured:    z.boolean().default(false),
    image:       z.string().optional(),
    imageAlt:    z.string().optional(),
  }),
});

const longevityBlog = defineCollection({
  type: 'content',
  schema: z.object({
    title:       z.string(),
    description: z.string(),
    pubDate:     z.date(),
    updatedDate: z.date().optional(),
    author:      z.string().default('Journal Desk'),
    tags:        z.array(z.string()).default([]),
    readTime:    z.string().default('5 min read'),
    featured:    z.boolean().default(false),
    image:       z.string().optional(),
    imageAlt:    z.string().optional(),
  }),
});

const stories = defineCollection({
  type: 'data',
  schema: z.object({
    title:         z.string(),
    description:   z.string(),
    coverImage:    z.string(),
    coverImageAlt: z.string(),
    accent:        z.string().default('#1A1A1A'),
    pubDate:       z.coerce.date(),
    relatedHref:   z.string().optional(),
    relatedLabel:  z.string().optional(),
    slides: z.array(z.object({
      eyebrow:  z.string().optional(),
      headline: z.string(),
      body:     z.string().optional(),
      image:    z.string().optional(),
      imageAlt: z.string().optional(),
      bg:       z.string().optional(),
    })).min(3),
  }),
});

export const collections = {
  blog,
  community,
  'wind-blog': windBlog,
  'longevity-blog': longevityBlog,
  stories,
};
