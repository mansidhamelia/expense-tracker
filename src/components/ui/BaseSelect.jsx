import React from "react";
import { Listbox } from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/20/solid";
import { CheckIcon } from "@heroicons/react/20/solid";

const BaseSelect = ({ label, options, selected, onChange }) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-900">{label}</label>
      )}
      <Listbox value={selected} onChange={onChange}>
        <div className="relative mt-2">
          <Listbox.Button className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm">
            <span className="col-start-1 row-start-1 truncate pr-6">{selected.name}</span>
            <ChevronUpDownIcon
              aria-hidden="true"
              className="col-start-1 row-start-1 h-5 w-5 self-center justify-self-end text-gray-500"
            />
          </Listbox.Button>
          <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {options.map((option) => (
              <Listbox.Option
                key={option.id}
                value={option}
                className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
              >
                <span className="block truncate font-normal group-data-[selected]:font-semibold">
                  {option.name}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                  <CheckIcon aria-hidden="true" className="h-5 w-5" />
                </span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </div>
      </Listbox>
    </div>
  );
};

export default BaseSelect;
