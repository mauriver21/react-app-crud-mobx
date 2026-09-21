import {
  Select,
  type SelectOption,
  type SelectProps,
} from '@/components/Select';
import { useProductModel } from '@/models/useProductModel';
import { observer } from 'mobx-react';
import { useEffect, useMemo } from 'react';
import type { FieldPath, FieldValues } from 'react-hook-form';

type ProductSelectProps<TFieldValues extends FieldValues = FieldValues> = Omit<
  SelectProps<TFieldValues>,
  'options'
> & {
  name?: FieldPath<TFieldValues>;
  onValueChange?: (value: string) => void;
};

const LIST_PARAMS = {
  pagination: { page: 0, size: 100 },
  queryKey: 'product-select',
};

export const ProductSelect = observer(
  <TFieldValues extends FieldValues = FieldValues>({
    onValueChange,
    onChange,
    ...props
  }: ProductSelectProps<TFieldValues>) => {
    const productModel = useProductModel();

    const { content, listing, autoHeal } =
      productModel.selectPaginatedProducts(LIST_PARAMS);

    useEffect(() => {
      console.log(autoHeal);
      if (autoHeal) productModel.list(LIST_PARAMS);
    }, [autoHeal]);

    const options: SelectOption[] = useMemo(
      () => content.map((p) => ({ value: p.id, label: p.name })),
      [content],
    );

    const handleChange: SelectProps<TFieldValues>['onChange'] = (
      event,
      child,
    ) => {
      onChange?.(event, child);
      onValueChange?.(event.target.value as string);
    };

    return (
      <Select<TFieldValues>
        {...props}
        options={options}
        disabled={props.disabled || listing}
        onChange={handleChange}
      />
    );
  },
);
