"use client";

import { AdminOnly } from "@/components/AdminOnly";
import { PageHeader } from "@/components/PageHeader";
import { ServiceForm } from "@/components/ServiceForm";

export default function NewServicePage() {
  return (
    <AdminOnly>
      <main className="flex flex-1 flex-col">
        <PageHeader title="Новая услуга" />
        <div className="px-5 pb-8">
          <ServiceForm />
        </div>
      </main>
    </AdminOnly>
  );
}
