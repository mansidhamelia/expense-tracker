
const BaseTable = ({ children, className = "" }) => {  // Table Wrapper
    return (
        <table className={`min-w-full divide-y divide-gray-300 ${className}`}>
            {children}
        </table>
    );
};

// Table Header Wrapper
export const TableHeader = ({ children }) => {
    return <thead className="bg-gray-50">{children}</thead>;
};

// Table Row Wrapper
export const TableRow = ({ children }) => {
    return <tr>{children}</tr>;
};

// Table Head (Header Cell)
export const TableHead = ({ children }) => {
    return (
        <th
            scope="col"
            className="py-3.5 px-3 text-left text-sm font-semibold text-gray-900"
        >
            {children}
        </th>
    );
};

// Table Body Wrapper
export const TableBody = ({ children }) => {
    return <tbody className="divide-y divide-gray-200 bg-white">{children}</tbody>;
};

// Table Cell
export const TableCell = ({ children, className = "" }) => {
    return (
        <td
            className={`whitespace-nowrap px-3 py-4 text-sm text-gray-500 ${className}`}
        >
            {children}
        </td>
    );
};

export default BaseTable;
