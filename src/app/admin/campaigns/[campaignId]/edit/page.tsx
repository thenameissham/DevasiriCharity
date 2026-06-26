import { notFound } from "next/navigation";
import { CampaignForm } from "@/components/admin/campaign-form";
import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { updateCampaignAction } from "@/features/campaigns/campaign.actions";
import { requireRole } from "@/lib/auth/require-role";
import { prisma } from "@/lib/prisma";

interface EditCampaignPageProps {
  readonly params: Promise<{
    campaignId: string;
  }>;
  readonly searchParams: Promise<{
    error?: string;
  }>;
}

export default async function EditCampaignPage({
  params,
  searchParams
}: EditCampaignPageProps) {
  const session = await requireRole(["ADMIN"]);
  const routeParams = await params;
  const query = await searchParams;

  const campaign = await prisma.campaign.findUnique({
    where: {
      id: routeParams.campaignId
    }
  });

  if (!campaign) {
    notFound();
  }

  return (
    <DashboardShell
      role="ADMIN"
      title="Edit Campaign"
      description="Update campaign content, goal, progress, timeline, and public visibility."
      userName={session.user.name ?? session.user.email ?? "Admin"}
    >
      <CampaignForm
        mode="edit"
        action={updateCampaignAction}
        defaultValues={campaign}
        errorMessage={query.error ? decodeURIComponent(query.error) : undefined}
      />
    </DashboardShell>
  );
}