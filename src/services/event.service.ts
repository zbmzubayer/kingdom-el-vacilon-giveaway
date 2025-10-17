import { axiosInstance } from "@/lib/axios.config";
import type { Event, EventWithTicketCount } from "@/types/event";
import type { Ticket } from "@/types/ticket";
import type { EventDto, SetEventWinnerDto } from "@/validations/event.dto";

export const createEvent = async (data: EventDto) => {
  return await axiosInstance.post("/event", data);
};

export const getAllEvents = async () => {
  return await axiosInstance.get<EventWithTicketCount[]>("/event");
};

export const getEventById = async (id: string) => {
  return await axiosInstance.get<Event>(`/event/${id}`);
};

export const updateEventById = async ({ id, data }: { id: string; data: EventDto }) => {
  return await axiosInstance.put(`/event/${id}`, data);
};

export const getEventEmbedCodeById = async (id: string) => {
  return await axiosInstance.get<{ html: string }>(`/event/${id}/embed`);
};

export const getTicketsByEventId = async (eventId: string) => {
  return await axiosInstance.get<Ticket[]>(`/event/${eventId}/tickets`);
};

export const setEventWinner = async ({
  event_id,
  data,
}: {
  event_id: string;
  data: SetEventWinnerDto;
}) => {
  return await axiosInstance.post(`/event/${event_id}/winner`, data);
};
