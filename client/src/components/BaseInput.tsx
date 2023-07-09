import React from "react";
import { Controller, FieldValues, RegisterOptions } from "react-hook-form";
import { FormGroup, Input, Label } from "reactstrap";

export interface InputProps<TData> {
  type?: string;
  control: any;
  name: keyof TData & string;
  label?: string;
  defaultValue?: any;
  rules?:
    | Omit<
        RegisterOptions<FieldValues, string>,
        "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
      >
    | undefined;
  [key: string]: any;
}

export default function BaseInput<TData = any>({
  name,
  control,
  type = "text",
  label = name,
  defaultValue,
  rules = {},
  ...props
}: InputProps<TData>) {
  return (
    <>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field, fieldState }) => (
          <>
            <FormGroup>
              <Label className="mb-1">{label}</Label>

              <Input
                value={field.value}
                control={control}
                type={type as any}
                name={name}
                placeholder={props?.placeholder || label}
                onChange={field.onChange}
                onBlur={field.onBlur}
                {...props}
              />

              <span className="text-danger">{fieldState.error?.message}</span>
            </FormGroup>
          </>
        )}
      />
    </>
  );
}
