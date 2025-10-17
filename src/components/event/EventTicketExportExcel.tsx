import { SheetIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getTicketsByEventId } from "@/services/event.service";
import { toast } from "sonner";
import { exportToExcel } from "@/lib/excel";

export function EventTicketExportExcel({ eventId }: { eventId: string }) {
  const { refetch } = useQuery({
    queryKey: ["tickets", eventId],
    queryFn: () => getTicketsByEventId(eventId),
    enabled: false,
  });

  const handleExport = async () => {
    const result = await refetch();

    if (!result.data?.data || result.data.data.length === 0) {
      toast.error("No tickets to export");
      return;
    }

    const ticketData = result.data.data.map((ticket) => ({
      "Buyer Email": ticket.buyer_email,
      "Buyer Name": ticket.buyer_name,
      "Serial Number": ticket.serial_number,
      "External Order ID": ticket.external_order_id || "N/A",
    }));

    exportToExcel(ticketData, "TicketsList");
  };

  return (
    <Button onClick={handleExport} size="sm" variant="outline">
      <SheetIcon className="text-muted-foreground" />
      Export to Excel
    </Button>
  );
}
