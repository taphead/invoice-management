"use client";

import { useParams } from "next/navigation";

export default function EditFormPage() {
  const params = useParams();
  const id = params.id;

  return <div>{params.id}</div>;
}
