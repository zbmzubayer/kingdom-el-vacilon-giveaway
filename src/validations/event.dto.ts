import { EVENT_STATUS } from "@/enums/event.enum";
import { z } from "zod";

export const eventDto = z.object({
  title: z.string().min(1, "Required"),
  car_info: z.string().optional(),
  tickets_total: z.number().int().positive(),
  ticket_price_cents: z.number().int().positive().default(1000),
  status: z.enum(EVENT_STATUS).default(EVENT_STATUS.open),
});

export type EventDto = z.infer<typeof eventDto>;
