import Link from "next/link";
import { FileText, GraduationCap, MapPin, ShieldCheck } from "lucide-react";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";
import { DashboardPanel } from "@/components/dashboard/dashboard-panel";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { requireRole } from "@/lib/auth/require-role";
import { prisma } from "@/lib/prisma";

function formatINRFromPaise(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value / 100);
}

export default async function AdminApplicationsPage() {
  const session = await requireRole(["ADMIN"]);

  const [applications, submittedCount, approvedCount, totalRequested] =
    await Promise.all([
      prisma.studentApplication.findMany({
        orderBy: {
          createdAt: "desc"
        },
        take: 50
      }),
      prisma.studentApplication.count({
        where: {
          status: "SUBMITTED"
        }
      }),
      prisma.studentApplication.count({
        where: {
          status: "APPROVED"
        }
      }),
      prisma.studentApplication.aggregate({
        _sum: {
          requestedAmountPaise: true
        }
      })
    ]);

  return (
    <DashboardShell
      role="ADMIN"
      title="Scholarship Applications"
      description="Review professional degree scholarship applications, documents, districts, and financial support requests."
      userName={session.user.name ?? session.user.email ?? "Admin"}
    >
      <div className="grid gap-5 md:grid-cols-3">
        <DashboardStatCard
          title="Submitted"
          value={String(submittedCount)}
          description="New applications waiting for review."
          icon={FileText}
          tone="blue"
        />
        <DashboardStatCard
          title="Approved"
          value={String(approvedCount)}
          description="Applications approved for support."
          icon={ShieldCheck}
          tone="emerald"
        />
        <DashboardStatCard
          title="Requested Value"
          value={formatINRFromPaise(totalRequested._sum.requestedAmountPaise ?? 0)}
          description="Total scholarship support requested."
          icon={GraduationCap}
          tone="amber"
        />
      </div>

      <div className="mt-6">
        <DashboardPanel
          title="Recent Applications"
          description="Latest student scholarship applications."
        >
          {applications.length > 0 ? (
            <div className="grid gap-4">
              {applications.map((application) => (
                <Link
                  key={application.id}
                  href={`/admin/applications/${application.id}`}
                  className="block rounded-[24px] border border-slate-200 bg-slate-50 p-5 transition hover:bg-white hover:shadow-sm"
                >
                  <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                    <div>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700 ring-1 ring-blue-100">
                          {application.status}
                        </span>
                        <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-slate-600 ring-1 ring-slate-200">
                          {application.applicationReference}
                        </span>
                      </div>

                      <h3 className="mt-4 text-xl font-black tracking-[-0.045em] text-slate-950">
                        {application.fullName}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {application.courseType} • {application.courseName} •{" "}
                        {application.collegeName}
                      </p>

                      <p className="mt-2 inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                        <MapPin className="h-4 w-4" />
                        {application.district}
                      </p>
                    </div>

                    <div className="text-left md:text-right">
                      <p className="text-sm font-bold text-slate-500">
                        Requested
                      </p>
                      <p className="mt-1 text-xl font-black tracking-[-0.04em] text-slate-950">
                        {formatINRFromPaise(application.requestedAmountPaise)}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <DashboardEmptyState
              title="No applications yet"
              description="Student scholarship applications submitted from /apply/start will appear here."
              icon={FileText}
            />
          )}
        </DashboardPanel>
      </div>
    </DashboardShell>
  );
}