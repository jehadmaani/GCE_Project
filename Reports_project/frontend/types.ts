import { z } from "zod";

export const LocationSchema = z.object({
  address: z.string(),
  lat: z.number(),
  lng: z.number(),
});

export const EventSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  importance: z.string(),
  type: z.string(),
  location: LocationSchema,
});

export const EventsSchema = z.array(EventSchema);

export type Location = z.infer<typeof LocationSchema>;
export type Event = z.infer<typeof EventSchema>;
