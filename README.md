# বাজার দর — Bazar Dor

**বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক নজরে।**

Bazar Dor is a responsive Bengali-language market-price application for browsing essential products, comparing prices across markets, and tracking price changes.

## Features

- Live product catalogue and category browsing through the Bazar Dor API.
- Sections highlighting products with rising and falling prices.
- Product search, filtering, and numeric price sorting.
- Protected product details with current, historical, minimum, maximum, average, and market-wise prices when data is available.
- Email/password authentication and Google/GitHub sign-in support when configured.
- Profile viewing, name updates, and sign-out.
- Responsive layouts for mobile, tablet, and desktop.
- Loading skeletons, error handling, and a custom 404 page.

## Technologies

- Next.js App Router
- React and TypeScript
- Tailwind CSS
- Better Auth
- MongoDB
- React Hot Toast
- Lucide React
- Bazar Dor REST API

## API

Primary: `https://api.api-store.workers.dev/api/bazardor`

Alternative: `https://api.abcz.workers.dev/api/bazardor`

| Endpoint | Purpose |
| --- | --- |
| `/products` | All products |
| `/products?category=chal` | Products by category |
| `/products/1` | Single product |
| `/categories` | All categories |
| `/categories/chal` | Single category |

## Getting Started

### Requirements

- A Node.js version compatible with the installed Next.js version
- pnpm
- A MongoDB database

### Install dependencies

```bash
pnpm install
```

### Environment variables

Create `.env.local` in the project root:

```dotenv
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_random_secret_at_least_32_characters
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Optional: social sign-in
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Optional: API override
BAZAR_DOR_API_URL=https://api.api-store.workers.dev/api/bazardor
```

Keep real credentials private. Never commit `.env.local`.

### Run locally

```bash
pnpm dev
```

Open `http://localhost:3000`.

### Validate before deployment

```bash
pnpm lint
pnpm build
```

## Deployment

Deploy to Vercel or another compatible Next.js hosting provider. Configure the production MongoDB connection, Better Auth secret, production auth URLs, and social-provider credentials in the hosting environment settings.

After deployment, test authentication, profile updates, protected product details, invalid routes, and page refreshes.

## Disclaimer

Displayed market prices are indicative and may change according to location, market conditions, and time.
