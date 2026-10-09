# বাজার দর — Bazar Dor

**বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর এক নজরে।**

Bazar Dor is a responsive Bengali-language market-price web application. Users can browse product categories, compare current prices, review price changes, and access account features.

## Features

- **Live product catalogue:** Fetches product and category data from the Bazar Dor API.
- **Price movement sections:** Highlights products whose prices have increased or decreased.
- **Search, filter, and sort:** Find products by name or category and sort prices numerically.
- **Product detail pages:** View current prices, historical comparisons, units, and market information.
- **Authentication:** Email/password sign-up and sign-in using Better Auth.
- **Social authentication support:** Google and GitHub providers when credentials are configured.
- **Profile management:** View account details, update the user's name, and sign out.
- **Responsive interface:** Layouts adapt to mobile, tablet, and desktop screens.
- **Loading and error states:** Skeleton placeholders and a custom not-found page improve navigation feedback.

## Technologies

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Better Auth
- MongoDB
- React Hot Toast
- Lucide React
- Bazar Dor REST API

## API

Primary base URL:

`https://api.api-store.workers.dev/api/bazardor`

Alternative base URL:

`https://api.abcz.workers.dev/api/bazardor`

| Endpoint | Purpose |
| --- | --- |
| `/products` | Fetch all products |
| `/products?category=chal` | Filter products by category |
| `/products/1` | Fetch a product by ID |
| `/categories` | Fetch categories |
| `/categories/chal` | Fetch a category |

## Getting Started

### Requirements

- Node.js compatible with the installed Next.js version
- MongoDB connection string
- npm or pnpm

### Install dependencies

```bash
pnpm install
Configure environment variables

Create .env.local in the project root:

MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_random_secret_at_least_32_characters
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000

# Optional social login credentials
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=

# Optional API override
BAZAR_DOR_API_URL=https://api.api-store.workers.dev/api/bazardor

Keep real credentials private. Never commit .env.local.

Run locally
pnpm dev

Open http://localhost:3000.

Validate before deployment
pnpm lint
pnpm build
Deployment

Deploy the repository to Vercel or another compatible Next.js platform. Configure the production MongoDB connection, Better Auth secret, production auth URLs, and any social-provider credentials in the deployment environment settings.

After deployment, test the home page, product and category routes, sign-in, sign-up, profile updates, and page refreshes.

Disclaimer

Displayed market prices are indicative and may change according to location, market conditions, and time.
