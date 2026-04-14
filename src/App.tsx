import { useState, useMemo, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { CategoryFilter } from "./components/CategoryFilter";
import { AdCard, Listing } from "./components/AdCard";
import { AdDetailModal } from "./components/AdDetailModal";
import { PostAdModal } from "./components/PostAdModal";
import { Language, translations } from "./translations";
import { Toaster } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const INITIAL_ADS: Listing[] = [
  {
    id: "1",
    title: "Modern Minimalist Villa",
    category: "realEstate",
    price: "15,000,000",
    description: "Beautiful 4-bedroom villa with a private garden, swimming pool, and modern finishes. Located in a prime neighborhood with 24/7 security. Perfect for families looking for luxury and comfort.",
    images: ["https://storage.googleapis.com/dala-prod-public-storage/generated-images/764f6b5f-80c2-4fda-ae05-15d137a172b3/house-listing-7ebb38eb-1776149362377.webp"],
    phoneNumber: "+251911223344",
    postedBy: "Luxury Real Estate Ltd",
    date: "2024-05-20",
  },
  {
    id: "2",
    title: "Premium Leather Sofa Set",
    category: "furniture",
    price: "85,000",
    description: "High-quality 5-seater leather sofa set in pristine condition. Comfortable, stylish, and durable. Ideal for modern living rooms.",
    images: ["https://storage.googleapis.com/dala-prod-public-storage/generated-images/764f6b5f-80c2-4fda-ae05-15d137a172b3/sofa-listing-d4f3a917-1776149363073.webp"],
    phoneNumber: "+251922334455",
    postedBy: "Home Essentials",
    date: "2024-05-18",
  },
  {
    id: "3",
    title: "High Performance Laptop",
    category: "electronics",
    price: "65,000",
    description: "Powerful workstation laptop with 16GB RAM, 512GB SSD, and dedicated graphics. Perfect for developers, designers, and students.",
    images: ["https://storage.googleapis.com/dala-prod-public-storage/generated-images/764f6b5f-80c2-4fda-ae05-15d137a172b3/tech-listing-89ff9c1e-1776149365190.webp"],
    phoneNumber: "+251944556677",
    postedBy: "Tech Hub",
    date: "2024-05-15",
  },
  {
    id: "4",
    title: "Sleek Electric Car",
    category: "automotive",
    price: "4,500,000",
    description: "Brand new electric vehicle with long-range battery and smart features. Zero emissions, low maintenance, and incredible performance.",
    images: ["https://storage.googleapis.com/dala-prod-public-storage/generated-images/764f6b5f-80c2-4fda-ae05-15d137a172b3/car-listing-bd8babd0-1776149362983.webp"],
    phoneNumber: "+251933445566",
    postedBy: "Auto Prime",
    date: "2024-05-10",
  },
];

function App() {
  const [lang, setLang] = useState<Language>("am");
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [listings, setListings] = useState<Listing[]>(INITIAL_ADS);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);

  const filteredAds = useMemo(() => {
    return listings.filter((ad) => {
      const matchesSearch =
        ad.title.toLowerCase().includes(search.toLowerCase()) ||
        ad.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = selectedCategory === "all" || ad.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [listings, search, selectedCategory]);

  const handlePostAd = (newAd: Listing) => {
    setListings([newAd, ...listings]);
  };

  const t = translations[lang];

  useEffect(() => {
    // Inject Amharic Font
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Noto+Sans+Ethiopic:wght@400;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <div className={`min-h-screen bg-[#f8fafc] text-slate-900 ${lang === "am" ? "font-['Noto_Sans_Ethiopic']" : "font-sans"}`}>
      <Toaster position="top-center" richColors />
      
      <Navbar
        lang={lang}
        setLang={setLang}
        onPostClick={() => setIsPostModalOpen(true)}
        search={search}
        setSearch={setSearch}
      />

      <main className="container mx-auto px-4 py-8 sm:py-12 max-w-7xl">
        <header className="mb-10 text-center sm:text-left">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-black mb-4 tracking-tight"
          >
            {t.appName === "ገበያ" ? "የኢትዮጵያ ዲጂታል ገበያ" : "Ethiopia's Digital Marketplace"}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 text-lg max-w-2xl"
          >
            {lang === "am" 
              ? "የሚፈልጉትን ዕቃ ወይም አገልግሎት በቀላሉ ያግኙ:: ደላላዎች፣ ድርጅቶች እና ግለሰቦች ማስታወቂያዎቻቸውን የሚለጥፉበት ክፍት መድረክ::"
              : "Discover the best items and services. A public platform for brokers, companies, and individuals to promote their offerings."}
          </motion.p>
        </header>

        <CategoryFilter
          lang={lang}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <section className="mt-10">
          <AnimatePresence mode="popLayout">
            {filteredAds.length > 0 ? (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {filteredAds.map((ad) => (
                  <AdCard
                    key={ad.id}
                    listing={ad}
                    lang={lang}
                    onClick={() => setSelectedListing(ad)}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center py-32 text-center"
              >
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                  <span className="text-5xl">🔭</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">{t.noAds}</h3>
                <p className="text-slate-500">{lang === "am" ? "ሌላ ፍለጋ ይሞክሩ" : "Try a different search term"}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </main>

      {/* Modals */}
      <AdDetailModal
        listing={selectedListing}
        isOpen={!!selectedListing}
        onClose={() => setSelectedListing(null)}
        lang={lang}
      />

      <PostAdModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        lang={lang}
        onPost={handlePostAd}
      />

      <footer className="border-t bg-white mt-32 py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-10 h-10 bg-[#059669] rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
               <span className="font-bold text-xl">ገ</span>
            </div>
            <span className="font-bold text-2xl tracking-tight">{t.appName}</span>
          </div>
          <p className="text-slate-400 text-sm uppercase tracking-widest font-medium">
            © 2024 Gebeya Marketplace. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;