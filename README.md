# 🛍️ Mindscape Analytics V2 - Multi-Vendor Marketplace

A full-featured e-commerce platform with multi-vendor capabilities, built with Next.js 16, Prisma, Supabase, Stripe, and Better-Auth.

## ✨ Features

### 🛒 **Customer Experience**
- Browse products with category filtering
- Detailed product pages with images
- Secure Stripe checkout
- Order confirmation and success pages

### 👥 **Multi-Vendor System**
- Seller registration and verification
- Seller dashboard with analytics
- Product creation and management
- Approval workflow for products

### 👑 **Admin Panel**
- Product management (approve/delete)
- Order tracking
- Seller verification
- Full CRUD operations

### 💳 **Payment Processing**
- Stripe integration for secure payments
- Webhook handling for order fulfillment
- Support for multiple payment methods

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Stripe account

### Installation

1. **Clone and install dependencies**
   ```bash
   cd mindscape-analytics-v2
   npm install
   ```

2. **Set up environment variables**
   
   Create a `.env` file with:
   ```env
   # Database
   DATABASE_URL="postgresql://..."
   DIRECT_URL="postgresql://..."
   
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL="https://..."
   NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
   
   # Auth
   BETTER_AUTH_SECRET="your-secret-key"
   NEXT_PUBLIC_APP_URL="http://localhost:3000"
   
   # Stripe
   STRIPE_SECRET_KEY="sk_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   ```

3. **Generate Prisma Client**
   ```bash
   npx prisma generate
   ```

4. **Push database schema** (when connection is available)
   ```bash
   npx prisma db push
   ```

5. **Seed database** (optional)
   ```bash
   npx prisma db seed
   ```

6. **Run development server**
   ```bash
   npm run dev
   ```

Visit `http://localhost:3000/shop` to see the marketplace!

## 📁 Project Structure

```
src/
├── app/
│   ├── shop/              # Customer marketplace
│   ├── seller/            # Seller dashboard
│   ├── admin/             # Admin panel
│   ├── become-seller/     # Seller registration
│   ├── actions/           # Server actions
│   └── api/               # API routes (webhooks)
├── components/            # Reusable components
├── lib/                   # Utilities and configs
└── prisma/
    ├── schema.prisma      # Database schema
    └── seed.ts            # Seed script
```

## 🔑 Key Routes

- `/shop` - Product marketplace
- `/shop/[id]` - Product details
- `/seller` - Seller dashboard
- `/seller/products/new` - Create product
- `/become-seller` - Apply to sell
- `/admin` - Admin dashboard
- `/admin/products` - Manage products
- `/admin/orders` - View orders

## 🗄️ Database Schema

### User Model
- Standard auth fields
- Multi-vendor fields: `isSeller`, `storeName`, `stripeAccountId`

### Product Model
- Product details: `name`, `description`, `price`, `category`
- Seller relationship via `sellerId`
- Approval status: `approvedForSale`

### Order Model
- Order tracking with `status`
- Linked to users and products

## 🔐 Authentication

- **Better-Auth** for user authentication
- **Admin whitelist** in `src/lib/auth.ts`
- **Seller verification** workflow

## 💰 Stripe Integration

### Setup Webhook
1. Go to Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events: `checkout.session.completed`
4. Copy webhook secret to `.env`

### Test Cards
- Success: `4242 4242 4242 4242`
- Decline: `4000 0000 0000 0002`

## 🚢 Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Environment Variables Checklist
- [ ] DATABASE_URL
- [ ] DIRECT_URL
- [ ] NEXT_PUBLIC_SUPABASE_URL
- [ ] NEXT_PUBLIC_SUPABASE_ANON_KEY
- [ ] BETTER_AUTH_SECRET
- [ ] STRIPE_SECRET_KEY
- [ ] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- [ ] STRIPE_WEBHOOK_SECRET

## 🛠️ Development

### Adding New Categories
Edit the category list in:
- `src/app/shop/page.tsx`
- `src/app/seller/products/new/page.tsx`

### Customizing Seller Commission
Modify the payout logic in:
- `src/app/api/webhooks/stripe/route.ts`

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

---

Built with ❤️ using Next.js, Prisma, Supabase, and Stripe
