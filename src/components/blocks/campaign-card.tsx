import { ArrowUpRight, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/progress-bar";

interface CampaignCardProps {
  readonly title: string;
  readonly category: string;
  readonly description: string;
  readonly raised: number;
  readonly goal: number;
  readonly donors: number;
}

export function CampaignCard({
  title,
  category,
  description,
  raised,
  goal,
  donors
}: CampaignCardProps) {
  const progress = Math.round((raised / goal) * 100);

  return (
    <article className="glass-card group rounded-[28px] p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(15,23,42,0.14)]">
      <div className="flex items-start justify-between gap-4">
        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 ring-1 ring-blue-100">
          {category}
        </span>
        <ArrowUpRight className="h-5 w-5 text-slate-400 transition group-hover:text-blue-600" />
      </div>

      <h3 className="mt-5 text-xl font-bold tracking-[-0.04em] text-slate-950">
        {title}
      </h3>

      <p className="mt-3 min-h-16 text-sm leading-6 text-slate-600">
        {description}
      </p>

      <div className="mt-6">
        <ProgressBar
          label={`₹${raised.toLocaleString("en-IN")} raised`}
          value={progress}
          helperText={`Goal: ₹${goal.toLocaleString("en-IN")}`}
        />
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-600">
          <Users className="h-4 w-4" />
          {donors} donors
        </div>
        <Button href="#donate" size="sm">
          Support
        </Button>
      </div>
    </article>
  );
}