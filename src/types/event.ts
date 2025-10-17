export type Event = {
  id: string;
  title: string;
  car_info: string | null;
  tickets_total: number;
  ticket_price_cents: number;
  status: string;
  winner_ticket_id: string | null;
  created_at: Date;
  updated_at: Date;
};

export type EventWithTicketCount = Event & {
  _count: {
    tickets: number;
  };
};
