import { CampaignForm } from "@/components/admin/campaign-form";
import { DashboardShell } from "@/components/layouts/dashboard-shell";
import { createCampaignAction } from "@/features/campaigns/campaign.actions";
import { requireRole } from "@/lib/auth/require-role";

interface NewCampaignPageProps {
  readonly searchParams: Promise<{
    error?: string;
  }>;
}

export default async function NewCampaignPage({
  searchParams
}: NewCampaignPageProps) {
  const session = await requireRole(["ADMIN"]);
  const params = await searchParams;

  return (
    <DashboardShell
      role="ADMIN"
      title="Create Campaign"
      description="Launch a new public campaign with clear goals, category, timeline, and transparent impact messaging."
      userName={session.user.name ?? session.user.email ?? "Admin"}
    >
      <CampaignForm
        mode="create"
        action={createCampaignAction}
        errorMessage={params.error ? decodeURIComponent(params.error) : undefined}
      />
    </DashboardShell>
  );
}