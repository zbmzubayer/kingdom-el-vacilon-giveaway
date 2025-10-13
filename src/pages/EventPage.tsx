import { Logout } from "@/components/auth/Logout";
import CreateEventForm from "@/components/event/CreateEventForm";
import { EventCard } from "@/components/event/EventCard";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { getAllEvents } from "@/services/event.service";
import { useSuspenseQuery } from "@tanstack/react-query";
import { PlusIcon } from "lucide-react";

export function EventPage() {
  const { data } = useSuspenseQuery({
    queryKey: ["events"],
    queryFn: getAllEvents,
  });
  const events = data?.data || [];
  console.log(events);

  return (
    <>
      <header className="flex h-16 items-center border-b">
        <nav className="container flex items-center justify-between">
          <h1 className="mb-4 text-xl font-bold">Car Giveaway Events</h1>
          <Logout />
        </nav>
      </header>
      <div className="container py-3">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <PlusIcon /> Create Event
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new event</DialogTitle>
            </DialogHeader>
            <CreateEventForm />
          </DialogContent>
        </Dialog>
        <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.length ? (
            events.map((event) => <EventCard key={event.id} event={event} />)
          ) : (
            <p className="text-muted-foreground text-center">No events found.</p>
          )}
        </div>
      </div>
    </>
  );
}
