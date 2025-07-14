"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";

export default function EditFormPage() {
  const [loading, setLoading] = useState(true);
  const [invoice, setInvoice] = useState({});
  const params = useParams();
  const id = params.id;

  useEffect(() => {
    fetch(`/api/invoices/${id}`)
      .then((res) => res.json())
      .then((res) => setInvoice(res))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  console.log(invoice);
  if (loading) return <div>Loading...</div>;
  else
    return (
      <Box>
        <Box>{`Name: ` + invoice.customerName}</Box>
        <Box>{`Invoice Date: ` + invoice.invoiceDate}</Box>
        <Box>{`Due Date: ` + invoice.dueDate}</Box>
        <Box>
          {invoice.items.map((item, index) => (
            <Box key={item.itemName}>
              <div>{`Item ${index + 1}: ` + item.itemName}</div>
              <div>{`Quantity: ` + item.quantity}</div>
              <div>{`Unit Price: $` + item.unitPrice}</div>
              <div>{`Total Price: $` + item.quantity * item.unitPrice}</div>
            </Box>
          ))}
        </Box>
      </Box>
    );
}
