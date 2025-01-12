import Card, { CardHeader, CardTitle, CardContent } from "../components/ui/BaseCard";
import BaseTable, { TableHeader, TableRow, TableHead, TableBody, TableCell } from "../components/ui/BaseTable";

const Dashboard = () => {
  const [expenses, setExpenses] = useState([]);

    return (
        <div>

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

        </div>
    )
}

export default Dashboard;