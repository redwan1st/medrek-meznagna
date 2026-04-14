# Marketplace Platform (Gebeya)

A public listing platform for brokers, companies, and individuals to promote items/services.

## Features
- **Listing Management**: View, Search, and Filter listings by category (Real Estate, Automotive, Electronics, etc.).
- **Bilingual Support**: Toggle between Amharic (አማርኛ) and English.
- **Detailed Ad Views**: Support for 4 images per post, full description, and price.
- **Contact Integration**: One-click call or message (SMS/WhatsApp) buttons for the poster.
- **Responsive Design**: Mobile-first approach for accessibility.

## Technical Stack
- **React 19**
- **Tailwind CSS**
- **Lucide Icons**
- **Framer Motion** (for smooth transitions)
- **Shadcn UI** (Button, Input, Textarea, Card, Dialog, Badge)

## UI/UX Plan
- **Primary Color**: #059669 (Green) - represents "Market" and "Success".
- **Typography**: Inter for English, Noto Sans Ethiopic for Amharic.
- **Layout**: Clean grid for listings, modal-based detail views and post creation.

## File Structure
- `src/translations.ts`: Key-value pairs for Amharic/English.
- `src/components/Navbar.tsx`: Search bar, language toggle, and "Post Ad" button.
- `src/components/CategoryFilter.tsx`: Horizontal scroll for categories.
- `src/components/AdCard.tsx`: Summary card with main image and price.
- `src/components/AdModal.tsx`: Modal to view full details with image slider.
- `src/components/PostAdModal.tsx`: Form to create a new ad.
- `src/App.tsx`: Main state and listing management.
