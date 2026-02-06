import { apiCall } from "../utils/apiCall";
import { useState, useEffect } from "react";

export default function Transaction() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [loading, setLoading] = useState(true);

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    type: "EXPENSE",
    categoryId: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const fetchTransactions = async () => {
    try {
      const data = await apiCall("/api/transactions", "GET");
      setTransactions(data || []);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await apiCall("/api/categories", "GET");
      // Backend should return an array. If it returns null/undefined, default to empty array.
      // Ensure data is an array before setting
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.warn("Categories API returned non-array:", data);
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentData = transactions.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  // Modal Handlers
  const handleOpenModal = () => {
    setIsModalOpen(true);
    // Fetch categories when modal opens to ensure fresh data
    fetchCategories();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({
      amount: "",
      type: "EXPENSE",
      categoryId: "",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.categoryId || !formData.description) {
      alert("Please fill all fields");
      return;
    }

    // Combine selected date with CURRENT time
    const [year, month, day] = formData.date.split('-').map(Number);
    const now = new Date();
    // Create date in local time with current HH:mm:ss
    const dateWithTime = new Date(year, month - 1, day, now.getHours(), now.getMinutes(), now.getSeconds());

    try {
      await apiCall("/api/transactions", "POST", {
        ...formData,
        amount: Number(formData.amount),
        categoryId: Number(formData.categoryId),
        date: dateWithTime.toISOString(),
      });
      handleCloseModal();
      fetchTransactions(); // Refresh list
    } catch (error) {
      console.error("Error creating transaction:", error);
      alert("Failed to create transaction");
    }
  };

  return (
    <div className="dark min-h-screen bg-white dark:bg-bg-dark text-slate-900 dark:text-white relative">

      {/* Modal Overlay */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden">

            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/10">
              <h2 className="text-xl font-bold">Add Transaction</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600 dark:hover:text-white transition">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">

              {/* Type Selection (Radio Group) */}
              <div className="flex gap-4">
                <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border border-transparent cursor-pointer transition ${formData.type === "INCOME" ? "bg-green-500/10 border-green-500/50 text-green-500" : "bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500"}`}>
                  <input
                    type="radio"
                    name="type"
                    value="INCOME"
                    checked={formData.type === "INCOME"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span className="material-symbols-outlined text-[20px]">arrow_circle_up</span>
                  <span className="font-semibold">Income</span>
                </label>

                <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border border-transparent cursor-pointer transition ${formData.type === "EXPENSE" ? "bg-red-500/10 border-red-500/50 text-red-500" : "bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-500"}`}>
                  <input
                    type="radio"
                    name="type"
                    value="EXPENSE"
                    checked={formData.type === "EXPENSE"}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span className="material-symbols-outlined text-[20px]">arrow_circle_down</span>
                  <span className="font-semibold">Expense</span>
                </label>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1 pointer-events-none">Amount</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>

                  {/* Tailwind classes to hide spin buttons: [appearance:textfield] plus webkit pseudos */}
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-8 pr-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1 pointer-events-none">Category</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 px-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition appearance-none"
                >
                  <option value="" disabled>Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id} className="dark:bg-surface-dark">{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1 pointer-events-none">Date</label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 px-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1 pointer-events-none">Description</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="What was this for?"
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 px-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-primary text-black font-bold py-3 rounded-xl hover:opacity-90 transition shadow-lg shadow-primary/20 mt-2"
              >
                Save Transaction
              </button>

            </form>
          </div>
        </div>
      )}

      {/* MAIN */}
      <main className={`max-w-360 mx-auto px-4 md:px-10 py-8 transition duration-300 ${isModalOpen ? 'blur-sm pointer-events-none' : ''}`}>

        {/* Title */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black">Transaction History</h1>
            <p className="text-text-secondary">
              View and manage your financial records across all accounts.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleOpenModal}
              className="px-4 h-10 flex items-center gap-2 rounded-lg bg-primary text-black font-bold hover:opacity-90 transition"
            >
              <span className="material-symbols-outlined">add</span> Add Transaction
            </button>
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4 justify-between">

            {/* Search */}
            <div className="max-w-md w-full">
              <div className="flex items-center bg-gray-100 dark:bg-bg-dark rounded-lg px-3 h-10">
                <span className="material-symbols-outlined text-text-secondary">search</span>
                <input
                  placeholder="Search by description, amount, or category..."
                  className="bg-transparent outline-none w-full px-2 text-sm"
                />
              </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              <FilterBtn icon="calendar_month" text="Last 30 Days" />
              <FilterBtn icon="category" text="All Categories" />
              <FilterBtn icon="credit_card" text="All Methods" />

              <button className="size-10 flex items-center justify-center bg-gray-100 dark:bg-bg-dark rounded-lg hover:bg-red-500/10 text-text-secondary hover:text-red-400">
                <span className="material-symbols-outlined">restart_alt</span>
              </button>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl overflow-hidden">

          {loading ? (
            <div className="p-8 text-center text-text-secondary">Loading transactions...</div>
          ) : (
            <>
              <table className="w-full text-sm">
                <thead className="bg-gray-50 dark:bg-[#152a1f] text-text-secondary uppercase text-xs">
                  <tr>
                    <th className="px-6 py-4 text-left">Date</th>
                    <th className="px-6 py-4 text-left">Category</th>
                    <th className="px-6 py-4 text-left">Description</th>
                    <th className="px-6 py-4 text-right">Amount</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200 dark:divide-border-dark">
                  {currentData.length === 0 ? (
                    <tr>
                      <td colSpan="4" className="px-6 py-8 text-center text-text-secondary">
                        No transactions found.
                      </td>
                    </tr>
                  ) : (
                    currentData.map((tx) => (
                      <Row
                        key={tx.id}
                        date={new Date(tx.date).toLocaleDateString()}
                        cat={tx.category?.name || "Uncategorized"}
                        desc={tx.description}
                        amount={tx.amount}
                        type={tx.type}
                      />
                    ))
                  )}
                </tbody>
              </table>

              {/* Pagination */}
              <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t border-gray-200 dark:border-border-dark">
                <p className="text-sm text-text-secondary">
                  Showing <b>{transactions.length > 0 ? indexOfFirstItem + 1 : 0}</b> to <b>{Math.min(indexOfLastItem, transactions.length)}</b> of <b>{transactions.length}</b> results
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={prevPage}
                    disabled={currentPage === 1}
                    className="px-3 py-1.5 border rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/5"
                  >
                    Previous
                  </button>
                  <button
                    onClick={nextPage}
                    disabled={currentPage >= totalPages}
                    className="px-3 py-1.5 border rounded-lg text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-white/5"
                  >
                    Next
                  </button>
                </div>
              </div>
            </>
          )}

        </div>
      </main>
    </div>
  );
}

/* Small Components */

function Row({ date, cat, desc, amount, type }) {
  const isIncome = type === "INCOME";
  const displayAmount = isIncome ? `+₹${amount}` : `-₹${amount}`;
  const amountColor = isIncome ? "text-primary" : "text-red-400";

  return (
    <tr className="group hover:bg-gray-50 dark:hover:bg-[#152a1f] transition">
      <td className="px-6 py-4 text-gray-600 dark:text-gray-300">{date}</td>
      <td className="px-6 py-4 text-gray-600 dark:text-gray-300 font-medium">{cat}</td>
      <td className="px-6 py-4 text-gray-500 dark:text-gray-400">{desc}</td>
      <td className={`px-6 py-4 text-right font-bold ${amountColor}`}>
        {displayAmount}
      </td>
    </tr>
  );
}

function FilterBtn({ icon, text }) {
  return (
    <button className="flex items-center gap-2 px-3 h-10 bg-gray-100 dark:bg-bg-dark rounded-lg border dark:border-border-dark">
      <span className="material-symbols-outlined text-text-secondary">{icon}</span>
      <span className="text-sm font-medium">{text}</span>
      <span className="material-symbols-outlined text-text-secondary">expand_more</span>
    </button>
  );
}
