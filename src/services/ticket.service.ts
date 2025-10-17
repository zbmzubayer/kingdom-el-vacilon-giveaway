import { axiosInstance } from "@/lib/axios.config";
import type { TicketCountDto, TicketDto } from "@/validations/ticket.dto";

export const createTicket = async (data: TicketDto & { event_id: string }) => {
  return await axiosInstance.post("/ticket", data);
};

export const createTicketByCount = async (data: TicketCountDto & { event_id: string }) => {
  return await axiosInstance.post("/ticket/count", data);
};
