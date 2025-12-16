import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  FaWallet,
  FaArrowUp,
  FaArrowDown,
  FaLightbulb,
  FaChartLine,
  FaClipboardCheck,
  FaChartPie,
  FaShieldAlt,
  FaBrain,
  FaCalendarCheck,
  FaSmile,
  FaTrophy,
  FaQuoteLeft,
  FaRobot,
} from "react-icons/fa";

const Home = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    balance: 0,
    income: 0,
    expense: 0,
  });
  const [loading, setLoading] = useState(true);

  // Fetch user's financial stats if logged in
  useEffect(() => {
    const fetchStats = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const API_URL =
          import.meta.env.VITE_API_URL ||
          "https://finease-server-six.vercel.app";
        const response = await fetch(
          `${API_URL}/api/transactions/${user.email}`
        );
        const transactions = await response.json();

        const totalIncome = transactions
          .filter((t) => t.type === "Income")
          .reduce((sum, t) => sum + t.amount, 0);

        const totalExpense = transactions
          .filter((t) => t.type === "Expense")
          .reduce((sum, t) => sum + t.amount, 0);

        setStats({
          balance: totalIncome - totalExpense,
          income: totalIncome,
          expense: totalExpense,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  return (
    <div className="bg-base-100">
      {/* Decorative Background Orbs */}
      <div className="fixed top-[-200px] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed top-[20%] right-[10%] w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed bottom-[10%] left-[5%] w-[350px] h-[350px] bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-24 md:py-32 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-block mb-6 px-6 py-2 bg-primary/10 border border-primary/20 rounded-full backdrop-blur-sm">
            <span className="text-sm font-semibold text-primary">
              ✨ Smart Financial Management
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight bg-linear-to-r from-base-content to-base-content/70 bg-clip-text text-transparent">
            All of your finances, all in one place
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-base-content/70 mb-10 max-w-2xl mx-auto leading-relaxed">
            Track expenses, set budgets, and achieve your financial goals with
            our powerful yet simple platform designed for modern life
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            {user ? (
              <>
                <Link
                  to="/add-transaction"
                  className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <FaArrowUp />
                  Add Transaction
                </Link>
                <Link to="/reports" className="btn btn-outline btn-lg gap-2">
                  <FaChartLine />
                  View Reports
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/register"
                  className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started Free
                </Link>
                <Link to="/login" className="btn btn-outline btn-lg">
                  Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Stats Section (Only show if user is logged in) */}
      {user && (
        <section className="relative z-10 px-6 pb-20">
          <div className="max-w-6xl mx-auto">
            {loading ? (
              <div className="flex justify-center py-12">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Balance Card */}
                <div className="stat-card bg-base-100 rounded-3xl p-8 shadow-xl border border-base-300 relative overflow-hidden">
                  <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-primary/10 rounded-full blur-2xl"></div>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-blue-600 flex items-center justify-center text-white shadow-lg">
                      <FaWallet size={28} />
                    </div>
                    <div>
                      <p className="text-sm text-base-content/60 font-semibold">
                        Total Balance
                      </p>
                      <p className="text-3xl font-extrabold">
                        ${stats.balance.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Income Card */}
                <div className="stat-card bg-base-100 rounded-3xl p-8 shadow-xl border border-base-300 relative overflow-hidden">
                  <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-secondary/10 rounded-full blur-2xl"></div>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-secondary to-green-600 flex items-center justify-center text-white shadow-lg">
                      <FaArrowUp size={28} />
                    </div>
                    <div>
                      <p className="text-sm text-base-content/60 font-semibold">
                        Total Income
                      </p>
                      <p className="text-3xl font-extrabold text-green-500">
                        ${stats.income.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Expense Card */}
                <div className="stat-card bg-base-100 rounded-3xl p-8 shadow-xl border border-base-300 relative overflow-hidden">
                  <div className="absolute top-[-50px] right-[-50px] w-[150px] h-[150px] bg-error/10 rounded-full blur-2xl"></div>
                  <div className="flex items-center gap-4 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-error to-red-600 flex items-center justify-center text-white shadow-lg">
                      <FaArrowDown size={28} />
                    </div>
                    <div>
                      <p className="text-sm text-base-content/60 font-semibold">
                        Total Expenses
                      </p>
                      <p className="text-3xl font-extrabold text-red-500">
                        ${stats.expense.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Tips and Planning Section */}
      <section className="bg-base-200 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Budgeting Tips */}
            <div className="bg-base-100 rounded-3xl p-10 shadow-xl border border-base-300 relative overflow-hidden">
              <div className="absolute top-[-100px] right-[-100px] w-[250px] h-[250px] bg-primary/5 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-purple-600 flex items-center justify-center mb-6 shadow-lg">
                  <FaLightbulb size={28} className="text-white" />
                </div>

                <h2 className="text-3xl font-extrabold mb-4">
                  Smart Budgeting Tips
                </h2>
                <p className="text-base-content/70 mb-8">
                  Master your money with these proven strategies for financial
                  success
                </p>

                <div className="space-y-6">
                  {[
                    {
                      icon: FaClipboardCheck,
                      title: "Track Every Expense",
                      desc: "Record all your spending, no matter how small. This helps identify areas where you can cut back and optimize your budget.",
                      color: "text-blue-600",
                    },
                    {
                      icon: FaChartPie,
                      title: "Follow the 50/30/20 Rule",
                      desc: "Allocate 50% to needs, 30% to wants, and 20% to savings and debt repayment for balanced financial health.",
                      color: "text-purple-600",
                    },
                    {
                      icon: FaShieldAlt,
                      title: "Build an Emergency Fund",
                      desc: "Aim to save 3-6 months of expenses for unexpected situations. Start small and build gradually.",
                      color: "text-pink-600",
                    },
                    {
                      icon: FaRobot,
                      title: "Automate Your Finances",
                      desc: "Set up automatic transfers for savings and bill payments. This promotes discipline and ensures you don't miss payments.",
                      color: "text-pink-600",
                    },
                  ].map((tip, idx) => (
                    <div
                      key={idx}
                      className="flex gap-4 p-4 bg-base-200 rounded-2xl border border-base-300 hover:border-primary transition-all hover:translate-x-2"
                    >
                      <div className="shrink-0 w-14 h-14 rounded-xl bg-base-100 flex items-center justify-center relative overflow-hidden">
                        <div
                          className={`absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-50`}
                        ></div>
                        <tip.icon
                          size={24}
                          className={tip.color + " relative z-10"}
                        />
                      </div>
                      <div>
                        <h3 className="font-bold mb-2">{tip.title}</h3>
                        <p className="text-sm text-base-content/70 leading-relaxed">
                          {tip.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Financial Planning */}
            <div className="bg-base-100 rounded-3xl p-10 shadow-xl border border-base-300 relative overflow-hidden">
              <div className="absolute top-[-100px] left-[-100px] w-[250px] h-[250px] bg-secondary/5 rounded-full blur-3xl"></div>

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-secondary to-green-600 flex items-center justify-center mb-6 shadow-lg">
                  <FaChartLine size={28} className="text-white" />
                </div>

                <h2 className="text-3xl font-extrabold mb-4">
                  Why Financial Planning Matters
                </h2>
                <p className="text-base-content/70 mb-8 leading-relaxed">
                  Financial planning is essential for achieving long-term
                  stability and peace of mind. Take control of your financial
                  future today.
                </p>

                <div className="space-y-4 mb-8">
                  {[
                    {
                      icon: FaBrain,
                      title:
                        "Make informed decisions about spending and saving",
                      gradient: "from-blue-500 to-blue-600",
                    },
                    {
                      icon: FaCalendarCheck,
                      title: "Prepare for major life events and emergencies",
                      gradient: "from-purple-500 to-purple-600",
                    },
                    {
                      icon: FaSmile,
                      title: "Reduce financial stress and anxiety",
                      gradient: "from-pink-500 to-pink-600",
                    },
                    {
                      icon: FaTrophy,
                      title: "Build wealth and achieve financial independence",
                      gradient: "from-orange-500 to-orange-600",
                    },
                  ].map((item, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-4 bg-base-200 rounded-2xl border border-base-300 hover:scale-[1.02] hover:shadow-lg transition-all relative overflow-hidden"
                    >
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-1 bg-linear-to-b ${item.gradient}`}
                      ></div>
                      <div
                        className={`w-14 h-14 rounded-xl bg-linear-to-br ${item.gradient} flex items-center justify-center shrink-0 shadow-md`}
                      >
                        <item.icon size={24} className="text-white" />
                      </div>
                      <span className="font-semibold leading-snug">
                        {item.title}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Quote Box */}
                <div className="p-6 bg-secondary/10 border border-secondary/20 rounded-2xl relative">
                  <FaQuoteLeft className="text-secondary/40 text-2xl mb-3" />
                  <p className="text-base-content font-medium italic leading-relaxed">
                    "A goal without a plan is just a wish. Start planning your
                    financial future today."
                  </p>
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
