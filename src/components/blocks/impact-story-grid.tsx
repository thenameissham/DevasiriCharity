"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { impactStories } from "@/data/home";

export function ImpactStoryGrid() {
  return (
    <section id="stories" className="px-6 py-20 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            Student Success Stories
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-slate-950">
            Every metric has a person behind it.
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {impactStories.map((story, index) => (
            <motion.article
              key={story.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="glass-card rounded-[28px] p-6"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-[18px] bg-slate-950 text-white">
                <GraduationCap aria-hidden="true" className="h-6 w-6" />
              </div>

              <h3 className="text-xl font-bold tracking-[-0.04em] text-slate-950">
                {story.title}
              </h3>

              <p className="mt-4 text-sm leading-6 text-slate-600">
                {story.content}
              </p>

              <p className="mt-6 rounded-[18px] bg-slate-50 px-4 py-3 text-sm font-bold text-blue-700 ring-1 ring-slate-200">
                {story.metric}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}