import { axiosInstance } from "@/lib/axios.config";
import type { Event, EventWithTickets } from "@/types/event";
import type { EventDto } from "@/validations/event.dto";

export const createEvent = async (data: EventDto) => {
  return await axiosInstance.post("/event", data);
};

export const getAllEvents = async () => {
  return await axiosInstance.get<EventWithTickets[]>("/event");
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
