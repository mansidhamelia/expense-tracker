
const BaseCard = ({ children, className = "" }) => {
    // <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
    //     <div className="px-4 py-5 sm:px-6">
    //         {header}
    //         {/* We use less vertical padding on card headers on desktop than on body sections */}

    //     </div>
    //     <div className="px-4 py-5 sm:p-6">{children}</div>
    // </div>

    return (
        <div className={`divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow ${className}`}>
            {children}
        </div>
    );
};

// Card Header
export const CardHeader = ({ children }) => {
    return <div className="px-4 py-5 sm:px-6">{children}</div>;
};

// Card Title
export const CardTitle = ({ children }) => {
    return <h2 className="text-lg font-semibold text-gray-800">{children}</h2>;
};

// Card Content
export const CardContent = ({ children }) => {
    return <div className="px-4 py-5 sm:p-6">{children}</div>;
};

export default BaseCard;