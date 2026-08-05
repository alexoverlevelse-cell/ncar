import { siteConfig } from "@/lib/site-config";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <span className="text-2xl font-semibold tracking-tight">
        {siteConfig.companyName}
      </span>
      <span className="h-4 w-5 -skew-x-[20deg] rounded-[2px] bg-accent" />
    </span>
  );
}
