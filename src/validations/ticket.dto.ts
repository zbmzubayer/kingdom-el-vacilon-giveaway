import { z } from "zod";

export const ticketDto = z.object({
  external_order_id: z.string().optional(),
  buyer_name: z.string().min(1, "Required"),
  buyer_email: z.email().optional(),
  quantity: z.number("Required").int().positive(),
});

export type TicketDto = z.infer<typeof ticketDto>;

export const ticketCountDto = z.object({
  count: z.number("Required").int().positive(),
});

export type TicketCountDto = z.infer<typeof ticketCountDto>;
