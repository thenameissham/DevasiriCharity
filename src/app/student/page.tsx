import { ArrowRight, BedDouble, FileText, GraduationCap, HeartHandshake, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";
import { DashboardPanel } from "@/components/dashboard/dashboard-panel";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { requireRole } from "@/lib/auth/require-role";
import { prisma } from "@/lib/prisma";

export default async function StudentDashboardPage() {
  const session = await requireRole(["STUDENT", "ADMIN"]);

  const student = await prisma.student.findFirst({
    where: {
      email: session.user.email ?? ""
    },
    include: {
      hostelRecords: true,
      successStories: true
    }
  });

  return (
    <DashboardShell
      role="STUDENT"
      title="Student Support Portal"
      description="Track application status, scholarship records, hostel support, and education assistance progress."
      userName={session.user.name ?? session.user.email ?? "Student"}
    >
      <div className="grid gap-5 md:grid-cols-3">
        <DashboardStatCard
          title="Application"
          value={student?.status ?? "Pending"}
          description="Current student assistance status."
          icon={FileText}
          tone="blue"
        />
        <DashboardStatCard
          title="Hostel Records"
          value={String(student?.hostelRecords.length ?? 0)}
          description="Hostel support entries linked to this student."
          icon={BedDouble}
          tone="amber"
        />
        <DashboardStatCard
          title="Support Track"
          value={student?.approvedSupport ? "Active" : "Review"}
          description="Scholarship or financial support progress."
          icon={GraduationCap}
          tone="emerald"
        />
      </div>

      <div className="mt-6">
        <DashboardPanel
          title="Useful next steps"
          description="Explore the support information and campaign details available through Devasiri."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            <Link
              href="/apply"
              className="group flex items-center gap-3 rounded-lg border border-[#d1d9e0] bg-white p-4 transition-colors hover:border-[#afb8c1] hover:bg-[#f6f8fa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f883d]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#ddf4ff] text-[#0969da]">
                <GraduationCap aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-[#1f2328]">Review support options</span>
                <span className="mt-1 block text-sm leading-5 text-[#59636e]">Read the current application guidance.</span>
              </span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[#59636e] transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/campaigns"
              className="group flex items-center gap-3 rounded-lg border border-[#d1d9e0] bg-white p-4 transition-colors hover:border-[#afb8c1] hover:bg-[#f6f8fa] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1f883d]"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-[#dafbe1] text-[#1a7f37]">
                <HeartHandshake aria-hidden="true" className="h-5 w-5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-semibold text-[#1f2328]">Browse campaigns</span>
                <span className="mt-1 block text-sm leading-5 text-[#59636e]">Explore education support initiatives.</span>
              </span>
              <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-[#59636e] transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </DashboardPanel>
      </div>

      <div className="mt-6">
        <DashboardPanel
          title="Support Summary"
          description="Your verified student assistance details."
        >
          {student ? (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-bold text-slate-500">
                  Requested Support
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-800">
                  {student.requestedSupport ?? "Not submitted yet"}
                </p>
              </div>

              <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
                <p className="text-sm font-bold text-slate-500">
                  Approved Support
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-800">
                  {student.approvedSupport ?? "Under review"}
                </p>
              </div>
            </div>
          ) : (
            <DashboardEmptyState
              title="Student profile not found"
              description="Your student support record will appear once an admin creates or verifies your profile."
              icon={ShieldCheck}
            />
          )}
        </DashboardPanel>
      </div>
    </DashboardShell>
  );
}