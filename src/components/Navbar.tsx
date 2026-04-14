import React from "react";
import { Search, Plus, Store } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "./LanguageToggle";
import { Language, translations } from "@/translations";

interface NavbarProps {
  lang: Language;
  setLang: (lang: Language) => void;
  onPostClick: () => void;
  search: string;
  setSearch: (val: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ lang, setLang, onPostClick, search, setSearch }) => {
  const t = translations[lang];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-primary-foreground shadow-lg">
            <Store className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight hidden sm:block">
            {t.appName}
          </span>
        </div>

        <div className="flex-1 max-w-md relative hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-10 h-10 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <LanguageToggle lang={lang} setLang={setLang} />
          <Button
            onClick={onPostClick}
            className="rounded-full shadow-md bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Plus className="w-4 h-4 mr-2" />
            <span className="hidden xs:inline">{t.postAd}</span>
          </Button>
        </div>
      </div>
      {/* Mobile Search */}
      <div className="sm:hidden px-4 pb-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-10 h-10 bg-muted/50 border-none focus-visible:ring-1 focus-visible:ring-primary"
            placeholder={t.searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </nav>
  );
};