import React from "react";
import { Button } from "@/components/ui/button";
import { Language } from "@/translations";

interface LanguageToggleProps {
  lang: Language;
  setLang: (lang: Language) => void;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({ lang, setLang }) => {
  return (
    <div className="flex items-center gap-1 bg-muted/50 p-1 rounded-full">
      <Button
        variant={lang === "en" ? "default" : "ghost"}
        size="sm"
        className="rounded-full h-8 px-3 text-xs"
        onClick={() => setLang("en")}
      >
        EN
      </Button>
      <Button
        variant={lang === "am" ? "default" : "ghost"}
        size="sm"
        className="rounded-full h-8 px-3 text-xs"
        onClick={() => setLang("am")}
      >
        አማ
      </Button>
    </div>
  );
};