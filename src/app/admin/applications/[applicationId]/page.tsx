import { notFound } from "next/navigation";
import { updateStudentApplicationStatusAction } from "@/features/student-applications/student-application.actions";
import { DashboardPanel } from "@/components/dashboard/dashboard-panel";
import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { Button } from "@/components/ui/button";
import { requireRole } from "@/lib/auth/require-role";
import { prisma } from "@/lib/prisma";

interface AdminApplicationDetailPageProps {
  readonly params: Promise<{
    applicationId: string;
  }>;
}

const statuses = [
  "SUBMITTED",
  "UNDER_REVIEW",
  "DOCUMENTS_PENDING",
  "VERIFIED",
  "APPROVED",
  "REJECTED",
  "FUNDED",
  "DISBURSED"
] as const;

function formatINRFromPaise(value: number | null | undefined): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format((value ?? 0) / 100);
}

function Row({
  label,
  value
}: {
  readonly label: string;
  readonly value: React.ReactNode;
}) {
  return (
    <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4">
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
        {label}
      </p>
      <div className="mt-2 text-sm font-semibold leading-6 text-slate-800">
        {value || "Not provided"}
      </div>
    </div>
  );
}

export default async function AdminApplicationDetailPage({
  params
}: AdminApplicationDetailPageProps) {
  const session = await requireRole(["ADMIN"]);
  const routeParams = await params;

  const application = await prisma.studentApplication.findUnique({
    where: {
      id: routeParams.applicationId
    }
  });

  if (!application) {
    notFound();
  }

  return (
    <DashboardShell
      role="ADMIN"
      title="Application Review"
      description="Review student details, academic proof links, financial need, and update application status."
      userName={session.user.name ?? session.user.email ?? "Admin"}
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_380px]">
        <div className="grid gap-6">
          <DashboardPanel
            title={`${application.fullName}`}
            description={application.applicationReference}
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Row label="Email" value={application.email} />
              <Row label="Phone" value={application.phone} />
              <Row label="District" value={application.district} />
              <Row label="Taluk" value={application.taluk} />
              <Row label="Course" value={`${application.courseType} - ${application.courseName}`} />
              <Row label="College" value={application.collegeName} />
              <Row label="University" value={application.university} />
              <Row label="Year / Semester" value={`${application.currentYear} ${application.currentSemester ?? ""}`} />
              <Row label="USN / Reg No" value={application.usn} />
              <Row label="Entrance" value={`${application.entranceExam ?? ""} ${application.entranceRank ?? ""}`} />
            </div>
          </DashboardPanel>

          <DashboardPanel title="Financial Need">
            <div className="grid gap-4 md:grid-cols-3">
              <Row label="Annual Fee" value={formatINRFromPaise(application.annualFeePaise)} />
              <Row label="Already Paid" value={formatINRFromPaise(application.paidAmountPaise)} />
              <Row label="Requested" value={formatINRFromPaise(application.requestedAmountPaise)} />
              <Row label="Family Income" value={formatINRFromPaise(application.familyIncomePaise)} />
              <Row label="Income Cert No" value={application.incomeCertificateNo} />
              <Row label="Aadhaar Last 4" value={application.aadhaarLast4} />
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <Row label="SSP" value={application.receivesSsp ? "Yes" : "No"} />
              <Row label="Vidyasiri" value={application.receivesVidyasiri ? "Yes" : "No"} />
              <Row label="Other Support" value={application.receivesOtherSupport ? "Yes" : "No"} />
            </div>

            <div className="mt-4">
              <Row label="Need Statement" value={application.needStatement} />
            </div>
          </DashboardPanel>

          <DashboardPanel title="Document Links">
            <div className="grid gap-4 md:grid-cols-2">
              <Row label="Admission Proof" value={application.admissionProofUrl} />
              <Row label="Fee Structure" value={application.feeStructureUrl} />
              <Row label="Income Certificate" value={application.incomeCertificateUrl} />
              <Row label="Marks Card" value={application.marksCardUrl} />
            </div>
          </DashboardPanel>
        </div>

        <aside>
          <DashboardPanel
            title="Update Status"
            description="Move the application through review workflow."
          >
            <form action={updateStudentApplicationStatusAction} className="grid gap-4">
              <input type="hidden" name="applicationId" value={application.id} />

              <label>
                <span className="text-sm font-bold text-slate-700">Status</span>
                <select
                  name="status"
                  defaultValue={application.status}
                  className="mt-2 h-12 w-full rounded-[18px] border border-slate-200 bg-white px-4 text-sm font-bold text-slate-950"
                >
                  {statuses.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                <span className="text-sm font-bold text-slate-700">Admin notes</span>
                <textarea
                  name="adminNotes"
                  rows={5}
                  defaultValue={application.adminNotes ?? ""}
                  className="mt-2 w-full rounded-[18px] border border-slate-200 bg-white px-4 py-3 text-sm font-semibold"
                />
              </label>

              <Button type="submit" className="w-full">
                Save Review Status
              </Button>
            </form>
          </DashboardPanel>
        </aside>
      </div>
    </DashboardShell>
  );
}