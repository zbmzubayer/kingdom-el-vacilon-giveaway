import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { eventDto, type EventDto } from "@/validations/event.dto";
import { EVENT_STATUS, type EventStatus } from "@/enums/event.enum";
import { updateEventById } from "@/services/event.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";
import type { Event } from "@/types/event";

interface UpdateEventFormProps {
  event: Event;
  onClose: () => void;
}

export default function UpdateEventForm({ event, onClose }: UpdateEventFormProps) {
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(eventDto),
    defaultValues: {
      title: event.title,
      car_info: event.car_info || "",
      tickets_total: event.tickets_total,
      ticket_price_cents: event.ticket_price_cents / 100,
      status: event.status as EventStatus,
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: updateEventById,
    onSuccess: () => {
      toast.success("Event updated successfully");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      onClose();
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    },
  });

  const onSubmit = async (values: EventDto) => {
    console.log(values);
    values.ticket_price_cents *= 100;
    await mutateAsync({ id: event.id, data: values });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Event title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="car_info"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Car Information</FormLabel>
              <FormControl>
                <Textarea placeholder="Car information" className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ticket_price_cents"
          render={({ field: { onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Ticket Price</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ticket price"
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange(val === "" ? null : Number(val));
                  }}
                  {...fieldProps}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tickets_total"
          render={({ field: { onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Total Tickets</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Total tickets"
                  onChange={(e) => {
                    const val = e.target.value;
                    onChange(val === "" ? null : Number(val));
                  }}
                  {...fieldProps}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger className="w-full capitalize">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.values(EVENT_STATUS).map((status) => (
                      <SelectItem key={status} value={status} className="capitalize">
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Spinner />}
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
