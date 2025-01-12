import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { ArrowUpIcon } from '@radix-ui/react-icons';
import { Line, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

export default function ExpenseTracker() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ amount: '', category: '', date: '' });

  const chartData = {
    labels: ['Food', 'Transport', 'Utilities', 'Entertainment'],
    datasets: [{
      data: [300, 200, 150, 100],
      backgroundColor: ['#3B82F6', '#34D399', '#F87171', '#FBBF24']
    }]
  };

  const trendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Monthly Expenses',
      data: [1500, 1800, 2000, 1600, 2200, 2450],
      borderColor: '#3B82F6',
      tension: 0.4
    }]
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setExpenses([{
      ...form,
      status: 'Completed',
      id: Date.now()
    }, ...expenses]);
    setIsModalOpen(false);
    setForm({ amount: '', category: '', date: '' });
  };

  return (
    <div className="bg-gray-50 min-h-screen font-[Inter]">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-800">ExpenseWise</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button onClick={() => setIsModalOpen(true)}>Add Expense</Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-500">Total Expenses</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">$2,450.00</p>
              <div className="mt-2 flex items-center text-sm">
                <span className="text-red-500 flex items-center">
                  <ArrowUpIcon /> 12%
                </span>
                <span className="text-gray-500 ml-2">from last month</span>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-500">Budget Status</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">75%</p>
              <Progress value={75} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-medium text-gray-500">Savings Goal</h3>
              <p className="text-2xl font-bold text-gray-900 mt-1">$500.00</p>
              <div className="mt-2 text-sm text-green-600">On track</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <Doughnut data={chartData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <Line data={trendData} />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.category}</TableCell>
                    <TableCell>${expense.amount}</TableCell>
                    <TableCell>{new Date(expense.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {expense.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Expense</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormField>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  required
                />
              </FormControl>
            </FormField>

            <FormField>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={(value) => setForm({ ...form, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                  <SelectItem value="entertainment">Entertainment</SelectItem>
                </SelectContent>
              </Select>
            </FormField>

            <FormField>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  value={form.date}
                  onChange={(e) => setForm({ ...form, date: e.target.value })}
                  required
                />
              </FormControl>
            </FormField>

            <div className="flex justify-end gap-4">
              <Button variant="outline" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Add Expense</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}