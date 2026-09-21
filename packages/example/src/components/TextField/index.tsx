import {
  TextField as MuiTextField,
  type TextFieldProps as MuiTextFieldProps,
} from '@mui/material';
import { type Control, type FieldPath, useController } from 'react-hook-form';

export type TextFieldProps<
  TFieldValues extends Record<string, any> = Record<string, any>,
> = MuiTextFieldProps & {
  control?: Control<TFieldValues>;
  name?: FieldPath<TFieldValues>;
  errorMessage?: string;
  hideErrorMessage?: boolean;
};

export const TextField = <
  TFieldValues extends Record<string, any> = Record<string, any>,
>({
  name,
  control,
  onChange: onChangeProp,
  required,
  slotProps,
  hideErrorMessage,
  ...rest
}: TextFieldProps<TFieldValues>) => {
  const { field, fieldState } = name ? useController({ name, control }) : {};
  const error = fieldState?.invalid;
  const errorMessage = fieldState?.error?.message;
  const { onChange: fieldOnChange, ...restField } = field || {};

  const onChange: TextFieldProps<TFieldValues>['onChange'] = (event) => {
    onChangeProp?.(event);
    fieldOnChange?.(event);
  };

  return (
    <MuiTextField
      {...restField}
      slotProps={{
        inputLabel: { required, ...slotProps?.inputLabel },
        ...slotProps,
      }}
      onChange={onChange}
      fullWidth
      error={error}
      helperText={hideErrorMessage ? undefined : errorMessage}
      {...rest}
    />
  );
};
