import { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import Card, { CardHeader, CardTitle, CardContent } from "../components/ui/BaseCard";
import Input from "../components/ui/Input";
// import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import BaseSelect from "../components/ui/BaseSelect"
import BaseTable, { TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/BaseTable";
import BaseTab from "../components/ui/BaseTab";
// import { Progress } from "../components/ui/progress";
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Doughnut, Bar } from 'react-chartjs-2';
// import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const categories = [
  { id: 1, name: "Food" },
  { id: 2, name: "Transport" },
  { id: 3, name: "Shopping" },
  { id: 4, name: "Bills" },
  { id: 5, name: "Entertainment" },
];
const tabs = [
  { name: "My Account", href: "#", current: false },
  { name: "Company", href: "#", current: false },
  { name: "Team Members", href: "#", current: true },
  { name: "Billing", href: "#", current: false },
];
const ExpenseTracker = () => {
  // const [activeTab, setActiveTab] = useState("dashboard");
  const [activeTab, setActiveTab] = useState(
    tabs.find((tab) => tab.current) || tabs[0]
  );
  const [loading, setLoading] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [timePeriod, setTimePeriod] = useState("weekly");
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const userId = localStorage.getItem('userId') || `user_${Math.random().toString(36).substr(2, 9)}`;
  const appSlug = 'expense-tracker-app';

  useEffect(() => {
    if (!localStorage.getItem('userId')) {
      localStorage.setItem('userId', userId);
    }
    loadDashboard();
  }, []);

  const dbOperation = async (action, table, data = null, id = null) => {
    setLoading(true);
    try {
      const response = await fetch('https://r0c8kgwocscg8gsokogwwsw4.zetaverse.one/db', {
        method: 'POST',
        headers: {
          'Authorization': 'Bearer 3okIiyLuGMSmbozIBjUr1r9jivM2',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, appSlug, action, table, id, data })
      });
      const result = await response.json();
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      return null;
    }
  };

  const loadDashboard = async () => {
    const result = await dbOperation('read', 'expenses');
    if (result?.data) {
      setExpenses(result.data);
    }
  };

  const handleTabChange = (selectedTab) => {
    // Update the active tab
    setActiveTab(selectedTab);

    // Perform any additional logic (e.g., navigation)
    console.log("Selected Tab:", selectedTab.name);
  };

  const handleSubmitExpense = async (e) => {
    e.preventDefault();
    const formData = {
      amount: e.target.amount.value,
      category: e.target.category.value,
      date: e.target.date.value,
      description: e.target.description.value,
    };
    await dbOperation('create', 'expenses', formData);
    loadDashboard();
    e.target.reset();
  };

  const getChartData = () => {
    const categories = {};
    expenses.forEach(expense => {
      const category = expense.data.category;
      categories[category] = (categories[category] || 0) + parseFloat(expense.data.amount);
    });

    return {
      labels: Object.keys(categories),
      datasets: [{
        data: Object.values(categories),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      }]
    };
  };

  const getBudgetStatus = () => {
    const budgets = {
      'Food': 500, 'Transport': 300, 'Shopping': 400,
      'Bills': 800, 'Entertainment': 200
    };
    const categoryTotals = {};
    expenses.forEach(expense => {
      const category = expense.data.category;
      categoryTotals[category] = (categoryTotals[category] || 0) + parseFloat(expense.data.amount);
    });

    return Object.entries(budgets).map(([category, budget]) => ({
      category,
      spent: categoryTotals[category] || 0,
      budget,
      percentage: Math.min(((categoryTotals[category] || 0) / budget) * 100, 100)
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {loading && (
        <div className="fixed inset-0 bg-white/90 flex items-center justify-center z-50">
          <Loader2 className="animate-spin" />
        </div>
      )}

      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-blue-600">ExpenseTracker Pro</span>
            </div>
            {/* <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="expenses">Expenses</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
              </TabsList>
            </Tabs> */}
            <div>
              <h1 className="text-lg font-semibold mb-4">Active Tab: {activeTab.name}</h1>
              <BaseTab tabs={tabs} onTabChange={handleTabChange} />
            </div>
          </div>
        </div>
      </nav>
      {/* All 3 tabs contents inside div */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* <TabsContent value="dashboard" activeTab={activeTab}> */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle>Spending Overview</CardTitle>
            </CardHeader>
            <CardContent>
              {/* <Doughnut data={getChartData()} /> */}
              <p>This is a content of card.</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Budget Status</CardTitle>
            </CardHeader>
            <CardContent>
              {getBudgetStatus().map((item) => (
                <div key={item.category} className="mb-4">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{item.category}</span>
                    <span>${item.spent.toFixed(2)} / ${item.budget}</span>
                  </div>
                  {/* <Progress value={item.percentage} /> */}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <BaseTable>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.slice(0, 5).map((expense, index) => (
                  <TableRow key={index}>
                    <TableCell>{new Date(expense.data.date).toLocaleDateString()}</TableCell>
                    <TableCell>{expense.data.category}</TableCell>
                    <TableCell>{expense.data.description}</TableCell>
                    <TableCell>${expense.data.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </BaseTable>
          </CardContent>
        </Card>
        {/* </TabsContent> */}
      </div>
    </div>
  );
};

export default ExpenseTracker;