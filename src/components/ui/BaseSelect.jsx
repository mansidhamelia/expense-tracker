
import { useState } from "react";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";

export default function SelectMenu({
  label,
  options = [],
  selectedOption,
  onChange,
  optionKey = "id",
  optionLabel = "name",
  placeholder = "Select an option",
}) {
  const [selected, setSelected] = useState(selectedOption || options[0]);

  const handleChange = (value) => {
    setSelected(value);
    if (onChange) onChange(value);
  };

  return (
    <Listbox value={selected} onChange={handleChange}>
      {label && (
        <Label className="block text-sm font-medium text-gray-900">
          {label}
        </Label>
      )}
      <div className="relative mt-2">
        <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-gray-50 py-1.5 pl-3 pr-2 text-left text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm">
          <span className="col-start-1 row-start-1 truncate pr-6">
            {selected ? selected[optionLabel] : placeholder}
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          transition
          className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm"
        >
          {options.map((option) => (
            <ListboxOption
              key={option[optionKey]}
              value={option}
              className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white data-[focus]:outline-none"
            >
              <span className="block truncate font-normal group-data-[selected]:font-semibold">
                {option[optionLabel]}
              </span>
              <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-indigo-600 group-[&:not([data-selected])]:hidden group-data-[focus]:text-white">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
}
