import React from "react";
import { motion } from "framer-motion";
import { Phone, MessageSquare, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Language, translations } from "@/translations";

export interface Listing {
  id: string;
  title: string;
  category: string;
  price: string;
  description: string;
  images: string[];
  phoneNumber: string;
  postedBy: string;
  date: string;
}

interface AdCardProps {
  listing: Listing;
  lang: Language;
  onClick: () => void;
}

export const AdCard: React.FC<AdCardProps> = ({ listing, lang, onClick }) => {
  const t = translations[lang];

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="cursor-pointer"
      onClick={onClick}
    >
      <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow h-full group">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={listing.images[0]}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <Badge className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white border-none">
            {translations[lang][listing.category as keyof typeof translations["en"]] || listing.category}
          </Badge>
        </div>
        <CardContent className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg line-clamp-1 leading-tight group-hover:text-primary transition-colors">
              {listing.title}
            </h3>
          </div>
          <div className="flex items-baseline gap-1 mb-3">
            <span className="text-xl font-bold text-primary">{listing.price}</span>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">ETB</span>
          </div>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4 h-10">
            {listing.description}
          </p>
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Phone className="w-3.5 h-3.5" />
              <span>{listing.phoneNumber}</span>
            </div>
            <div className="flex gap-2">
              <button
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `tel:${listing.phoneNumber}`;
                }}
              >
                <Phone className="w-4 h-4" />
              </button>
              <button
                className="p-2 rounded-full bg-secondary text-foreground hover:bg-muted transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  window.location.href = `sms:${listing.phoneNumber}`;
                }}
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};