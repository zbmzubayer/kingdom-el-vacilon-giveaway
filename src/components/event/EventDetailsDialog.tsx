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
import type { Event } from "@/types/event";
import { useSuspenseQuery } from "@tanstack/react-query";
import { EyeIcon } from "lucide-react";

export function EventDetailsDialog({ event }: { event: Event }) {
  const { data } = useSuspenseQuery({
    queryKey: ["events", event.id],
    queryFn: () => getEventEmbedCodeById(event.id),
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <EyeIcon />
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="text-sm sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>Details about the event</DialogDescription>
        </DialogHeader>
        <div>
          <label className="font-medium">Car Info</label>
          <p className="bg-muted rounded-md p-1">{event.car_info}</p>
        </div>

        <div>
          <label className="font-medium">Embed Code</label>
          <pre className="bg-muted rounded-md p-1 font-mono text-wrap">{data.data.html}</pre>
        </div>
      </DialogContent>
    </Dialog>
  );
}
