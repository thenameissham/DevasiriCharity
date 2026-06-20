import { CalendarDays, ClipboardList, HeartHandshake, UserRound } from "lucide-react";
import { DashboardEmptyState } from "@/components/dashboard/dashboard-empty-state";
import { DashboardPanel } from "@/components/dashboard/dashboard-panel";
import { DashboardStatCard } from "@/components/dashboard/dashboard-stat-card";
import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { requireRole } from "@/lib/auth/require-role";
import { prisma } from "@/lib/prisma";

export default async function VolunteerDashboardPage() {
  const session = await requireRole(["VOLUNTEER", "ADMIN"]);

  const volunteer = await prisma.volunteer.findFirst({
    where: {
      email: session.user.email ?? ""
    },
    include: {
      events: {
        include: {
          event: true
        },
        take: 5
      }
    }
  });

  return (
    <DashboardShell
      role="VOLUNTEER"
      title="Volunteer Workspace"
      description="Manage event participation, assignments, student support activities, and volunteer profile readiness."
      userName={session.user.name ?? session.user.email ?? "Volunteer"}
    >
      <div className="grid gap-5 md:grid-cols-3">
        <DashboardStatCard
          title="Profile Status"
          value={volunteer?.status ?? "Pending"}
          description="Current volunteer profile approval state."
          icon={UserRound}
          tone="blue"
        />
        <DashboardStatCard
          title="Assignments"
          value={String(volunteer?.events.length ?? 0)}
          description="Events or support activities assigned to you."
          icon={ClipboardList}
          tone="amber"
        />
        <DashboardStatCard
          title="Impact Area"
          value="Education"
          description="Primary program area for volunteer contribution."
          icon={HeartHandshake}
          tone="emerald"
        />
      </div>

      <div className="mt-6">
        <DashboardPanel
          title="Upcoming Assignments"
          description="Volunteer events and responsibilities will appear here."
        >
          {volunteer && volunteer.events.length > 0 ? (
            <div className="grid gap-3">
              {volunteer.events.map((assignment) => (
                <article
                  key={assignment.id}
                  className="rounded-[22px] border border-slate-200 bg-slate-50 p-4"
                >
                  <h3 className="font-bold tracking-[-0.03em] text-slate-950">
                    {assignment.event.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-600">
                    {assignment.assignedRole ?? "Volunteer"} •{" "}
                    {assignment.event.status}
                  </p>
                </article>
              ))}
            </div>
          ) : (
            <DashboardEmptyState
              title="No assignments yet"
              description="Volunteer assignments and event registrations will appear once assigned."
              icon={CalendarDays}
            />
          )}
        </DashboardPanel>
      </div>
    </DashboardShell>
  );
}