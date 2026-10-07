import { LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
};

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="group rounded-xl border border-gray-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500">{title}</p>

          <h2 className="mt-2 truncate text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {value}
          </h2>

          <p className="mt-2 text-xs font-medium text-gray-500 sm:text-sm">
            {change}
          </p>
        </div>

        <div className="shrink-0 rounded-xl bg-gray-100 p-3 transition group-hover:bg-gray-900">
          <Icon
            size={21}
            className="text-gray-700 transition group-hover:text-white"
          />
        </div>
      </div>
    </div>
  );
}
