import React, { useState } from "react";
import { Phone, MessageSquare, X, ChevronLeft, ChevronRight, Share2, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Listing } from "./AdCard";
import { Language, translations } from "@/translations";
import { toast } from "sonner";

interface AdDetailModalProps {
  listing: Listing | null;
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const AdDetailModal: React.FC<AdDetailModalProps> = ({
  listing,
  isOpen,
  onClose,
  lang,
}) => {
  const [currentImg, setCurrentImg] = useState(0);
  if (!listing) return null;

  const t = translations[lang];

  const handleNext = () => {
    setCurrentImg((prev) => (prev + 1) % listing.images.length);
  };

  const handlePrev = () => {
    setCurrentImg((prev) => (prev - 1 + listing.images.length) % listing.images.length);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden rounded-2xl sm:max-h-[90vh]">
        <div className="flex flex-col md:flex-row h-full">
          {/* Image Gallery */}
          <div className="relative w-full md:w-3/5 bg-black aspect-square md:aspect-auto flex items-center justify-center">
            <img
              src={listing.images[currentImg]}
              alt={listing.title}
              className="w-full h-full object-contain"
            />
            {listing.images.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm"
                  onClick={handlePrev}
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 rounded-full bg-black/20 text-white hover:bg-black/40 backdrop-blur-sm"
                  onClick={handleNext}
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {listing.images.map((_, i) => (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentImg ? "bg-white w-4" : "bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
            <Badge className="absolute top-4 left-4 bg-primary text-white text-lg px-3 py-1 font-bold">
              {listing.price} ETB
            </Badge>
          </div>

          {/* Details */}
          <div className="flex flex-col w-full md:w-2/5 p-6 overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <div>
                <Badge variant="outline" className="mb-2 uppercase tracking-wide text-[10px]">
                  {translations[lang][listing.category as keyof typeof translations["en"]] || listing.category}
                </Badge>
                <DialogTitle className="text-2xl font-bold leading-tight">
                  {listing.title}
                </DialogTitle>
              </div>
              <Button variant="ghost" size="icon" onClick={handleShare} className="shrink-0">
                <Share2 className="w-5 h-5 text-muted-foreground" />
              </Button>
            </div>

            <div className="space-y-6 flex-1">
              <div>
                <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-widest mb-2 flex items-center gap-1.5">
                  <Info className="w-3.5 h-3.5" />
                  {t.description}
                </h4>
                <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap text-sm">
                  {listing.description}
                </p>
              </div>

              <div className="bg-muted/30 rounded-xl p-4 space-y-3">
                <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-widest mb-1">
                  {t.contactInfo}
                </h4>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                    {listing.postedBy[0]}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{listing.postedBy}</p>
                    <p className="text-xs text-muted-foreground">{t.postedBy}</p>
                  </div>
                </div>
                <div className="pt-2 flex gap-3">
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold"
                    onClick={() => (window.location.href = `tel:${listing.phoneNumber}`)}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {t.call}
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-primary/20 hover:bg-primary/5 text-primary font-semibold"
                    onClick={() => (window.location.href = `sms:${listing.phoneNumber}`)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {t.message}
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t text-[10px] text-muted-foreground flex justify-between uppercase tracking-widest">
              <span>ID: {listing.id}</span>
              <span>{listing.date}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};