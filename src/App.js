import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ExpenseTracker from './components/exported_react (1)'
import Dashboard from './pages/Dashboard'
import TabLayout from "./components/ui/TabLayout"
import Expenses from "./pages/Expenses"
import Report from "./pages/Report"

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     {/* <ExpenseTracker/> */}
    //     <Dashboard />
    //   </header>
    // </div>
    <Router>
      <Routes>
        {/* TabLayout wraps all tab-related routes */}
        <Route path="/" element={<TabLayout />}>
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="report" element={<Report />} />
        </Route>

        {/* Fallback route */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
