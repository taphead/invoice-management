import { db } from "./db";
import { invoices, invoiceItems } from "./schema";

async function seed() {
  await db.insert(invoices).values({
    id: "INV-001",
    customerName: "John Doe",
    invoiceDate: "2025-06-01",
    dueDate: "2025-06-15",
    totalAmount: 600,
  });

  await db.insert(invoiceItems).values([
    {
      invoiceId: "INV-001",
      itemName: "Website Design",
      quantity: 1,
      unitPrice: 500,
    },
    {
      invoiceId: "INV-001",
      itemName: "Hosting (1 year)",
      quantity: 1,
      unitPrice: 100,
    },
  ]);

  console.log("✅ Seeded SQLite DB");
}

seed();
