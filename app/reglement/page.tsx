import RulesSection from "@/components/RulesSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Règlement",
  description: "Règlement officiel du serveur Central 6RP - Serveur FiveM RP + CVC français",
};

export default function ReglementPage() {
  return (
    <main className="min-h-screen pt-16">
      <RulesSection />
    </main>
  );
}
