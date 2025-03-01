import Card, { CardHeader, CardTitle, CardContent } from "../components/ui/BaseCard";
import InputGroup from "../components/ui/BaseInputGroup";
import { useState, useEffect } from "react";
import Button from "../components/ui/BaseButton"
import SelectMenu from "../components/ui/BaseSelect";


const categories = [
  { id: "food", name: "Food" },
  { id: "transport", name: "Transport" },
  { id: "shopping", name: "Shopping" },
];

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();

  };
  return (

    <div className="max-w-7xl mx-auto px-4 py-6">
      <Card>
        <CardHeader>
          <CardTitle>Add New Expense</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleExpenseSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <InputGroup
                  id="amount"
                  type="number"
                  name="amount"
                  label="Amount"
                  placeholder="101"
                  required
                />
              </div>
              {/* <SelectMenu label="Expense Category" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(budgets).map(category => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectMenu> */}
              <InputGroup
                type="date"
                name="date"
                label="Date"
                required
              />
              <SelectMenu label="Expense Category"
                options={categories}
                selectedOption={selectedCategory}
                // onChange={handleCategoryChange}
                placeholder="Select a category" />

              <InputGroup
                type="text"
                name="description"
                label="Description"
                placeholder="Description"
                required
              />
            </div>
            <Button type="submit">Add Expense</Button>
          </form>
        </CardContent>
      </Card>

    </div>

  )
}

export default Expense;