import { ChevronDownIcon } from "@heroicons/react/16/solid";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function BaseTab({ tabs, onTabChange }) {
    const handleSelectChange = (event) => {
        const selectedTab = tabs.find((tab) => tab.name === event.target.value);
        if (onTabChange) onTabChange(selectedTab);
    };

    return (
        <div>
            {/* Mobile Dropdown */}
            <div className="grid grid-cols-1 sm:hidden">
                <select
                    defaultValue={tabs.find((tab) => tab.current).name}
                    onChange={handleSelectChange}
                    aria-label="Select a tab"
                    className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-2 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
                >
                    {tabs.map((tab) => (
                        <option key={tab.name}>{tab.name}</option>
                    ))}
                </select>
                <ChevronDownIcon
                    aria-hidden="true"
                    className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end fill-gray-500"
                />
            </div>

            {/* Desktop Tabs */}
            <div className="hidden sm:block">
                <nav aria-label="Tabs" className="flex space-x-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            onClick={() => onTabChange(tab)}
                            aria-current={tab.current ? "page" : undefined}
                            className={classNames(
                                tab.current
                                    ? "bg-gray-100 text-gray-700"
                                    : "text-gray-500 hover:text-gray-700",
                                "rounded-md px-3 py-2 text-sm font-medium"
                            )}
                        >
                            {tab.name}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
    );
}
