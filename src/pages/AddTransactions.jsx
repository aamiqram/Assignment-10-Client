import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const AddTransaction = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    type: "Income",
    category: "Salary",
    amount: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const API_URL =
        import.meta.env.VITE_API_URL || "https://finease-server-six.vercel.app";
      const response = await fetch(`${API_URL}/api/transactions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          email: user.email,
          name: user.displayName,
        }),
      });

      if (response.ok) {
        toast.success("Transaction added successfully!");
        navigate("/my-transactions");
      } else {
        toast.error("Failed to add transaction");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error adding transaction");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Add Transaction</h1>
          <p className="text-base-content/70">Record your income or expense</p>
        </div>

        <div className="bg-base-200 rounded-2xl p-8 shadow-xl border border-base-300">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Type and Category */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="Salary">Salary</option>
                  <option value="Freelance">Freelance</option>
                  <option value="Investment">Investment</option>
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Bills">Bills</option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Amount and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2">Amount</label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  min="0"
                  step="0.01"
                  className="input input-bordered w-full"
                  placeholder="0.00"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block font-semibold mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="textarea textarea-bordered w-full"
                placeholder="Enter transaction details..."
                required
              />
            </div>

            {/* User Info (Read-only) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block font-semibold mb-2">User Email</label>
                <input
                  type="email"
                  value={user.email}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>

              <div>
                <label className="block font-semibold mb-2">User Name</label>
                <input
                  type="text"
                  value={user.displayName}
                  className="input input-bordered w-full"
                  readOnly
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-full btn-lg"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Adding...
                </>
              ) : (
                "Add Transaction"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddTransaction;
