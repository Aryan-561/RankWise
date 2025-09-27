# RankWise (KIHEAT RANKLIST AI Assistance)

A comprehensive student ranking and academic performance analysis platform with intelligent AI assistance.

## 🌟 Features

- **Student Rankings**: Access comprehensive student rankings and academic performance data
- **Performance Analytics**: Detailed insights into academic performance, SGPA, and grade analysis
- **AI Assistant (Rankwise)**: Intelligent chatbot that helps users navigate rankings, understand results, and get insights about student performance
- **Modern UI**: Built with Next.js 15, React 19, and Tailwind CSS for a responsive and intuitive user experience
- **Dark/Light Theme**: Seamless theme switching with next-themes
- **Database Integration**: MongoDB integration with Mongoose for efficient data management

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun
- MongoDB database (local or cloud)

### Installation

1. **Clone the repository**
```bash
git clone <your-repo-url>
cd minor
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```



4. **Run the development server**
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

5. **Open your browser**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js 15 App Router
│   ├── (app)/
│   │   └── chat/          # AI Chat Interface
│   ├── api/               # API Routes
│   │   └── chat/          # Chat API endpoint
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Reusable UI components
│   ├── theme-provider.tsx # Theme context provider
│   └── ui/                # Shadcn/ui components
├── lib/                   # Utility libraries
│   ├── dbConnect.ts       # Database connection
│   ├── systemMessage.ts   # AI system prompts
│   ├── tools.ts           # AI tools and functions
│   └── utils.ts           # General utilities
├── model/                 # Database models
│   └── student.model.ts   # Student data schema
└── types/                 # TypeScript type definitions
    └── student.type.ts    # Student-related types
```

## 🛠️ Tech Stack

### Frontend
- **Next.js 15**: React framework with App Router
- **React 19**: Latest React features
- **TypeScript**: Type-safe development
- **Tailwind CSS 4**: Utility-first CSS framework
- **Shadcn/ui**: Modern UI component library
- **Lucide React**: Beautiful icons
- **next-themes**: Theme switching

### Backend
- **Next.js API Routes**: Serverless API endpoints
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling

### AI Integration
- **LangChain**: AI application framework
- **Google Generative AI**: AI model integration
- **LangGraph**: Complex AI workflow orchestration

## 🤖 AI Features

The application includes "Rankwise," an intelligent AI assistant that can:

- Help users understand student rankings
- Explain academic performance metrics
- Answer questions about SGPA calculations
- Provide insights into grade distributions
- Guide users through the platform features

## 📊 Data Models

The application handles comprehensive student academic data including:

- **Student Information**: Personal details and academic records
- **Semester Data**: Semester-wise performance tracking
- **Subject Details**: Individual subject marks, grades, and credits
- **Performance Metrics**: SGPA, percentage calculations, and rankings

## 🎨 UI Components

Built with modern, accessible components:

- Responsive design for all screen sizes
- Dark/light theme support
- Interactive chat interface
- Performance analytics dashboards
- Mobile-optimized navigation



## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

s

Stay updated with the latest features and improvements by watching this repository.

---

**Built with ❤️ for educational excellence**
