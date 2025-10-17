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
import { Spinner } from "@/components/ui/spinner";
import { useDialog } from "@/components/ui/dialog";
import { setEventWinnerDto, type SetEventWinnerDto } from "@/validations/event.dto";
import { setEventWinner } from "@/services/event.service";

export function SetEventWinnerForm({ event_id }: { event_id: string }) {
  const { setOpen } = useDialog();
  const queryClient = useQueryClient();

  const form = useForm({
    resolver: zodResolver(setEventWinnerDto),
    defaultValues: {
      performed_by: "Admin",
    },
  });

  const { mutateAsync } = useMutation({
    mutationFn: setEventWinner,
    onSuccess: () => {
      toast.success("Event winner set successfully");
      queryClient.invalidateQueries({ queryKey: ["events"] });
      setOpen(false);
    },
    onError: (error) => {
      console.log(error);
      toast.error("Failed to set event winner", {
        description: error.message || "Something went wrong",
      });
    },
  });

  const onSubmit = async (values: SetEventWinnerDto) => {
    values.performed_by = values.performed_by || "Admin";
    await mutateAsync({ event_id, data: values });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="serial_number"
          render={({ field: { onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Serial Number</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter the serial number of the winning ticket"
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
          name="performed_by"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Performed By</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter the name of the person who performed the action"
                  {...field}
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
