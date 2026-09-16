import { useProductModel } from '@/models/useProductModel';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
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
    <TableContainer component={Paper}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Products ({pagination.totalElements})
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {content.map((product) => (
            <TableRow key={product.id} hover>
              <TableCell>{product.name}</TableCell>
              <TableCell align="right">${product.price.toFixed(2)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
});
