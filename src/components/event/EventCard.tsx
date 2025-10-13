import { EventDetailsDialog } from "@/components/event/EventDetailsDialog";
import UpdateEventForm from "@/components/event/UpdateEventForm";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import type { Event } from "@/types/event";
import { EditIcon } from "lucide-react";
import { useState } from "react";

export function EventCard({ event }: { event: Event }) {
  const [open, setOpen] = useState(false);
  return (
    <Card>
      <CardHeader>
        <CardTitle>{event.title}</CardTitle>
        <CardDescription>{event.car_info}</CardDescription>
        <CardAction>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="icon-sm">
                <EditIcon className="text-yellow-500" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create a new event</DialogTitle>
              </DialogHeader>
              <UpdateEventForm event={event} onClose={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-sm">ID: {event.id}</p>
      </CardContent>
      <CardFooter className="flex justify-end">
        <EventDetailsDialog event={event} />
      </CardFooter>
    </Card>
  );
}
