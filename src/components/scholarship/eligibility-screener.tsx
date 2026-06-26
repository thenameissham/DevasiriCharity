"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, GraduationCap, Info, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const professionalCourses = [
  "B.E. / B.Tech",
  "MBBS",
  "BDS",
  "B.Pharm",
  "Pharm.D",
  "B.Sc Nursing",
  "LLB",
  "MBA",
  "MCA",
  "Other professional course"
] as const;

const districts = [
  "Bengaluru Urban",
  "Bengaluru Rural",
  "Mysuru",
  "Hubballi-Dharwad",
  "Belagavi",
  "Kalaburagi",
  "Dakshina Kannada",
  "Tumakuru",
  "Shivamogga",
  "Ballari",
  "Other Karnataka district"
] as const;

export function EligibilityScreener() {
  const [course, setCourse] = useState("");
  const [district, setDistrict] = useState("");
  const [hasAdmission, setHasAdmission] = useState("");
  const [hasFeeProof, setHasFeeProof] = useState("");
  const [needsSupport, setNeedsSupport] = useState("");

  const isReady = course && district && hasAdmission && hasFeeProof && needsSupport;

  const result = useMemo(() => {
    if (!isReady) return null;

    if (
      hasAdmission === "yes" &&
      hasFeeProof === "yes" &&
      needsSupport === "yes"
    ) {
      return "eligible";
    }

    return "review";
  }, [hasAdmission, hasFeeProof, isReady, needsSupport]);

  return (
    <section className="rounded-[36px] border border-slate-200 bg-white/84 p-6 shadow-[0_28px_90px_rgba(15,23,42,0.1)] backdrop-blur-xl">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[18px] bg-blue-50 text-blue-600">
          <GraduationCap aria-hidden="true" className="h-6 w-6" />
        </div>

        <div>
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-blue-600">
            Eligibility Screener
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-[-0.055em] text-slate-950">
            Check your scholarship readiness.
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            This quick check does not approve an application. It only helps
            students understand whether they have the minimum documents to apply.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-5">
        <label>
          <span className="text-sm font-bold text-slate-700">Course</span>
          <select
            value={course}
            onChange={(event) => setCourse(event.target.value)}
            className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Select professional course</option>
            {professionalCourses.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="text-sm font-bold text-slate-700">
            Karnataka district
          </span>
          <select
            value={district}
            onChange={(event) => setDistrict(event.target.value)}
            className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
          >
            <option value="">Select district</option>
            {districts.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <div className="grid gap-4 md:grid-cols-3">
          {[
            {
              label: "Do you have admission proof?",
              value: hasAdmission,
              setValue: setHasAdmission
            },
            {
              label: "Do you have fee structure/proof?",
              value: hasFeeProof,
              setValue: setHasFeeProof
            },
            {
              label: "Do you have an unmet fee gap?",
              value: needsSupport,
              setValue: setNeedsSupport
            }
          ].map((field) => (
            <label key={field.label}>
              <span className="text-sm font-bold text-slate-700">
                {field.label}
              </span>
              <select
                value={field.value}
                onChange={(event) => field.setValue(event.target.value)}
                className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950 shadow-sm outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              >
                <option value="">Select</option>
                <option value="yes">Yes</option>
                <option value="no">No / Not yet</option>
              </select>
            </label>
          ))}
        </div>

        {result ? (
          <div className="rounded-[24px] border border-emerald-200 bg-emerald-50 p-5">
            <div className="flex gap-3">
              {result === "eligible" ? (
                <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" />
              ) : (
                <Info className="h-6 w-6 shrink-0 text-amber-600" />
              )}

              <div>
                <h3 className="font-black text-slate-950">
                  {result === "eligible"
                    ? "You are ready to start the application."
                    : "You may still apply, but documents may be required."}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {result === "eligible"
                    ? "Keep your admission proof, fee structure, income proof, and scholarship benefit details ready before submitting the full form."
                    : "Collect admission proof, fee details, and financial need documents before submitting the final application."}
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button href="/apply/start" size="lg">
            Start Student Application
            <ShieldCheck className="h-5 w-5" />
          </Button>

          <Button href="/campaigns" variant="secondary" size="lg">
            View Support Campaigns
          </Button>
        </div>
      </div>
    </section>
  );
}