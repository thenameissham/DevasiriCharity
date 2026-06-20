import { Footer } from "@/components/layouts/footer";
import { Navbar } from "@/components/layouts/navbar";

interface PageWrapperProps {
  readonly children: React.ReactNode;
}

export function PageWrapper({ children }: PageWrapperProps) {
  return (
    <div className="min-h-screen overflow-hidden">
      <Navbar />
      {children}
      <Footer />
    </div>
  );
}