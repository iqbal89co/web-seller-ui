import React from "react";
import ReactSelect, { Props } from "react-select";

interface AutocompleteProps extends Props {}

export default function Autocomplete({ ...restProps }: AutocompleteProps) {
  return (
    <ReactSelect
      {...restProps}
      classNames={{
        control: (state) =>
          "!bg-transparent !border-accent !rounded-md !p-[1px]",
        menuList: (state) => "bg-primary-foreground",
        option: (state) =>
          state.isFocused ? "!bg-accent" : "hover:!bg-primary-foreground",
        singleValue: (state) => "!text-foreground",
        input: (state) =>
          "!caret-foreground !text-foreground hover:cursor-text",
      }}
    />
  );
}
