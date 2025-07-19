"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
} from "@mui/material";

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
      <>
        <Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.5rem",
            }}
          >
            <Box>{`Name: ` + invoice.customerName}</Box>
            <Box>{`Invoice Date: ` + invoice.invoiceDate}</Box>
            <Box>{`Due Date: ` + invoice.dueDate}</Box>
          </Box>

          <TableContainer component={Paper} sx={{ mt: 2 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">Item</TableCell>
                  <TableCell align="center">Quantity</TableCell>
                  <TableCell align="center">Unit Price</TableCell>
                  <TableCell align="center">Total Price</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoice.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{item.itemName}</TableCell>
                    <TableCell align="center"> {item.quantity}</TableCell>
                    <TableCell align="center">${item.unitPrice}</TableCell>
                    <TableCell align="center">
                      ${item.quantity * item.unitPrice}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </>
    );
}
