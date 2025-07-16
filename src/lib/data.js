export let invoices = [
  {
    id: "INV-001",
    customerName: "John Doe",
    invoiceDate: "2025-06-01",
    dueDate: "2025-06-15",
    items: [
      {
        itemName: "Website Design",
        quantity: 1,
        unitPrice: 500,
      },
      {
        itemName: "Hosting",
        quantity: 1,
        unitPrice: 100,
      },
    ],
    totalAmount: 600,
  },
  {
    id: "INV-002",
    customerName: "Acme Corp",
    invoiceDate: "2025-06-10",
    dueDate: "2025-06-25",
    items: [
      {
        itemName: "SEO Package",
        quantity: 1,
        unitPrice: 300,
      },
      {
        itemName: "Consultation",
        quantity: 2,
        unitPrice: 150,
      },
    ],
    totalAmount: 600,
  },
  {
    id: "INV-003",
    customerName: "Jane Smith",
    invoiceDate: "2025-06-15",
    dueDate: "2025-06-30",
    items: [
      {
        itemName: "Mobile App Development",
        quantity: 1,
        unitPrice: 1200,
      },
    ],
    totalAmount: 1200,
  },
];
