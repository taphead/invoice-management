import { invoices } from "../../../../lib/data";
import { NextResponse } from "next/server";

export async function DELETE(_, { params }) {
  const index = invoices.findIndex((i) => i.id === params.id);

  if (index === -1) {
    return new NextResponse("Not found", { status: 404 });
  }

  invoices.splice(index, 1);

  return NextResponse.json({ success: true });
}

export async function PUT(req, { params }) {
  const updated = await req.json();
  const index = invoices.findIndex((i) => i.id === params.id);
  if (index === -1) return new NextResponse("Not found", { status: 404 });

  invoices[index] = updated;
  return NextResponse.json({ success: true });
}

export async function GET(_, { params }) {
  const invoice = invoices.find((inv) => inv.id === params.id);

  if (!invoice) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.json(invoice);
}
