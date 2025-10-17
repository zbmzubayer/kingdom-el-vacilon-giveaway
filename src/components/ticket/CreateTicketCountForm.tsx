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
import { ticketCountDto, type TicketCountDto } from "@/validations/ticket.dto";
import { createTicketByCount } from "@/services/ticket.service";
import { Spinner } from "@/components/ui/spinner";
import { useDialog } from "@/components/ui/dialog";

export function CreateTicketCountForm({ event_id }: { event_id: string }) {
  const { setOpen } = useDialog();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(ticketCountDto),
    defaultValues: {},
  });

  const { mutateAsync } = useMutation({
    mutationFn: createTicketByCount,
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

  const onSubmit = async (values: TicketCountDto) => {
    await mutateAsync({ ...values, event_id });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="count"
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
