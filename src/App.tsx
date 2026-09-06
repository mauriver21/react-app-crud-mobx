import { useProductModel } from '@/models/useProductModel';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

export const App = observer(() => {
  const productModel = useProductModel();
  const { products } = productModel.store;

  useEffect(() => {
    productModel.list();
  }, []);

  return (
    <div>
      <pre>
        <code>{JSON.stringify(products, null, 2)}</code>
      </pre>
    </div>
  );
});
