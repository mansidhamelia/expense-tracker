const Expense = () => {

    return (
        <div>
     <div className="max-w-7xl mx-auto px-4 py-6">
        <TabsContent value="dashboard" activeTab={activeTab}>
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
        </TabsContent>

        <TabsContent value="expenses">
          <Card>
            <CardHeader>
              <CardTitle>Add New Expense</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitExpense} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input type="number" id="amount" placeholder="Amount" required />
                  </div>
                  <div>
                    {/* <Select id="category" required>
                      {['Food', 'Transport', 'Shopping', 'Bills', 'Entertainment'].map(category => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </Select> */}

                    <BaseSelect
                      label="Category"
                      options={categories}
                      selected={selectedCategory}
                      onChange={selectedCategory}
                    />
                    <p className="mt-4 text-sm text-gray-700">
                      Selected: <strong>{selectedCategory.name}</strong>
                    </p>
                  </div>
                  <div>
                    <Input type="date" id="date" required />
                  </div>
                  <div>
                    <Input type="text" id="description" placeholder="Description" required />
                  </div>
                </div>
                <Button type="submit">Add Expense</Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Spending Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                {/* <Select value={timePeriod} onValueChange={setTimePeriod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select time period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="yearly">Yearly</SelectItem>
                  </SelectContent>
                </Select> */}
                <div className="mt-4">
                  <Bar data={getChartData()} />
                </div>
              </CardContent>
            </Card>

            {/* <Card>
              <CardHeader>
                <CardTitle>Spending Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <Alert>
                  <AlertDescription>
                    Your spending insights will appear here
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card> */}
          </div>
        </TabsContent>
      </div>
        </div>
    )
}

export default Expense;