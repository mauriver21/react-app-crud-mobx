import React, { useId } from 'react';
import {
  Select as MuiSelect,
  type SelectProps as MuiSelectProps,
  FormControl,
  InputLabel,
  FormHelperText,
  MenuItem,
} from '@mui/material';
import { type Control, type FieldPath, useController } from 'react-hook-form';

export type SelectOption = {
  value: string | number | undefined;
  label: string;
};

export type SelectProps<
  TFieldValues extends Record<string, any> = Record<string, any>,
> = MuiSelectProps & {
  control?: Control<TFieldValues>;
  name?: FieldPath<TFieldValues>;
  label?: string;
  options?: SelectOption[];
  helperText?: React.ReactNode;
  errorMessage?: string;
  hideErrorMessage?: boolean;
};

export const Select = <
  TFieldValues extends Record<string, any> = Record<string, any>,
>({
  name,
  control,
  label,
  options = [],
  error: errorProp,
  errorMessage: errorMessageProp,
  helperText,
  hideErrorMessage,
  required,
  children,
  onChange: onChangeProp,
  ...rest
}: SelectProps<TFieldValues>) => {
  const { field, fieldState } = name ? useController({ name, control }) : {};
  const error = fieldState?.invalid || errorProp;
  const errorMessage = fieldState?.error?.message || errorMessageProp;
  const {
    onChange: fieldOnChange,
    name: fieldName,
    value: fieldValue,
    ...restField
  } = field || {};
  const labelId = label ? `select-label-${fieldName || useId()}` : undefined;
  const activeHelperText = error ? errorMessage : helperText;

  const rawValue = fieldValue !== undefined ? fieldValue : rest.value;
  const value = rawValue === null || rawValue === undefined ? '' : rawValue;

  const onChange: SelectProps<TFieldValues>['onChange'] = (event, child) => {
    onChangeProp?.(event, child);
    fieldOnChange?.(event);
  };

  return (
    <FormControl fullWidth error={error} size={rest.size}>
      {label && (
        <InputLabel required={required} id={labelId}>
          {label}
        </InputLabel>
      )}
      <MuiSelect
        {...restField}
        value={value}
        name={fieldName}
        onChange={onChange}
        labelId={labelId}
        label={label}
        {...rest}
      >
        {children
          ? children
          : options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
      </MuiSelect>
      {!hideErrorMessage && activeHelperText && (
        <FormHelperText>{activeHelperText}</FormHelperText>
      )}
    </FormControl>
  );
};
