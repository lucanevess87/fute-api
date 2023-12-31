/* eslint-disable no-unused-vars */
import { z } from 'zod';

const envSchema = z.object({
  SERVER_PORT: z.coerce.number(),
  NODE_ENV: z.enum(['development', 'production', 'test']),

  DATABASE_TYPE: z.string(),
  DATABASE_HOST: z.string(),
  DATABASE_PORT: z.coerce.number(),
  DATABASE_USER: z.string(),
  DATABASE_PASSWORD: z.string(),
  DATABASE_DB: z.string(),

  DATABASE_URL: z.string(),

  JWT_ACCESS_SECRET: z.string(),
  JWT_REFRESH_SECRET: z.string(),
});

const envValidation = envSchema.safeParse(process.env);

if (!envValidation.success) {
  console.error('Invalid environment variables', envValidation.error.format());

  throw new Error('Invalid environment variables');
}

declare global {
  namespace NodeJS {
    interface ProcessEnv
      extends Record<keyof z.infer<typeof envSchema>, string> {}
  }
}

export default envValidation.data;
