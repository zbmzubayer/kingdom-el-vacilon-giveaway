export type Ticket = {
  id: string;
  external_order_id: string | null;
  buyer_email: string | null;
  buyer_name: string | null;
  serial_number: number;
  created_at: Date;
  event_id: string;
};
