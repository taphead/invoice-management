"use client";

import { React, useEffect, useState } from "react";
import {
  Box,
  TextField,
  Typography,
  Select,
  MenuItem,
  IconButton,
  Button,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";

import { useForm, useFieldArray, Controller } from "react-hook-form";
import { useParams } from "next/navigation";

const availableItems = [
  { label: "Website Design", value: "website_design" },
  { label: "Hosting", value: "hosting" },
  { label: "SEO Package", value: "seo_package" },
];

export default function EditFormPage() {
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const id = params.id;
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      invoiceDate: "",
      dueDate: "",
      items: [{ item: "", quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data) => {
    const newInvoice = {
      id: id,
      customerName: data.name,
      invoiceDate: "2025-07-03",
      dueDate: "2025-07-17",
      items: [{ itemName: "UI Design", quantity: 1, unitPrice: 400 }],
      totalAmount: 400,
    };

    fetch("/api/invoices", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newInvoice),
    })
      .then((res) => res.json())
      .then((res) => console.log("Invoice added:", res))
      .catch((err) => console.error("Failed to add invoice:", err));
  };

  // useEffect(() => {
  //   fetch("/api/invoices")
  //     .then((res) => res.json())
  //     .then((res) => console.log(res))
  //     .catch((err) => console.error(err))
  //     .finally(() => setLoading(false));
  // }, []);

  // useEffect(() => {
  // const newInvoice = {
  //   id: "INV-004",
  //   customerName: "New Client",
  //   invoiceDate: "2025-07-03",
  //   dueDate: "2025-07-17",
  //   items: [{ itemName: "UI Design", quantity: 1, unitPrice: 400 }],
  //   totalAmount: 400,
  // };

  // fetch("/api/invoices", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(newInvoice),
  // })
  //   .then((res) => res.json())
  //   .then((res) => console.log("Invoice added:", res))
  //   .catch((err) => console.error("Failed to add invoice:", err))
  //   .finally(() => setLoading(false));
  // }, []);

  if (!loading) return <p>Loading...</p>;
  else
    return (
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: "flex",
          flexDirection: "column",
          margin: "20px",
          width: "30%",
          gap: "1rem",
        }}
      >
        <TextField
          label="Name"
          variant="outlined"
          {...register("name", { required: "Name is required" })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />

        <TextField
          label="Invoice Date"
          type="date"
          {...register("invoiceDate", {
            required: "Invoice date is required",
          })}
          InputLabelProps={{ shrink: true }}
          error={!!errors.invoiceDate}
          helperText={errors.invoiceDate?.message}
        />
        <TextField
          label="Due Date"
          type="date"
          {...register("dueDate", {
            required: "Due date is required",
          })}
          InputLabelProps={{ shrink: true }}
          error={!!errors.dueDate}
          helperText={errors.dueDate?.message}
        />

        <Typography variant="h6" sx={{ mt: 1 }}>
          Items
        </Typography>

        {fields.map((field, index) => (
          <Box
            key={field.id}
            sx={{ display: "flex", gap: 2, alignItems: "center" }}
          >
            <Controller
              name={`items.${index}.item`}
              control={control}
              rules={{ required: "Item is required" }}
              render={({ field }) => (
                <Select {...field} fullWidth displayEmpty>
                  <MenuItem value="" disabled>
                    Select item
                  </MenuItem>
                  {availableItems.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.items?.[index]?.item && (
              <Typography color="error" fontSize={12}>
                {errors.items[index].item.message}
              </Typography>
            )}

            <TextField
              label="Qty"
              type="number"
              {...register(`items.${index}.quantity`, {
                required: "Qty is required",
                min: { value: 1, message: "Minimum 1" },
                valueAsNumber: true,
              })}
              error={!!errors.items?.[index]?.quantity}
              helperText={errors.items?.[index]?.quantity?.message}
              sx={{ width: 100 }}
            />

            <IconButton
              onClick={() => remove(index)}
              disabled={fields.length === 1}
              color="error"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}

        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          onClick={() => append({ item: "", quantity: 1 })}
          sx={{ alignSelf: "start" }}
        >
          Add Item
        </Button>

        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </Box>
    );
}
