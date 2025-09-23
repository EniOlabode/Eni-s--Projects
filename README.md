# Detroit Capital Connect 🏙️

**An AI-driven platform connecting Detroit small businesses to funding opportunities and community impact rewards.**

> **🏆 Pitch Competition Entry**: This project was developed for a pitch competition focused on economic mobility in Detroit, addressing the critical need to connect underserved small businesses with funding opportunities and community resources to drive economic growth and opportunity in the city.

![Detroit Capital Connect](banner.png)

## 🌟 Overview

Detroit Capital Connect is a comprehensive web platform developed for a pitch competition addressing economic mobility in Detroit. This solution tackles the critical challenge of connecting small business owners—particularly those in underserved communities—to grants, loans, and funding opportunities while building stronger community connections through gamified impact tracking.

### 🎯 Competition Focus: Economic Mobility in Detroit

This platform directly addresses Detroit's economic mobility challenges by:
- **Breaking Down Barriers**: Simplifying access to complex funding processes for minority and women-owned businesses
- **Community Building**: Creating incentives for businesses to invest in local hiring and community development
- **Knowledge Democratization**: Providing AI-powered coaching to level the playing field for grant applications
- **Economic Ecosystem**: Fostering a connected network of Detroit businesses working toward shared prosperity

## ✨ Key Features

### 🤖 Eva - AI Grant Coach
- **Intelligent Chatbot**: Personalized grant coaching powered by AI
- **Real-time Guidance**: Eligibility checklists, deadlines, and document requirements
- **Comprehensive Coverage**: Federal, state, city, and private funding opportunities
- **Detroit-Specific**: Tailored advice for Detroit's unique business ecosystem
- **Draft Assistance**: Helps write grant application responses

### 🏆 Gamified Impact Dashboard
- **Points System**: Earn points for community impact actions
- **Tier Progression**: Advance through Bronze, Silver, Gold, and Platinum levels
- **Monthly Leaderboards**: Compete with other Detroit businesses
- **Achievement Badges**: Unlock badges like "Second Chance Employer" and "Local Champion"
- **Rewards Store**: Redeem points for government recognition, tax breaks, and mayor event invitations
- **Action Tracking**: Log hiring, local sourcing, and mentoring activities

### 📚 Education Hub
- **Grant Writing Tutorials**: Step-by-step guides for successful applications
- **Funding Database**: Comprehensive list of available opportunities
- **Resource Library**: Tools and templates for business growth
- **Best Practices**: Expert advice tailored for Detroit entrepreneurs

### 💰 Flexible Pricing
- **Free Trial**: 1-2 months with AI chatbot and grant matching
- **Basic Plan**: $25/month with personalized dashboard
- **Premium Plan**: $50/month with credit tools and priority support

### 🔐 Secure Authentication
- **Business Profiles**: Capture company details for personalized experiences
- **Secure Login**: Industry-standard security protocols
- **Data Privacy**: GDPR and SOC 2 compliant data handling

## 🚀 Live Demo

**Production URL**: [https://money-moguls-8uwceod7m-enioluwa-olabodes-projects.vercel.app](https://money-moguls-8uwceod7m-enioluwa-olabodes-projects.vercel.app)

## 🛠️ Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: Supabase
- **Deployment**: Vercel
- **AI Integration**: Custom coaching API
- **Icons**: Lucide React
- **Styling**: Dark/Light mode support

## 📁 Project Structure

```
money-moguls/
├── src/
│   ├── components/
│   │   ├── About.jsx          # Hero section
│   │   ├── Dashboard.jsx      # Impact tracking dashboard
│   │   ├── Eva.jsx           # AI chatbot component
│   │   ├── EducationHub.jsx  # Learning resources
│   │   ├── Login.jsx         # Authentication
│   │   ├── Navbar.jsx        # Navigation
│   │   ├── Pricing.jsx       # Subscription plans
│   │   ├── ThemeToggle.jsx   # Dark/light mode
│   │   └── ui/               # Reusable UI components
│   ├── pages/
│   │   ├── Home.jsx          # Main landing page
│   │   └── NotFound.jsx      # 404 page
│   ├── lib/
│   │   ├── supabaseClient.js # Database connection
│   │   └── utils.js          # Utility functions
│   └── hooks/
│       └── use-toast.js      # Toast notifications
├── api/
│   ├── coach.js              # AI coaching endpoint
│   └── env-check.js          # Environment validation
├── public/
│   └── projects/             # Project images
└── server.js                 # Express server
```

## 🏃‍♂️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Supabase account (for database)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/money-moguls.git
   cd money-moguls
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Deployment

The application is configured for easy deployment on Vercel:

1. **Connect to Vercel**
   ```bash
   npx vercel
   ```

2. **Deploy to production**
   ```bash
   npx vercel --prod
   ```

## 🎯 Key Components

### Eva AI Coach
The heart of the platform - an intelligent chatbot that provides personalized grant coaching based on business profiles and Detroit-specific opportunities.

### Impact Dashboard
A gamified system that encourages community engagement through points, tiers, leaderboards, and rewards for positive business actions.

### Education Hub
Comprehensive learning resources including tutorials, databases, and best practices for successful grant applications.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- City of Detroit for partnership and support
- Detroit business community for feedback and testing
- Open source community for tools and libraries

## 📞 Contact

For questions, support, or partnership inquiries:
- Email: contact@detroitcapitalconnect.com
- Website: [Detroit Capital Connect](https://money-moguls-8uwceod7m-enioluwa-olabodes-projects.vercel.app)

---

**Built with ❤️ for Detroit's entrepreneurial community**
