"use client";

import { SheetIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { exportToExcel } from "@/lib/excel";
import type { Ticket } from "@/types/ticket";
import { toast } from "sonner";

export function EventTicketExportExcel({ tickets }: { tickets: Ticket[] }) {
  console.log(tickets);
  const handleExport = () => {
    if (tickets.length === 0) {
      toast.error("No tickets to export");
      return;
    }
    const ticketData = tickets.map((ticket) => ({
      "Buyer Email": ticket.buyer_email,
      "Buyer Name": ticket.buyer_name,
      "Serial Number": ticket.serial_number,
    }));
    exportToExcel(ticketData, "TicketsList");
  };

  return (
    <Button onClick={handleExport} size="sm" variant="outline">
      <SheetIcon />
      Export to Excel
    </Button>
  );
}
