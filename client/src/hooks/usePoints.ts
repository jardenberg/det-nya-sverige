import { useMemo } from "react";
import { useLang } from "@/contexts/LanguageContext";
import { policyPoints } from "@/lib/points";
import { policyPointsEn } from "@/lib/points-en";

export function usePoints() {
  const { lang } = useLang();
  return useMemo(() => (lang === "sv" ? policyPoints : policyPointsEn), [lang]);
}
