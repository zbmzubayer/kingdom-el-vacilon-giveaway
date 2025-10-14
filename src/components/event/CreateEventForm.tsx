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
import { EVENT_STATUS } from "@/enums/event.enum";
import { createEvent } from "@/services/event.service";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Spinner } from "@/components/ui/spinner";

export default function CreateEventForm({ onClose }: { onClose: () => void }) {
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(eventDto),
    defaultValues: {
      title: "",
      car_info: "",
      ticket_price_cents: 10,
      status: EVENT_STATUS.open,
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      toast.success("Event created successfully");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      onClose();
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to create event", {
        description: error.message || "Something went wrong",
      });
    },
  });

  const onSubmit = async (values: EventDto) => {
    values.ticket_price_cents *= 100;
    await mutateAsync(values);
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
                <Input placeholder="Enter the event title" {...field} />
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
                <Textarea
                  placeholder="Give car information..."
                  className="resize-none"
                  {...field}
                />
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
                  placeholder="Enter the ticket price in USD (e.g., 10)"
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
                  placeholder="Enter the number of total tickets"
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
                <Select defaultValue={EVENT_STATUS.open} onValueChange={field.onChange}>
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
            Create Event
          </Button>
        </div>
      </form>
    </Form>
  );
}
