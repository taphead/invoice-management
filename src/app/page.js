import InvoiceTable from "./components/InvoiceTable";
import { Button, Box } from "@mui/material";

// let total = 0;

// for (let inv of invoices) {
//   total += inv.totalAmount;
// }

export default function Home() {
  return (
    <main>
      <InvoiceTable />
    </main>
  );
}
