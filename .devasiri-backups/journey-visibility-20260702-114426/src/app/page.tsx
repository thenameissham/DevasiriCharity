import { PremiumHomePage } from "@/components/landing/premium-home-page";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function HomePage() {
  return <PremiumHomePage />;
}
