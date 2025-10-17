import { EventDetailsDialog } from "@/components/event/EventDetailsDialog";
import UpdateEventForm from "@/components/event/UpdateEventForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { EventWithTicketCount } from "@/types/event";
import { EditIcon } from "lucide-react";
import { useState } from "react";

export function EventCard({ event }: { event: EventWithTicketCount }) {
  const [open, setOpen] = useState(false);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardAction>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <EditIcon className="text-yellow-500" />
                Edit
              </Button>
            </DialogTrigger>
            <DialogContent onOpenAutoFocus={(e) => e.preventDefault()}>
              <DialogHeader>
                <DialogTitle>Edit Event</DialogTitle>
                <DialogDescription>Make changes to the event</DialogDescription>
              </DialogHeader>
              <UpdateEventForm event={event} onClose={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent className="space-y-1">
        <div className="flex items-center text-sm">
          <p className="w-32 font-medium">Ticket Price</p>
          <p className="tabular-nums">${event.ticket_price_cents / 100}</p>
        </div>
        <div className="flex items-center text-sm">
          <p className="w-32 font-medium">Total Tickets</p>
          <p className="tabular-nums">{event.tickets_total}</p>
        </div>
        <div className="flex items-center text-sm">
          <p className="w-32 font-medium">Ticket Sold</p>
          <p className="tabular-nums">{event._count.tickets}</p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between text-sm">
        <div className="flex items-center gap-2">
          <p>Status:</p>
          <Badge>{event.status}</Badge>
        </div>
        <EventDetailsDialog event={event} />
      </CardFooter>
    </Card>
  );
}
