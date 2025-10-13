import { z } from "zod";

export const loginDto = z.object({
  password: z.string().min(1, "Required").min(6).max(100),
});

export type LoginDto = z.infer<typeof loginDto>;
