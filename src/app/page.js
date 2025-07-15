"use client";

import React, { useState, useEffect } from "react";
import InvoiceTable from "./components/InvoiceTable";

export default function Home() {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return null;

  return (
    <main>
      <InvoiceTable />
    </main>
  );
}
