import { Quote } from "lucide-react";
import { testimonials } from "@/data/home";

export function Testimonials() {
  return (
    <section className="px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 max-w-2xl">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            Community Voice
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.055em] text-slate-950">
            Trust grows when the work is visible.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.name}
              className="glass-card rounded-[28px] p-6"
            >
              <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-[18px] bg-slate-950 text-white">
                <Quote aria-hidden="true" className="h-5 w-5" />
              </div>

              <blockquote className="text-sm leading-6 text-slate-700">
                “{testimonial.quote}”
              </blockquote>

              <div className="mt-6 border-t border-slate-200 pt-5">
                <p className="text-sm font-bold text-slate-950">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-xs font-medium text-slate-500">
                  {testimonial.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}