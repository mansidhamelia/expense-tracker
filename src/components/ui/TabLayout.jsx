
import { Outlet } from "react-router-dom";
import BaseTab from "./BaseTab";

const tabs = [
    { name: "Dashboard", path: "/dashboard", value: "dashboard" },
    { name: "Expenses", path: "/expenses", value: "expenses" },
    { name: "Report", path: "/report", value: "report" },
];

const TabLayout = () => {
    return (
        <div className="">
            <BaseTab tabs={tabs} />
            <div className=" max-w-7xl mx-auto px-4 py-6">
                <Outlet /> {/* Renders the current route's component */}
            </div>
        </div>
    );
};

export default TabLayout;
