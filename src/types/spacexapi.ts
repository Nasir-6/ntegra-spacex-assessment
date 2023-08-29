import { z } from 'zod';

export const launchSchema = z.object({
  name: z.string(),
  success: z.boolean().nullable(),
  date_utc: z.string(),
  rocket: z.string(),
  launchpad: z.string(),
  details: z.string().nullable(),
  id: z.string(),
});

export const launchArrSchema = z.array(launchSchema);

export type Launch = z.infer<typeof launchSchema>;
