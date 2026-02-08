import { useState, useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { apiCall } from "../utils/apiCall";
import { useAuth } from "../auth/AuthContext";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

export default function Dashboard() {
  const { user } = useAuth();
  const [summary, setSummary] = useState({ totalIncome: 0, totalExpense: 0, savings: 0 });
  const [budgetData, setBudgetData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const date = new Date();
        const month = date.getMonth() + 1; // 1-12
        const year = date.getFullYear();

        const [summaryRes, categoryRes, budgetRes] = await Promise.all([
          apiCall("/api/analytics/summary", "POST", { month, year }),
          apiCall("/api/analytics/category-breakdown", "POST", { month, year }),
          apiCall("/api/analytics/budget-usage", "POST", { month, year })
        ]);

        console.log("Dashboard Data:", { summaryRes, categoryRes, budgetRes });

        setSummary(summaryRes || { totalIncome: 0, totalExpense: 0, savings: 0 });
        setGraphData(categoryRes || []);
        setBudgetData(budgetRes || []);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Prepare Chart Data
  const chartLabels = graphData.map(item => item.category);
  const chartValues = graphData.map(item => item.amount);

  const chartConfig = {
    labels: chartLabels.length > 0 ? chartLabels : ["No Data"],
    datasets: [
      {
        label: "Spending",
        data: chartValues.length > 0 ? chartValues : [0],
        borderColor: "#22c55e",
        backgroundColor: (ctx) => {
          const g = ctx.chart.ctx.createLinearGradient(0, 0, 0, 300);
          g.addColorStop(0, "rgba(34,197,94,0.35)");
          g.addColorStop(1, "rgba(34,197,94,0)");
          return g;
        },
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#22c55e",
      }
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { grid: { display: false } },
      y: { grid: { color: "rgba(255,255,255,0.05)" }, ticks: { display: false } },
    },
  };

  if (loading) {
    return <div className="min-h-screen bg-[#0f1f16] flex items-center justify-center text-white">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-[#0f1f16] dark:bg-[#0f1f16] text-white">

      {/* MAIN */}
      <main className="flex-1 p-4 md:p-6 space-y-6 w-full">

        {/* HEADER */}
        <div>
          <h1 className="text-2xl font-bold">Welcome back, {user?.name || "User"}</h1>
          <p className="text-green-200/60">Here&apos;s what&apos;s happening with your money this month.</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Stat title="Total Balance" value={`₹${summary.savings || 0}`} />
          <Stat title="Monthly Income" value={`₹${summary.totalIncome || 0}`} />
          <Stat title="Monthly Expenses" value={`₹${summary.totalExpense || 0}`} />
        </div>

        {/* CHART + BUDGET */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* CHART */}
          <div className="lg:col-span-2 bg-green-900/20 border border-green-900/30 p-5 rounded-xl">
            <h3 className="font-semibold text-lg">Category Spending</h3>
            <div className="h-64 mt-4">
              <Line data={chartConfig} options={chartOptions} />
            </div>
          </div>

          {/* BUDGET */}
          <div className="bg-green-900/20 border border-green-900/30 p-5 rounded-xl">
            <h3 className="font-semibold mb-4">Budget Limits (Monthly)</h3>
            <div className="space-y-4">
              {budgetData.length === 0 ? <p className="text-gray-400 text-sm">No budgets set.</p> :
                budgetData.map((budget) => {
                  const percent = isNaN(budget.percentUsed) ? 0 : Math.min(100, Math.round(budget.percentUsed));
                  return (
                    <BudgetItem
                      key={budget.category}
                      name={budget.category}
                      percent={percent}
                      limit={budget.budget}
                      spent={budget.spent}
                      danger={percent > 90}
                    />
                  );
                })
              }
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

/* ---------- SMALL COMPONENTS ---------- */

function Stat({ title, value }) {
  return (
    <div className="bg-green-900/20 border border-green-900/30 p-5 rounded-xl">
      <p className="text-green-200/60 text-sm">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

function BudgetItem({ name, percent, danger, limit, spent }) {
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span>{name}</span>
        <span className="text-xs text-gray-400">₹{spent} / ₹{limit} ({percent}%)</span>
      </div>
      <div className="w-full h-2 bg-green-900/40 rounded">
        <div
          className={`h-2 rounded ${danger ? "bg-red-500" : "bg-green-500"}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
