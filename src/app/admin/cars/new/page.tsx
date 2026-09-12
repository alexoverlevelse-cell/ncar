"use client";

import { CarForm } from "@/components/CarForm";
import { PageHeader } from "@/components/PageHeader";
import { AdminOnly } from "@/components/AdminOnly";

export default function NewCarPage() {
  return (
    <AdminOnly>
      <main className="flex flex-1 flex-col">
        <PageHeader title="Нове авто" />
        <div className="px-5 pb-8">
          <CarForm />
        </div>
      </main>
    </AdminOnly>
  );
}
