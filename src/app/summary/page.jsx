"use client";
import {
  PDFViewer,
  Page,
  Text,
  View,
  Document,
  StyleSheet,
} from "@react-pdf/renderer";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontSize: 12,
  },
  heading: {
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subheading: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
  },
  tableHeader: {
    flexDirection: "row",
    borderBottom: "1px solid black",
    fontWeight: "bold",
    marginBottom: 5,
  },
  row: {
    flexDirection: "row",
    paddingVertical: 4,
  },
  cell: {
    flex: 1,
    padding: 8,
    // border: "1px solid black",
  },
  total: {
    textAlign: "right",
    marginTop: 20,
    fontWeight: "bold",
  },
});

export default function Summary() {
  const [loading, setLoading] = useState(true);
  const [invoices, setInvoices] = useState([]);
  const searchParams = useSearchParams();
  const from = searchParams.get("from");
  const to = searchParams.get("to");

  console.log(from);
  useEffect(() => {
    fetch("/api/invoices")
      .then((res) => res.json())
      .then((data) => {
        const filtered = data.filter((invoice) => {
          const invoiceDate = new Date(invoice.invoiceDate);
          return invoiceDate >= new Date(from) && invoiceDate <= new Date(to);
        });
        setInvoices(filtered);
      })
      .finally(() => setLoading(false));
  }, []);

  const total = invoices.reduce((sum, inv) => sum + inv.totalAmount, 0);

  if (loading) return <div>Loading...</div>;
  else
    return (
      <PDFViewer style={{ width: "100%", height: "100vh" }}>
        <Document>
          <Page style={styles.page}>
            <Text style={styles.heading}>Invoice Summary Report</Text>
            <Text style={styles.subheading}>
              Date Range: June 1, 2025 - June 30, 2025
            </Text>
            <View style={styles.tableHeader}>
              <Text style={styles.cell}>Invoice ID</Text>
              <Text style={styles.cell}>Customer Name</Text>
              <Text style={styles.cell}>Invoice Date</Text>
              <Text style={styles.cell}>Due Date</Text>
              <Text style={styles.cell}>Total Amount</Text>
            </View>
            {invoices.map((inv) => (
              <View style={styles.row} key={inv.id}>
                <Text style={styles.cell}>{inv.id}</Text>
                <Text style={styles.cell}>{inv.customerName}</Text>
                <Text style={styles.cell}>{inv.invoiceDate}</Text>
                <Text style={styles.cell}>{inv.dueDate}</Text>
                <Text style={styles.cell}>${inv.totalAmount}</Text>
              </View>
            ))}
            <Text style={styles.total}>Total Invoiced Amount: ${total}</Text>
          </Page>
        </Document>
      </PDFViewer>
    );
}
