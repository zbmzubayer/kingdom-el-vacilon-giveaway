import { EventTicketExportExcel } from "@/components/event/EventTicketExportExcel";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getEventEmbedCodeById } from "@/services/event.service";
import type { EventWithTickets } from "@/types/event";
import { useSuspenseQuery } from "@tanstack/react-query";
import { CheckIcon, CopyIcon, EyeIcon } from "lucide-react";
import { useState } from "react";

export function EventDetailsDialog({ event }: { event: EventWithTickets }) {
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

function EventDetailsDialogContent({ event }: { event: EventWithTickets }) {
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
        <pre className="bg-muted relative rounded-md px-3 py-2 font-mono text-wrap">
          {data.data.html}
          <CopyTextButton text={data.data.html} />
        </pre>
      </div>

      <div className="mt-5">
        <EventTicketExportExcel tickets={event.tickets} />
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
