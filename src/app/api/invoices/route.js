import { invoices } from "../../../lib/data";

export async function GET() {
  return Response.json(invoices);
}

export async function POST(req) {
  const newInvoice = await req.json();
  invoices.push(newInvoice);
  return Response.json({ success: true });
}
