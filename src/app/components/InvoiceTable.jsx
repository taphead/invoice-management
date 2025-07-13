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
  Box,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PageviewIcon from "@mui/icons-material/Pageview";

import { useRouter } from "next/navigation";

export default function InvoiceTable() {
  const router = useRouter();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetch("/api/invoices")
      .then((res) => res.json())
      .then((data) => setInvoices(data))
      .finally(() => setLoading(false));
  }, []);

  const handleEdit = (id) => {
    router.push(`edit/${id}`);
  };

  const handleDelete = (id) => {
    fetch(`/api/invoices/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete invoice");
        }
        return res.json();
      })
      .then(() => {
        console.log("Invoice deleted:", id);
        setInvoices((prev) => prev.filter((invoice) => invoice.id !== id));
      })
      .catch((err) => console.error("Failed to delete invoice:", err));
  };

  const handleAdd = () => {
    let latestId = invoices[invoices.length - 1].id;
    let lastDigits = parseInt(latestId.slice(-3));
    let nextId = String(lastDigits + 1).padStart(3, "0");
    let nextIdFull = latestId.slice(0, -3) + nextId;
    router.push(`add/${nextIdFull}`);
  };

  if (!invoices.length) {
    return <div>Loading....</div>;
  } else
    return (
      <>
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

                    <Button onClick={() => handleDelete(i.id)}>
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
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "20px",
          }}
        >
          <Button variant="contained" onClick={() => handleAdd()}>
            Add New
          </Button>
        </Box>
      </>
    );
}
