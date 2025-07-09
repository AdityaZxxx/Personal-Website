"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface SortFilterProps {
  options: { value: string; label: string; icon?: React.ReactNode }[];
  defaultValue?: string;
  onValueChange: (value: string) => void;
}

export function SortFilter({
  options,
  defaultValue,
  onValueChange,
}: SortFilterProps) {
  return (
    <Select onValueChange={onValueChange} defaultValue={defaultValue ?? ""}>
      <SelectTrigger
        className="w-[180px] text-primary z-20 cursor-pointer"
        aria-label="Sort filter"
      >
        <SelectValue placeholder="Sort By" className="text-primary" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="sr-only" aria-placeholder="Sort">
            Sort by
          </SelectLabel>
          {options
            .filter((option) => option.value !== "")
            .map((option) => (
              <SelectItem
                aria-activedescendant={option.value}
                key={option.value}
                value={option.value}
                className="cursor-pointer"
              >
                {option.icon && <span className="mr-2">{option.icon}</span>}
                {option.label}
              </SelectItem>
            ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
