import React from "react";
import { Link } from "react-router-dom";
import {
  TrendingUp,
  ArrowUp,
  ArrowDown,
  Wallet,
  Lightbulb,
  ChartLine,
  Plus,
  BarChart3,
} from "lucide-react";

const budgetingTips = [
  {
    icon: "📝",
    title: "Track Every Expense",
    description:
      "Record all your spending, no matter how small. This helps identify areas where you can cut back and optimize your budget.",
    color: "primary",
  },
  {
    icon: "📊",
    title: "Follow the 50/30/20 Rule",
    description:
      "Allocate 50% to needs, 30% to wants, and 20% to savings and debt repayment for balanced financial health.",
    color: "secondary",
  },
  {
    icon: "🛡️",
    title: "Build an Emergency Fund",
    description:
      "Aim to save 3-6 months of expenses for unexpected situations. Start small and build gradually.",
    color: "accent",
  },
  {
    icon: "🤖",
    title: "Automate Your Finances",
    description:
      "Set up automatic transfers for savings and bill payments. This promotes discipline and ensures you don't miss payments.",
    color: "accent",
  },
];

const Home = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-linear-to-br from-base-100 via-base-100 to-base-200 container mx-auto max-w-7xl">
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl floating"></div>
        <div
          className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-secondary/5 rounded-full blur-3xl floating"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/4 w-[350px] h-[350px] bg-success/5 rounded-full blur-3xl floating"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-10 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Enhanced Badge */}
          <div className="inline-flex items-center px-6 py-3 glass-enhanced rounded-full mb-8">
            <TrendingUp className="w-5 h-5 text-primary mr-2" />
            <span className="text-primary font-semibold text-sm">
              Smart Financial Management
            </span>
          </div>

          {/* Enhanced Main Heading */}
          <h1 className="text-hero text-base-content mb-6">
            <span className="block">All of your finances,</span>
            <span className="block bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              all in one place
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-subtitle text-base-content/80 mb-12 max-w-4xl mx-auto leading-relaxed">
            Track expenses, set budgets, and achieve your financial goals with
            our powerful yet simple platform designed for modern life
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/add-transaction"
              className="btn-primary group flex items-center gap-3"
            >
              <Plus className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>Add Transaction</span>
            </Link>
            <Link
              to="/reports"
              className="btn-secondary group flex items-center gap-3"
            >
              <BarChart3 className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span>View Reports</span>
            </Link>
            <Link to="/register" className="btn-primary">
              Get Started Free
            </Link>
            <Link to="/login" className="btn-secondary">
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Features Sections */}
      <section className="relative py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Budgeting Tips Section */}
            <div className="bg-base-100 border border-base-300 rounded-3xl p-12 relative overflow-hidden shadow-xl">
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-linear-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-primary/25">
                  <Lightbulb className="text-white w-7 h-7" />
                </div>

                <h2 className="text-display text-base-content mb-4">
                  Smart Budgeting Tips
                </h2>
                <p className="text-body text-base-content/70 mb-8">
                  Master your money with these proven strategies for financial
                  success
                </p>

                <div className="space-y-6">
                  {budgetingTips.map((tip, index) => (
                    <div
                      key={index}
                      className="flex gap-6 p-6 bg-base-200 border border-base-300 rounded-2xl hover:border-primary transition-all duration-300 hover:translate-x-2 group"
                    >
                      <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                        {tip.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-base-content mb-2 text-lg">
                          {tip.title}
                        </h3>
                        <p className="text-base-content/70 leading-relaxed">
                          {tip.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Financial Planning Section */}
            <div className="bg-base-100 border border-base-300 rounded-3xl p-12 relative overflow-hidden shadow-xl">
              <div className="absolute -top-32 -left-32 w-64 h-64 bg-success/5 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-linear-to-br from-success to-success/80 rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-success/25">
                  <ChartLine className="text-white w-7 h-7" />
                </div>

                <h2 className="text-display text-base-content mb-4">
                  Why Financial Planning Matters
                </h2>
                <p className="text-body text-base-content/70 mb-8 leading-relaxed">
                  Financial planning is essential for achieving long-term
                  stability and peace of mind. Take control of your financial
                  future today.
                </p>

                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-4 p-6 bg-base-200 border border-base-300 rounded-xl hover:border-success transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-primary to-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">🧠</span>
                    </div>
                    <span className="text-base-content font-semibold flex-1">
                      Make informed decisions about spending and saving
                    </span>
                  </div>
                  <div className="flex items-center gap-4 p-6 bg-base-200 border border-base-300 rounded-xl hover:border-secondary transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-secondary to-secondary/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">📅</span>
                    </div>
                    <span className="text-base-content font-semibold flex-1">
                      Prepare for major life events and emergencies
                    </span>
                  </div>
                  <div className="flex items-center gap-4 p-6 bg-base-200 border border-base-300 rounded-xl hover:border-accent transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-accent to-accent/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">😊</span>
                    </div>
                    <span className="text-base-content font-semibold flex-1">
                      Reduce financial stress and anxiety
                    </span>
                  </div>
                  <div className="flex items-center gap-4 p-6 bg-base-200 border border-base-300 rounded-xl hover:border-warning transition-all duration-300 group">
                    <div className="w-12 h-12 rounded-xl bg-linear-to-br from-warning to-warning/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-white text-xl">🏆</span>
                    </div>
                    <span className="text-base-content font-semibold flex-1">
                      Build wealth and achieve financial independence
                    </span>
                  </div>
                </div>

                {/* Enhanced Quote Box */}
                <div className="p-6 bg-success/10 border border-success/20 rounded-2xl">
                  <div className="flex items-start gap-4">
                    <span className="text-2xl text-success">🧑🏻‍🏫</span>
                    <p className="text-base-content text-lg font-medium italic leading-relaxed">
                      "A goal without a plan is just a wish. Start planning your
                      financial future today."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
