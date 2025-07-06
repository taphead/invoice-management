import { invoices } from "../../../lib/data";

export async function GET() {
  return Response.json(invoices);
}

export async function POST(req) {
  const newInvoice = await req.json();
  invoices.push(newInvoice);
  return Response.json({ success: true });
}

export async function PUT(req, { params }) {
  const updated = await req.json();
  const index = invoices.findIndex((i) => i.id === params.id);
  if (index === -1) return new Response("Not found", { status: 404 });

  invoices[index] = updated;
  return Response.json({ success: true });
}

export async function DELETE(_, { params }) {
  const index = invoices.findIndex((i) => i.id === params.id);
  if (index === -1) return new Response("Not found", { status: 404 });

  invoices.splice(index, 1);
  return Response.json({ success: true });
}
