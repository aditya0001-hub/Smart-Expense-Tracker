import { apiCall } from "../utils/apiCall";
import { useState, useEffect } from "react";

export default function Budgets() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totals, setTotals] = useState({ limit: 0, spent: 0, remaining: 0 });

  // Modals State
  const [isCatModalOpen, setIsCatModalOpen] = useState(false);
  const [isBudgetModalOpen, setIsBudgetModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);

  // Forms State
  const [categoryName, setCategoryName] = useState("");
  const [budgetForm, setBudgetForm] = useState({
    categoryId: "",
    amount: "",
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });

  const fetchData = async () => {
    try {
      const date = new Date();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      // Fetch Budgets (Analytics)
      const budgetRes = await apiCall("/api/analytics/budget-usage", "POST", { month, year });

      if (Array.isArray(budgetRes)) {
        setBudgets(budgetRes);
        // Calculate Totals
        const totalLimit = budgetRes.reduce((acc, curr) => acc + (Number(curr.budget) || 0), 0);
        const totalSpent = budgetRes.reduce((acc, curr) => acc + (Number(curr.spent) || 0), 0);
        setTotals({
          limit: totalLimit,
          spent: totalSpent,
          remaining: totalLimit - totalSpent
        });
      }

      // Fetch Categories (for dropdown)
      const catRes = await apiCall("/api/categories", "GET");
      if (Array.isArray(catRes)) {
        setCategories(catRes);
      }

    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Handlers
  const handleCreateCategory = async (e) => {
    e.preventDefault();
    if (!categoryName) return;
    try {
      await apiCall("/api/categories", "POST", { name: categoryName });
      setCategoryName("");
      setIsCatModalOpen(false);
      fetchData(); // Refresh categories list
    } catch (error) {
      console.error("Error creating category:", error);
      alert("Failed to create category");
    }
  };

  const handleSetBudget = async (e) => {
    e.preventDefault();
    if (!budgetForm.categoryId || !budgetForm.amount) {
      alert("Please fill all fields");
      return;
    }
    try {
      await apiCall("/api/budgets", "POST", {
        ...budgetForm,
        categoryId: Number(budgetForm.categoryId),
        amount: Number(budgetForm.amount),
        month: Number(budgetForm.month),
        year: Number(budgetForm.year)
      });
      setBudgetForm({
        categoryId: "",
        amount: "",
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear()
      });
      setIsBudgetModalOpen(false);
      fetchData(); // Refresh budgets
    } catch (error) {
      console.error("Error setting budget:", error);
      alert("Failed to set budget");
    }
  };

  return (
    <div className="dark min-h-screen bg-white dark:bg-bg-dark text-slate-900 dark:text-white relative">

      {/* --- ADD CATEGORY MODAL --- */}
      {isCatModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/10">
              <h2 className="text-xl font-bold">New Category</h2>
              <button onClick={() => setIsCatModalOpen(false)} className="text-gray-400 hover:text-white"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleCreateCategory} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Category Name</label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="e.g. Travel, Hobbies"
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 px-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
                />
              </div>
              <button type="submit" className="w-full bg-primary text-black font-bold py-3 rounded-xl hover:opacity-90 transition">Create Category</button>
            </form>
          </div>
        </div>
      )}

      {/* --- SET BUDGET MODAL --- */}
      {isBudgetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/10">
              <h2 className="text-xl font-bold">Set Monthly Budget</h2>
              <button onClick={() => setIsBudgetModalOpen(false)} className="text-gray-400 hover:text-white"><span className="material-symbols-outlined">close</span></button>
            </div>
            <form onSubmit={handleSetBudget} className="p-6 space-y-4">
              {/* Category Select */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Category</label>
                <select
                  value={budgetForm.categoryId}
                  onChange={(e) => setBudgetForm({ ...budgetForm, categoryId: e.target.value })}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 px-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition appearance-none"
                >
                  <option value="" disabled>Select Category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id} className="dark:bg-surface-dark">{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Budget Limit</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                  <input
                    type="number"
                    value={budgetForm.amount}
                    onChange={(e) => setBudgetForm({ ...budgetForm, amount: e.target.value })}
                    placeholder="0.00"
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 pl-8 pr-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              {/* Month/Year Row */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Month</label>
                  <input
                    type="number"
                    min="1" max="12"
                    value={budgetForm.month}
                    onChange={(e) => setBudgetForm({ ...budgetForm, month: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 px-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-400 mb-1">Year</label>
                  <input
                    type="number"
                    value={budgetForm.year}
                    onChange={(e) => setBudgetForm({ ...budgetForm, year: e.target.value })}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl py-3 px-4 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
              </div>

              <button type="submit" className="w-full bg-primary text-black font-bold py-3 rounded-xl hover:opacity-90 transition">Set Budget</button>
            </form>
          </div>
        </div>
      )}


      {/* MAIN */}
      <main className={`max-w-7xl mx-auto px-4 md:px-10 py-8 transition duration-300 ${isCatModalOpen || isBudgetModalOpen ? 'blur-sm pointer-events-none' : ''}`}>

        {/* Title & Actions */}
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-black">Monthly Budgets</h1>
            <p className="text-text-secondary">
              Track your spending limits by category for {new Date().toLocaleString('default', { month: 'long' })}.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setIsCatModalOpen(true)}
              className="px-4 h-10 flex items-center gap-2 rounded-lg bg-surface-light dark:bg-white/10 border border-gray-200 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/20 transition font-semibold"
            >
              <span className="material-symbols-outlined">category</span> Add Category
            </button>

            <button
              onClick={() => {
                setIsBudgetModalOpen(true);
                fetchData(); // ensure categories are loaded
              }}
              className="px-4 h-10 flex items-center gap-2 rounded-lg bg-primary text-black font-bold hover:opacity-90 transition"
            >
              <span className="material-symbols-outlined">add_card</span> Set Budget
            </button>
          </div>
        </div>

        {loading ? (
          <div className="p-8 text-center text-text-secondary">Loading budgets...</div>
        ) : (
          <>
            {/* SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <SummaryCard
                title="Total Budget"
                amount={`₹${totals.limit}`}
                icon="account_balance_wallet"
                color="text-primary"
                bgColor="bg-primary/10"
              />
              <SummaryCard
                title="Total Spent"
                amount={`₹${totals.spent}`}
                icon="shopping_cart"
                color="text-red-400"
                bgColor="bg-red-400/10"
              />
              <SummaryCard
                title="Remaining"
                amount={`₹${totals.remaining}`}
                icon="savings"
                color="text-blue-400"
                bgColor="bg-blue-400/10"
              />
            </div>

            {/* BUDGET LIST */}
            <div className="bg-white dark:bg-surface-dark border border-gray-200 dark:border-border-dark rounded-xl p-6">
              <h2 className="text-xl font-bold mb-6">Category Breakdown</h2>

              <div className="space-y-6">
                {budgets.length === 0 ? (
                  <p className="text-text-secondary text-center py-4">No budgets set for this month.</p>
                ) : (
                  budgets.map((budget, index) => (
                    <BudgetCard key={index} data={budget} />
                  ))
                )}
              </div>
            </div>
          </>
        )}

      </main>
    </div>
  );
}

/* ---------- COMPONENTS ---------- */

function SummaryCard({ title, amount, icon, color, bgColor }) {
  return (
    <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-200 dark:border-border-dark flex items-center gap-4">
      <div className={`size-12 rounded-full flex items-center justify-center ${bgColor} ${color}`}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <div>
        <p className="text-text-secondary text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold">{amount}</p>
      </div>
    </div>
  );
}

function BudgetCard({ data }) {
  const { category, budget, spent, percentUsed } = data;

  // Logic: <50% Green, 50-90% Yellow, >90% Red
  let progressColor = "bg-green-500";
  let textColor = "text-green-500";

  if (percentUsed > 90) {
    progressColor = "bg-red-500";
    textColor = "text-red-500";
  } else if (percentUsed >= 50) {
    progressColor = "bg-yellow-500";
    textColor = "text-yellow-500";
  }

  const isExceeded = spent > budget;
  const exceededAmount = spent - budget;
  const displayPercent = Math.min(100, Math.round(percentUsed));

  return (
    <div>
      <div className="flex justify-between items-end mb-2">
        <div>
          <h3 className="font-bold text-lg">{category}</h3>
          <p className="text-text-secondary text-sm">
            Limit: <span className="font-medium text-white">₹{budget}</span>
          </p>
        </div>
        <div className="text-right">
          <p className="font-bold text-xl">₹{spent}</p>
          <p className={`text-xs font-semibold ${isExceeded ? "text-red-500" : "text-text-secondary"}`}>
            {isExceeded ? `Exceeded by ₹${exceededAmount}` : `${displayPercent}% Used`}
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-3 bg-gray-100 dark:bg-black/20 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${progressColor}`}
          style={{ width: `${displayPercent}%` }}
        />
      </div>
    </div>
  );
}
