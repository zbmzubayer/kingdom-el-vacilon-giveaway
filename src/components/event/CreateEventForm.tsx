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
import { useMutation } from "@tanstack/react-query";
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

export default function CreateEventForm() {
  const form = useForm({
    resolver: zodResolver(eventDto),
    defaultValues: {
      title: "",
      car_info: "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: createEvent,
    onSuccess: () => {
      toast.success("Event created successfully");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message || "Something went wrong");
    },
  });

  const onSubmit = async (values: EventDto) => {
    console.log(values);
    values.ticket_price_cents *= 100;
    await mutateAsync(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    const value = e.target.value;
                    if (value === "") onChange(undefined);
                    else onChange(Number.parseInt(value, 10));
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
                    const value = e.target.value;
                    if (value === "") onChange(undefined);
                    else onChange(Number.parseInt(value, 10));
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
                  <SelectTrigger className="w-full">
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
