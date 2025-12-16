import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import {
  FaArrowLeft,
  FaEdit,
  FaTrash,
  FaCalendar,
  FaChartLine,
} from "react-icons/fa";

const TransactionDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [categoryTotal, setCategoryTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransaction();
  }, [id]);

  const fetchTransaction = async () => {
    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "https://finease-server-six.vercel.app";

      // Fetch single transaction
      const response = await fetch(`${API_URL}/api/transaction/${id}`);
      const data = await response.json();
      setTransaction(data);

      // Fetch all user transactions to calculate category total
      const allResponse = await fetch(
        `${API_URL}/api/transactions/${user.email}`
      );
      const allTransactions = await allResponse.json();

      const total = allTransactions
        .filter((t) => t.category === data.category)
        .reduce((sum, t) => sum + t.amount, 0);

      setCategoryTotal(total);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to load transaction");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
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
          import.meta.env.VITE_API_URL ||
          "https://finease-server-six.vercel.app";
        const response = await fetch(`${API_URL}/api/transactions/${id}`, {
          method: "DELETE",
        });

        if (response.ok) {
          toast.success("Transaction deleted successfully!");
          navigate("/my-transactions");
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

  if (!transaction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Transaction not found</h2>
          <Link to="/my-transactions" className="btn btn-primary">
            Back to Transactions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <Link to="/my-transactions" className="btn btn-ghost mb-6 gap-2">
          <FaArrowLeft />
          Back to Transactions
        </Link>

        {/* Transaction Card */}
        <div
          className="bg-base-200 rounded-2xl p-8 shadow-xl border-l-8 border border-base-300"
          style={{
            borderLeftColor:
              transaction.type === "Income" ? "#34C759" : "#FF3B30",
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <p className="text-sm text-base-content/60 mb-2">
                Transaction Details
              </p>
              <h1
                className={`text-5xl font-extrabold ${
                  transaction.type === "Income"
                    ? "text-secondary"
                    : "text-error"
                }`}
              >
                {transaction.type === "Income" ? "+" : "-"}$
                {transaction.amount.toFixed(2)}
              </h1>
            </div>
            <span
              className={`badge ${
                transaction.type === "Income" ? "badge-success" : "badge-error"
              } badge-lg`}
            >
              {transaction.type}
            </span>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div>
              <p className="text-sm font-semibold text-base-content/60 mb-2">
                Category
              </p>
              <p className="text-xl font-bold">{transaction.category}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-base-content/60 mb-2">
                Description
              </p>
              <p className="text-xl">{transaction.description}</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-base-content/60 mb-2">
                Date
              </p>
              <p className="text-xl flex items-center gap-2">
                <FaCalendar className="text-primary" />
                {new Date(transaction.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-base-content/60 mb-2">
                Added By
              </p>
              <p className="text-xl font-semibold">{transaction.name}</p>
            </div>

            <div className="md:col-span-2">
              <p className="text-sm font-semibold text-base-content/60 mb-2">
                Total Amount in {transaction.category}
              </p>
              <p className="text-xl font-bold flex items-center gap-2">
                <FaChartLine className="text-primary" />$
                {categoryTotal.toFixed(2)}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-base-300">
            <Link
              to={`/transaction/update/${transaction._id}`}
              className="btn btn-warning flex-1 gap-2"
            >
              <FaEdit />
              Update Transaction
            </Link>
            <button
              onClick={handleDelete}
              className="btn btn-error flex-1 gap-2"
            >
              <FaTrash />
              Delete Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionDetail;
