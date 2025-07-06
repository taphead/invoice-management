"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Skeleton,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PageviewIcon from "@mui/icons-material/Pageview";

import { useRouter } from "next/navigation";

export default function InvoiceTable() {
  const router = useRouter();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/invoices")
      .then((res) => res.json())
      .then((data) => setInvoices(data))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (id) => {
    router.push(`edit/${id}`);
  };
  if (!invoices.length) {
    return <div>Loading....</div>;
  } else
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Customer Name</TableCell>
              <TableCell>Invoice Date</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((i) => (
              <TableRow key={i.id}>
                <TableCell>{i.id}</TableCell>
                <TableCell>{i.customerName}</TableCell>
                <TableCell>{i.invoiceDate}</TableCell>
                <TableCell>{i.dueDate}</TableCell>
                <TableCell>${i.totalAmount}</TableCell>
                <TableCell>
                  <Button>
                    <a>
                      <PageviewIcon />
                    </a>
                  </Button>
                  <Button onClick={() => handleEdit(i.id)}>
                    <a>
                      <EditIcon />
                    </a>
                  </Button>

                  <Button onClick={() => handleEdit(i.id)}>
                    <a>
                      <DeleteIcon />
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}
