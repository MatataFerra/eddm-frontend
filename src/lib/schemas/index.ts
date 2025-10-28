import { z } from "zod";

export const articleSchema = z.object({
  id: z.number().optional(), // Autoincremental, opcional en la entrada
  documentId: z.string().uuid().optional(),
  notionPageId: z.string().uuid().optional(),
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
  authorId: z.number(), // ID del autor (requerido)
  categoryId: z.number(), // ID de la categoría (requerido)
  headerId: z.number().nullable().optional(), // ID del header (opcional)
  coverId: z.number().nullable().optional(), // ID del cover (opcional)
});

export const deleteSchema = articleSchema.pick({
  id: true,
});

const geolocationMetadataSchema = z.object({
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

const geolocationSchema = {
  geolocation: z.object({
    id: z.number().nullable(),
    location: z.string(),
    metadata: geolocationMetadataSchema.optional(),
  }),
};

export const relationSchema = z.object({
  media: z.array(
    z.object({
      id: z.number(),
      type: z.string(),
      url: z.string(),
    })
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
  geolocations: z.array(z.object(geolocationSchema)).nullable(),
});

export const statusSchema = articleSchema.pick({
  published: true,
  slug: true,
  id: true,
});

// Esquema para crear un artículo (sin campos generados automáticamente)
export const createArticleSchema = articleSchema
  .omit({
    id: true,
    documentId: true,
    createdAt: true,
    updatedAt: true,
    coverId: true,
    headerId: true,
  })
  .merge(
    relationSchema.extend({
      header: z
        .object({
          type: z.string(),
          url: z.string(),
        })
        .optional(), // Permite que no esté presente en la creación

      cover: z
        .object({
          type: z.string(),
          url: z.string(),
        })
        .optional(),

      geolocations: z.array(
        z.object({
          location: z.string(),
          id: z.number().nullable(),
          metadata: geolocationMetadataSchema.optional(),
        })
      ),
    })
  );

// Esquema para actualizar un artículo (todos los campos son opcionales)
export const updateArticleSchema = articleSchema.partial();

export const fullArticleSchema = articleSchema.merge(relationSchema);

// Zod Schemas
export const authorSchema = z.object({
  name: z.string().min(1, "Name is required"),
  bio: z.string().optional(),
  email: z.string().email("Invalid email"),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export type GeolocationWithMetadata = z.infer<typeof geolocationSchema.geolocation>;
