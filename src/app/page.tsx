import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import ProfessionalHomeView from "@/components/home/ProfessionalHomeView";

export const metadata: Metadata = {
  title: "NTCPWC – National Technology Centre for Ports, Waterways and Coasts",
  description:
    "India's premier technology arm for ports, waterways and coastal development at IIT Madras Discovery Campus.",
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <ProfessionalHomeView />
      </main>
    </div>
  );
}
