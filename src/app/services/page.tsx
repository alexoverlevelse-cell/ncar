import Link from "next/link";

export default function ServicesPage() {
  return (
    <main className="flex-1 px-4 py-6 max-w-md mx-auto w-full">
      <Link href="/" className="text-sm text-neutral-500">
        ← На главную
      </Link>
      <h1 className="text-2xl font-semibold mt-2 mb-4">Услуги</h1>
      <p className="text-neutral-500">Раздел в разработке.</p>
    </main>
  );
}
