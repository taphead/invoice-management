import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const invoices = sqliteTable("invoices", {
  id: text("id").primaryKey(),
  customerName: text("customer_name").notNull(),
  invoiceDate: text("invoice_date").notNull(),
  dueDate: text("due_date").notNull(),
  totalAmount: integer("total_amount").notNull(),
});

export const invoiceItems = sqliteTable("invoice_items", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  invoiceId: text("invoice_id")
    .notNull()
    .references(() => invoices.id),
  itemName: text("item_name").notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: integer("unit_price").notNull(),
});
