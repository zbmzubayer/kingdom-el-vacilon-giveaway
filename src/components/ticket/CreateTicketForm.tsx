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
import { ticketDto, type TicketDto } from "@/validations/ticket.dto";
import { createTicket } from "@/services/ticket.service";
import { Spinner } from "@/components/ui/spinner";
import { useDialog } from "@/components/ui/dialog";

export function CreateTicketForm({ event_id }: { event_id: string }) {
  const { setOpen } = useDialog();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(ticketDto),
    defaultValues: {
      buyer_name: "",
      buyer_email: "",
      external_order_id: "",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: createTicket,
    onSuccess: () => {
      toast.success("Ticket created successfully");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setOpen(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to create ticket", {
        description: error.message || "Something went wrong",
      });
    },
  });

  const onSubmit = async (values: TicketDto) => {
    await mutateAsync({ ...values, event_id });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="buyer_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Buyer Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter the buyer name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="buyer_email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Buyer Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter the buyer email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="external_order_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>External Order ID</FormLabel>
              <FormControl>
                <Input placeholder="Enter the external order ID" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field: { onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter the quantity"
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
        <div className="flex justify-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting && <Spinner />}
            Create Ticket
          </Button>
        </div>
      </form>
    </Form>
  );
}
