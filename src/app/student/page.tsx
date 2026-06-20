import { BedDouble, FileText, GraduationCap, ShieldCheck } from "lucide-react";
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