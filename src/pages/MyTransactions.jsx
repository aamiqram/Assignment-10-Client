import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { FaEye, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { Filter, PlusCircle, SortAsc, SortDesc } from "lucide-react";

const MyTransactions = () => {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("date-desc");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    fetchTransactions();
  }, [sortBy, user, filterType]);

  const fetchTransactions = async () => {
    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "https://finease-server-six.vercel.app";
      const response = await fetch(
        `${API_URL}/api/transactions/${user.email}?sort=${sortBy}`
      );
      const data = await response.json();
      setTransactions(data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      toast.error("Failed to load transactions");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#FF3B30",
      cancelButtonColor: "#8E8E93",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const API_URL =
          import.meta.env.VITE_API_URL || "https://server-complete.vercel.app";
        const response = await fetch(`${API_URL}/api/transactions/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          setTransactions(transactions.filter((t) => t._id !== id));
          toast.success("Transaction deleted successfully!");
        } else {
          toast.error("Failed to delete transaction");
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error deleting transaction");
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };

  // Calculate summary stats
  const stats = transactions.reduce(
    (acc, t) => {
      if (t.type === "Income") {
        acc.totalIncome += t.amount;
      } else {
        acc.totalExpense += t.amount;
      }

      return acc;
    },
    { totalIncome: 0, totalExpense: 0, balance: 0, totalTransactions: 0 }
  );
  stats.balance = stats.totalIncome - stats.totalExpense;
  stats.totalTransactions = transactions.length;

  const filteredTransactions = transactions.filter(
    (t) => filterType === "all" || t.type === filterType
  );
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortBy === "date-desc") return new Date(b.date) - new Date(a.date);
    if (sortBy === "date-asc") return new Date(a.date) - new Date(b.date);
    if (sortBy === "amount-desc") return b.amount - a.amount;
    if (sortBy === "amount-asc") return a.amount - b.amount;
    return 0;
  });

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="container mx-auto mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-6">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Transactions</h1>
              <p className="text-base-content/70">
                Track and manage all your financial activities
              </p>
            </div>

            <Link
              to="/add-transaction"
              className="btn btn-primary fancy-button"
            >
              <PlusCircle size={20} />
              Add Transaction
            </Link>
          </div>

          {/* Filters and Sort */}
          <div className="flex flex-wrap gap-4 mb-8">
            {/* Type Filter */}
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-outline">
                <Filter size={18} />
                Filter
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow"
              >
                <li>
                  <button onClick={() => setFilterType("all")}>
                    All Transactions
                  </button>
                </li>
                <li>
                  <button onClick={() => setFilterType("Income")}>
                    Income Only
                  </button>
                </li>
                <li>
                  <button onClick={() => setFilterType("Expense")}>
                    Expenses Only
                  </button>
                </li>
              </ul>
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2">
              {sortBy.includes("desc") ? (
                <SortDesc size={18} />
              ) : (
                <SortAsc size={18} />
              )}
              <select
                className="select select-bordered"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="date-desc">Date (Newest First)</option>
                <option value="date-asc">Date (Oldest First)</option>
                <option value="amount-desc">Amount (High to Low)</option>
                <option value="amount-asc">Amount (Low to High)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Empty State */}
        {sortedTransactions.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-2xl bg-base-200 flex items-center justify-center mx-auto mb-6 border border-base-300">
              <FaPlus size={40} className="text-base-content/40" />
            </div>
            <h3 className="text-2xl font-bold mb-4">No transactions yet</h3>
            <p className="text-base-content/60 mb-6">
              Start tracking your finances by adding your first transaction
            </p>
          </div>
        ) : (
          /* Transaction Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTransactions.map((transaction) => (
              <div
                key={transaction._id}
                className="transaction-card bg-base-200 rounded-2xl p-6 shadow-lg border-l-4 border border-base-300"
                style={{
                  borderLeftColor:
                    transaction.type === "Income" ? "#34C759" : "#FF3B30",
                }}
              >
                {/* Category & Type Badge */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-base-content/60 mb-1">
                      {transaction.category}
                    </p>
                    <p
                      className={`text-2xl font-extrabold ${
                        transaction.type === "Income"
                          ? "text-secondary"
                          : "text-error"
                      }`}
                    >
                      {transaction.type === "Income" ? "+" : "-"}$
                      {transaction.amount.toFixed(2)}
                    </p>
                  </div>
                  <span
                    className={`badge ${
                      transaction.type === "Income"
                        ? "badge-success"
                        : "badge-error"
                    } badge-lg`}
                  >
                    {transaction.type}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm mb-3 line-clamp-2">
                  {transaction.description}
                </p>

                {/* Date */}
                <p className="text-xs text-base-content/60 mb-4">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <Link
                    to={`/transaction/${transaction._id}`}
                    className="btn btn-sm btn-primary"
                  >
                    <FaEye />
                  </Link>
                  <Link
                    to={`/transaction/update/${transaction._id}`}
                    className="btn btn-sm btn-warning"
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => handleDelete(transaction._id)}
                    className="btn btn-sm btn-error"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Stats Summary */}
        <div className="mt-12 card bg-base-100 border border-base-300">
          <div className="card-body">
            <h3 className="font-bold text-lg mb-4">Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-success/10 rounded-xl">
                <div className="text-2xl font-bold text-success">
                  {formatCurrency(stats.totalIncome)}
                </div>
                <div className="text-sm text-base-content/70">Total Income</div>
              </div>
              <div className="text-center p-4 bg-error/10 rounded-xl">
                <div className="text-2xl font-bold text-error">
                  {formatCurrency(stats.totalExpense)}
                </div>
                <div className="text-sm text-base-content/70">
                  Total Expenses
                </div>
              </div>
              <div className="text-center p-4 bg-primary/10 rounded-xl">
                <div className="text-2xl font-bold">
                  {formatCurrency(stats.balance)}
                </div>
                <div className="text-sm text-base-content/70">Net Balance</div>
              </div>
              <div className="text-center p-4 bg-warning/10 rounded-xl">
                <div className="text-2xl font-bold">
                  {stats.totalTransactions}
                </div>
                <div className="text-sm text-base-content/70">
                  Total Transactions
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTransactions;
