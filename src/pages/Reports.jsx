import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";

const Reports = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [timeRange, setTimeRange] = useState("monthly");
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTransactions: 0,
    incomeExpenseRatio: 0,
    savingsRate: 0,
  });
  const [monthlyData, setMonthlyData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);

  useEffect(() => {
    fetchReports();
  }, [user, timeRange]);

  const fetchReports = async () => {
    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "https://finease-server-six.vercel.app";
      const response = await fetch(`${API_URL}/api/transactions/${user.email}`);
      const data = await response.json();
      setTransactions(data);

      // Calculate stats
      const totalIncome = data
        .filter((t) => t.type === "Income")
        .reduce((sum, t) => sum + t.amount, 0);
      const totalExpense = data
        .filter((t) => t.type === "Expense")
        .reduce((sum, t) => sum + t.amount, 0);

      setStats({
        totalTransactions: data.length,
        incomeExpenseRatio:
          totalExpense > 0 ? (totalIncome / totalExpense).toFixed(2) : "∞",
        savingsRate:
          totalIncome > 0
            ? (((totalIncome - totalExpense) / totalIncome) * 100).toFixed(1)
            : 0,
      });

      // Process monthly data
      const monthly = {};
      data.forEach((t) => {
        const month = new Date(t.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
        });
        if (!monthly[month]) monthly[month] = { month, income: 0, expense: 0 };
        if (t.type === "Income") monthly[month].income += t.amount;
        else monthly[month].expense += t.amount;
      });
      setMonthlyData(Object.values(monthly));

      // Process category data
      const categories = {};
      data.forEach((t) => {
        if (!categories[t.category])
          categories[t.category] = {
            category: t.category,
            income: 0,
            expense: 0,
          };
        if (t.type === "Income") categories[t.category].income += t.amount;
        else categories[t.category].expense += t.amount;
      });
      setCategoryData(Object.values(categories));
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load reports");
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const savingsRate =
    stats.totalIncome > 0
      ? (
          ((stats.totalIncome - stats.totalExpense) / stats.totalIncome) *
          100
        ).toFixed(1)
      : 0;

  const topIncomeCategory = Array.isArray(categoryData)
    ? categoryData
        .filter((item) => item.income > 0)
        .sort((a, b) => b.income - a.income)[0]
    : null;

  const topExpenseCategory = Array.isArray(categoryData)
    ? categoryData
        .filter((item) => item.expense > 0)
        .sort((a, b) => b.expense - a.expense)[0]
    : null;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-24 h-24 rounded-2xl bg-base-200 flex items-center justify-center mx-auto mb-6">
          <FileText size={48} className="text-base-content/30" />
        </div>
        <h3 className="text-2xl font-bold mb-4">No data to display</h3>
        <p className="text-base-content/70 mb-8 max-w-md mx-auto">
          Add transactions to see your financial reports
        </p>
        <Link to="/add-transaction" className="btn btn-primary">
          Add Transaction
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Financial Reports</h1>
          <p className="text-base-content/70">
            Analyze your financial performance and insights
          </p>
        </div>

        {/* Time Range Selector */}
        <div className="flex justify-end mb-8">
          <div className="tabs tabs-boxed">
            <button
              className={`tab ${timeRange === "monthly" ? "tab-active" : ""}`}
              onClick={() => setTimeRange("monthly")}
            >
              Monthly
            </button>
            <button
              className={`tab ${timeRange === "yearly" ? "tab-active" : ""}`}
              onClick={() => setTimeRange("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="stat-card bg-base-200 rounded-2xl p-6 shadow-lg">
            <p className="text-sm text-base-content/60 mb-2">
              Total Transactions
            </p>
            <p className="text-4xl font-extrabold">{stats.totalTransactions}</p>
          </div>
          <div className="stat-card bg-base-200 rounded-2xl p-6 shadow-lg">
            <p className="text-sm text-base-content/60 mb-2">
              Income/Expense Ratio
            </p>
            <p className="text-4xl font-extrabold">
              {stats.incomeExpenseRatio}
            </p>
          </div>
          <div className="stat-card bg-base-200 rounded-2xl p-6 shadow-lg">
            <p className="text-sm text-base-content/60 mb-2">Savings Rate</p>
            <p className="text-4xl font-extrabold">{stats.savingsRate}%</p>
          </div>
        </div>

        {/* Monthly Chart */}
        <div className="bg-base-200 rounded-2xl p-8 shadow-lg mb-12">
          <h2 className="text-2xl font-bold mb-6">Monthly Breakdown</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#34C759" />
              <Bar dataKey="expense" fill="#FF3B30" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Category Breakdown */}
        <div className="bg-base-200 rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Category Breakdown</h2>
          <div className="space-y-6">
            {categoryData.map((cat) => {
              const total = cat.income + cat.expense;
              const maxTotal = Math.max(
                ...categoryData.map((c) => c.income + c.expense)
              );
              const percentage = (total / maxTotal) * 100;

              return (
                <div key={cat.category}>
                  <div className="flex justify-between mb-2">
                    <span className="font-bold">{cat.category}</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>
                  <div className="h-4 bg-base-300 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-linear-to-r from-primary to-blue-600 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-base-content/60 mt-1">
                    <span>Income: ${cat.income.toFixed(2)}</span>
                    <span>Expense: ${cat.expense.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* Insights */}
        <div className="card bg-base-100 border border-base-300">
          <div className="card-body">
            <h3 className="font-bold text-lg mb-6">Financial Insights</h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 bg-success/10 border border-success/20 rounded-xl">
                <div className="font-bold text-success mb-2">
                  Top Income Source
                </div>
                <div className="text-2xl font-bold">
                  {topIncomeCategory?._id ||
                    topIncomeCategory?.category ||
                    "N/A"}
                </div>
                <div className="text-sm text-base-content/70">
                  {topIncomeCategory
                    ? formatCurrency(topIncomeCategory.income)
                    : "No income data"}
                </div>
              </div>

              <div className="p-4 bg-error/10 border border-error/20 rounded-xl">
                <div className="font-bold text-error mb-2">Largest Expense</div>
                <div className="text-2xl font-bold">
                  {topExpenseCategory?._id ||
                    topExpenseCategory?.category ||
                    "N/A"}
                </div>
                <div className="text-sm text-base-content/70">
                  {topExpenseCategory
                    ? formatCurrency(topExpenseCategory.expense)
                    : "No expense data"}
                </div>
              </div>

              <div className="p-4 bg-primary/10 border border-primary/20 rounded-xl">
                <div className="font-bold text-primary mb-2">
                  Savings Goal Progress
                </div>
                <div className="text-2xl font-bold">{savingsRate}%</div>
                <div className="text-sm text-base-content/70">
                  of income saved{" "}
                  {timeRange === "monthly" ? "this month" : "this year"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
