"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Button,
  Box,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PageviewIcon from "@mui/icons-material/Pageview";
import ConfirmDialog from "./ConfirmDialog";

import { useRouter } from "next/navigation";

export default function InvoiceTable() {
  const router = useRouter();
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [sorted, setSorted] = useState(false);

  const [dates, setDates] = useState({
    fromDate: new Date().toISOString().split("T")[0],
    toDate: new Date().toISOString().split("T")[0],
  });

  const handleDateChange = (e) => {
    setDates({ ...dates, [e.target.name]: e.target.value });
    console.log(dates);
  };

  useEffect(() => {
    fetch("/api/invoices")
      .then((res) => res.json())
      .then((data) => setInvoices(data))
      .finally(() => setLoading(false));
  }, []);

  const handleSort = (head) => {
    let newInvoices = [...invoices];
    if (head === "id") {
      if (!sorted) {
        newInvoices.sort((a, b) => b.id.localeCompare(a.id));
      } else {
        newInvoices.sort((a, b) => a.id.localeCompare(b.id));
      }
    } else if (head === "name") {
      if (!sorted) {
        newInvoices.sort((a, b) =>
          b.customerName.localeCompare(a.customerName)
        );
      } else {
        newInvoices.sort((a, b) =>
          a.customerName.localeCompare(b.customerName)
        );
      }
    } else if (head === "total") {
      if (!sorted) {
        newInvoices.sort((a, b) => b.totalAmount - a.totalAmount);
      } else {
        newInvoices.sort((a, b) => a.totalAmount - b.totalAmount);
      }
    } else if (head === "inv_date") {
      if (!sorted) {
        newInvoices.sort((a, b) => b.invoiceDate.localeCompare(a.invoiceDate));
      } else {
        newInvoices.sort((a, b) => a.invoiceDate.localeCompare(b.invoiceDate));
      }
    } else if (head === "due_date") {
      if (!sorted) {
        newInvoices.sort((a, b) => b.dueDate.localeCompare(a.dueDate));
      } else {
        newInvoices.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
      }
    }
    setSorted((sorted) => !sorted);
    setInvoices(newInvoices);
  };

  const handleAdd = () => {
    let sortedInv = [...invoices].sort((a, b) => a.id.localeCompare(b.id));
    let latestId = sortedInv[sortedInv.length - 1].id;
    let lastDigits = parseInt(latestId.slice(-3));
    let nextId = String(lastDigits + 1).padStart(3, "0");
    let nextIdFull = latestId.slice(0, -3) + nextId;
    router.push(`add/${nextIdFull}`);
  };

  const handleEdit = (id) => {
    router.push(`edit/${id}`);
  };

  const handleClickDelete = (id) => {
    setSelectedId(id);
    setOpenConfirm(true);
  };

  const handleConfirmDelete = () => {
    handleDelete(selectedId);
    setOpenConfirm(false);
    setSelectedId(null);
  };

  const handleCancel = () => {
    setOpenConfirm(false);
    setSelectedId(null);
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

  const handleView = (id) => {
    router.push(`view/${id}`);
  };

  if (loading) {
    return <div>Loading....</div>;
  } else
    return (
      <>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleSort("id")}
                >
                  ID
                </TableCell>
                <TableCell
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleSort("name")}
                >
                  Customer Name
                </TableCell>
                <TableCell
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleSort("inv_date")}
                >
                  Invoice Date
                </TableCell>
                <TableCell
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleSort("due_date")}
                >
                  Due Date
                </TableCell>
                <TableCell
                  sx={{ cursor: "pointer" }}
                  onClick={() => handleSort("total")}
                >
                  Total
                </TableCell>
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
                    <Button onClick={() => handleView(i.id)}>
                      <a>
                        <PageviewIcon />
                      </a>
                    </Button>
                    <Button onClick={() => handleEdit(i.id)}>
                      <a>
                        <EditIcon />
                      </a>
                    </Button>

                    <Button onClick={() => handleClickDelete(i.id)}>
                      <a>
                        <DeleteIcon />
                      </a>
                    </Button>
                    <ConfirmDialog
                      open={openConfirm}
                      onClose={handleCancel}
                      onConfirm={handleConfirmDelete}
                      dialogTitle="Confirm Delete"
                      dialogText="Are you sure you want to delete this item?"
                    />
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
          <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Button variant="contained" onClick={() => handleAdd()}>
              Add New
            </Button>

            <TextField
              name="fromDate"
              label="From Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dates.fromDate}
              onChange={(e) => handleDateChange(e)}
            />
            <TextField
              name="toDate"
              label="To Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={dates.toDate}
              onChange={(e) => handleDateChange(e)}
            />
            <Button
              variant="contained"
              onClick={() => {
                const from = dates.fromDate;
                const to = dates.toDate;
                const url = `/summary?from=${encodeURIComponent(
                  from
                )}&to=${encodeURIComponent(to)}`;
                router.push(url);
              }}
            >
              Summary
            </Button>
          </Box>
        </Box>
      </>
    );
}
