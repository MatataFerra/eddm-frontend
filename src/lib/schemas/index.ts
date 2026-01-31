import { z } from "zod";

export const BaseArticleSchema = z.object({
  id: z.number().optional(),
  documentId: z.uuid().optional(),
  notionPageId: z.uuid().optional(),
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().optional(),
  content: z.string().optional(),
  slug: z
    .string()
    .min(1, "El slug es obligatorio")
    .regex(/^[a-z0-9-]+$/, "El slug debe contener solo letras minúsculas, números y guiones"),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  publishedAt: z.date().nullable().optional(),
  published: z.boolean().default(false),
  summary: z.string().optional(),
  order: z.number().optional().default(0),
  authorId: z.number(),
  categoryId: z.number(),
  headerId: z.number().nullable().optional(),
  coverId: z.number().nullable().optional(),
});

const GeolocationMetadataSchema = z.object({
  id: z.number().optional(),
  country: z.string().optional(),
  region: z.string().optional(),
  city: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  imgUrl: z.string().optional(),
  mapImageUrl: z.string().optional(),
  url: z.string().optional(),
});

const GeolocationSchema = {
  geolocation: z.object({
    id: z.number().nullable(),
    location: z.string(),
    metadata: GeolocationMetadataSchema.optional(),
  }),
};

export const RelationWithBaseArticleSchema = z.object({
  media: z.array(
    z.object({
      id: z.number(),
      type: z.string(),
      url: z.string(),
    }),
  ),
  header: z
    .object({
      id: z.number(),
      type: z.string(),
      url: z.string(),
    })
    .optional(),
  cover: z
    .object({
      id: z.number(),
      type: z.string(),
      url: z.string(),
    })
    .nullable()
    .optional(),
  category: z.object({
    id: z.number(),
    name: z.string(),
  }),
  author: z.object({
    id: z.number(),
    name: z.string(),
    bio: z.string().nullable(),
  }),
  geolocations: z.array(z.object(GeolocationSchema)).nullable(),
});

export const ExtendedArticleSchema = BaseArticleSchema.extend(RelationWithBaseArticleSchema.shape);

export type GeolocationWithMetadata = z.infer<typeof GeolocationSchema.geolocation>;
