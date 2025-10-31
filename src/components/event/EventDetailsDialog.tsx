import { EventTicketExportExcel } from "@/components/event/EventTicketExportExcel";
import { SetEventWinnerForm } from "@/components/event/SetEventWinnerForm";
import { CreateTicketCountForm } from "@/components/ticket/CreateTicketCountForm";
import { CreateTicketForm } from "@/components/ticket/CreateTicketForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogProvider,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getEventEmbedCodeById } from "@/services/event.service";
import type { EventWithTicketCount } from "@/types/event";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CheckIcon, CopyIcon, CrownIcon, EyeIcon, TicketsPlaneIcon } from "lucide-react";
import { useState } from "react";

export function EventDetailsDialog({ event }: { event: EventWithTicketCount }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" size="sm">
          <EyeIcon className="text-muted-foreground" />
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="text-sm sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Event Details</DialogTitle>
          <DialogDescription>Details about the event</DialogDescription>
        </DialogHeader>
        <EventDetailsDialogContent event={event} />
      </DialogContent>
    </Dialog>
  );
}

function EventDetailsDialogContent({ event }: { event: EventWithTicketCount }) {
  const { data } = useSuspenseQuery({
    queryKey: ["event-embed", event.id],
    queryFn: () => getEventEmbedCodeById(event.id),
  });

  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="font-medium">Title</label>
        <p className="bg-muted rounded-md px-3 py-2">{event.title}</p>
      </div>
      <div className="flex flex-col gap-1">
        <label className="font-medium">Car Info</label>
        <p className="bg-muted rounded-md px-3 py-2">{event.car_info}</p>
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-medium">Embed Code</label>
        <pre className="bg-muted relative h-40 overflow-auto rounded-md px-3 py-2 font-mono text-wrap">
          {data.data.html}
          <CopyTextButton text={data.data.html} />
        </pre>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <EventTicketExportExcel eventId={event.id} />
        <DialogProvider>
          <DialogTrigger>
            <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600">
              <TicketsPlaneIcon className="" />
              Create Ticket
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Ticket</DialogTitle>
              <DialogDescription>
                Create tickets by providing the buyer information.
              </DialogDescription>
            </DialogHeader>
            <CreateTicketForm event_id={event.id} />
          </DialogContent>
        </DialogProvider>
        <DialogProvider>
          <DialogTrigger>
            <Button size="sm" className="bg-sky-500 hover:bg-sky-600">
              <TicketsPlaneIcon />
              Create Ticket By Count
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Ticket By Count</DialogTitle>
              <DialogDescription>
                Create tickets by specifying the number of tickets to generate.
              </DialogDescription>
            </DialogHeader>
            <CreateTicketCountForm event_id={event.id} />
          </DialogContent>
        </DialogProvider>
        <DialogProvider>
          <DialogTrigger>
            <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600">
              <CrownIcon />
              Set Winner
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Set Winner</DialogTitle>
              <DialogDescription>Specify the winner for the event.</DialogDescription>
            </DialogHeader>
            <SetEventWinnerForm event_id={event.id} />
          </DialogContent>
        </DialogProvider>
      </div>
    </>
  );
}

function CopyTextButton({ text }: { text: string }) {
  const [isCopied, setIsCopied] = useState(false);
  // The text you want to copy

  const handleCopy = async () => {
    try {
      // 1. Use the Clipboard API to write the text
      await navigator.clipboard.writeText(text);

      // 2. Update state to provide user feedback
      setIsCopied(true);

      // 3. Reset the feedback message after 2 seconds
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
      // Optional: Add a fallback for older browsers here
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant="outline"
      size="icon-sm"
      className="absolute top-2 right-2">
      {isCopied ? <CheckIcon /> : <CopyIcon />}
    </Button>
  );
}
