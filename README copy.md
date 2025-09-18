# AutoHub Car Raffle System

A complete **Nuxt 4 fullstack application** for running car raffles with Paystack payment integration. Users can purchase raffle tickets for ₦10,000 each and participate in fair, transparent draws to win a brand new car.

## 🚗 Features

- **Modern Landing Page**: Beautiful gradient design with responsive layout
- **User Authentication**: Secure registration and login with JWT tokens
- **Payment Integration**: Paystack payment gateway for secure transactions
- **Ticket Management**: Unique ticket number generation (AUTOHUB-000001 format)
- **User Dashboard**: Profile management and ticket history
- **Admin Panel**: User management, ticket oversight, and raffle draw functionality
- **Database**: Turso cloud SQLite for scalable data storage
- **Security**: Password hashing with bcrypt, JWT authentication
- **Responsive Design**: Mobile-first design with Tailwind CSS

## 🛠 Tech Stack

- **Frontend**: Nuxt 4 + Vue 3 + JavaScript (ES6+)
- **Backend**: Nuxt Server API Routes (file-based routing)
- **Database**: Turso (cloud SQLite)
- **Payments**: Paystack API integration
- **Styling**: Tailwind CSS with custom gradients
- **Package Manager**: Bun (recommended) or npm
- **Deployment**: Netlify-ready with Turso integration

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun 1.0+
- Paystack account for payment processing
- Turso account for cloud database

### Installation

1. **Clone and install dependencies:**
```bash
# Using Bun (recommended)
bun install

# Or using npm
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` with your actual values:
```env
JWT_SECRET=your-super-secret-jwt-key
PAYSTACK_PUBLIC_KEY=pk_test_your_paystack_public_key
PAYSTACK_SECRET_KEY=sk_test_your_paystack_secret_key
ADMIN_PASSWORD=your-secure-admin-password
TURSO_DATABASE_URL=libsql://your-database-name.turso.io
TURSO_AUTH_TOKEN=your-turso-auth-token
```

3. **Initialize the Turso database:**
```bash
# Using Bun
bun run db:init

# Or using npm
npm run db:init
```

4. **Start the development server:**
```bash
# Using Bun
bun run dev

# Or using npm
npm run dev
```

Visit http://localhost:3000 to see your application.

## 💳 Payment Flow

1. User clicks "Buy Ticket" (₦10,000)
2. Paystack payment popup opens
3. User completes payment
4. Payment reference is sent to `/api/tickets/create`
5. Server verifies payment with Paystack API
6. Unique ticket number is generated (AUTOHUB-000001)
7. Ticket is saved to database
8. User receives confirmation

## 🎯 Admin Features

Access admin panel at `/admin` with your admin password:

- **Dashboard**: View statistics (users, tickets, revenue)
- **User Management**: View all registered users
- **Ticket Management**: View all issued tickets
- **CSV Export**: Export all tickets for external analysis
- **Raffle Draw**: Conduct secure random raffle draws
- **Winner Management**: Track and display winners

## 🏗 Build and Deploy

### Production Build

```bash
# Build for production
bun run build

# Preview production build
bun run preview
```

### Netlify Deployment

1. **Build settings:**
   - Build command: `bun run build`
   - Publish directory: `.output/public`

2. **Environment variables:**
   Add all variables from `.env.example` to Netlify environment settings

3. **Database:**
   For production, consider upgrading to Turso or another hosted SQLite solution

## 🛡 Security Features

- **Password Hashing**: Bcrypt with 12 salt rounds
- **JWT Authentication**: 7-day expiration tokens
- **Input Validation**: Server-side validation for all inputs
- **Secure Random**: Crypto module for raffle draws
- **Payment Verification**: Server-side Paystack verification

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the code comments for implementation details

---

**Built with ❤️ using Nuxt 4, Vue 3, and modern web technologies.**