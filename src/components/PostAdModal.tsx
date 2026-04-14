import React, { useState } from "react";
import { Camera, X, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Language, translations } from "@/translations";
import { toast } from "sonner";
import { Listing } from "./AdCard";

interface PostAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onPost: (ad: Listing) => void;
}

export const PostAdModal: React.FC<PostAdModalProps> = ({
  isOpen,
  onClose,
  lang,
  onPost,
}) => {
  const t = translations[lang];
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
    phoneNumber: "",
    postedBy: "",
  });

  const handleImageAdd = () => {
    if (images.length >= 4) return;
    // Simulate image adding
    const placeholders = [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=400",
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400",
    ];
    setImages([...images, placeholders[images.length]]);
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.category || !formData.price || !formData.phoneNumber) {
      toast.error(t.errorMsg);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newAd: Listing = {
        id: Math.random().toString(36).substr(2, 9),
        ...formData,
        images: images.length > 0 ? images : ["https://via.placeholder.com/400?text=No+Image"],
        date: new Date().toLocaleDateString(),
      };
      onPost(newAd);
      setLoading(false);
      setFormData({
        title: "",
        category: "",
        price: "",
        description: "",
        phoneNumber: "",
        postedBy: "",
      });
      setImages([]);
      toast.success(t.successMsg);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg overflow-y-auto max-h-[90vh] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{t.postAd}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5 py-2">
          <div className="grid gap-2">
            <Label htmlFor="title">{t.title}*</Label>
            <Input
              id="title"
              placeholder="e.g. Modern Sofa"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category">{t.category}*</Label>
              <Select
                onValueChange={(val) => setFormData({ ...formData, category: val })}
              >
                <SelectTrigger>
                  <SelectValue placeholder={t.category} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="realEstate">{t.realEstate}</SelectItem>
                  <SelectItem value="automotive">{t.automotive}</SelectItem>
                  <SelectItem value="electronics">{t.electronics}</SelectItem>
                  <SelectItem value="furniture">{t.furniture}</SelectItem>
                  <SelectItem value="services">{t.services}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="price">{t.price} (ETB)*</Label>
              <Input
                id="price"
                type="number"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">{t.description}</Label>
            <Textarea
              id="description"
              placeholder="..."
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="postedBy">{t.postedBy}</Label>
              <Input
                id="postedBy"
                placeholder="Your name"
                value={formData.postedBy}
                onChange={(e) => setFormData({ ...formData, postedBy: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">{t.phoneNumber}*</Label>
              <Input
                id="phone"
                placeholder="+251..."
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label>{t.addPhotos}</Label>
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-lg overflow-hidden border">
                  <img src={img} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    className="absolute top-1 right-1 bg-red-500 text-white p-0.5 rounded-full"
                    onClick={() => handleRemoveImage(i)}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
              {images.length < 4 && (
                <button
                  type="button"
                  className="aspect-square rounded-lg border-2 border-dashed border-muted flex flex-col items-center justify-center hover:bg-muted/50 transition-colors"
                  onClick={handleImageAdd}
                >
                  <Camera className="w-6 h-6 text-muted-foreground mb-1" />
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">{images.length}/4</span>
                </button>
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={onClose}
              disabled={loading}
            >
              {t.cancel}
            </Button>
            <Button type="submit" className="flex-1 bg-primary" disabled={loading}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : t.submit}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};