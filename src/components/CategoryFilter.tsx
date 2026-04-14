import React from "react";
import {
  Home,
  Car,
  Smartphone,
  LayoutGrid,
  Wrench,
  Armchair,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Language, translations } from "@/translations";

interface CategoryFilterProps {
  lang: Language;
  selected: string;
  onSelect: (cat: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({ lang, selected, onSelect }) => {
  const t = translations[lang];

  const categories = [
    { id: "all", label: t.all, icon: LayoutGrid },
    { id: "realEstate", label: t.realEstate, icon: Home },
    { id: "automotive", label: t.automotive, icon: Car },
    { id: "electronics", label: t.electronics, icon: Smartphone },
    { id: "furniture", label: t.furniture, icon: Armchair },
    { id: "services", label: t.services, icon: Wrench },
  ];

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 pt-2 no-scrollbar scroll-smooth">
      {categories.map((cat) => (
        <Button
          key={cat.id}
          variant={selected === cat.id ? "default" : "secondary"}
          size="sm"
          className="rounded-full shrink-0 whitespace-nowrap px-4 py-2 h-auto"
          onClick={() => onSelect(cat.id)}
        >
          <cat.icon className="w-4 h-4 mr-2" />
          {cat.label}
        </Button>
      ))}
    </div>
  );
};