import { useProductModel } from '@/models/useProductModel';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

export const ProductsList: React.FC = observer(() => {
  const productModel = useProductModel();
  const { content, pagination } = productModel.selectPaginatedProducts({
    pagination: { page: 0, size: 10 },
  });

  useEffect(() => {
    productModel.list({ pagination: { page: 0, size: 10 } });
  }, []);

  return (
    <code>
      <pre>{JSON.stringify(content, null, 2)}</pre>
      <pre>{JSON.stringify(pagination, null, 2)}</pre>
    </code>
  );
});
