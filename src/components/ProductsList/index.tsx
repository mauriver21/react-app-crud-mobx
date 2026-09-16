import { useProductModel } from '@/models/useProductModel';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';

export const ProductsList: React.FC = observer(() => {
  const productModel = useProductModel();
  const [pagination, setPagination] = useState({ page: 0, size: 10 });

  const { content, pagination: paginationMeta } =
    productModel.selectPaginatedProducts({ pagination });

  useEffect(() => {
    productModel.list({ pagination });
  }, [pagination]);

  const handlePageChange = (_: unknown, newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPagination({ page: 0, size: parseInt(e.target.value, 10) });
  };

  return (
    <Paper sx={{ overflow: 'auto', display: 'grid' }}>
      <Typography variant="h6" sx={{ p: 2 }}>
        Products ({paginationMeta.totalElements})
      </Typography>
      <TableContainer sx={{ overflow: 'auto' }}>
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
      <TablePagination
        component="div"
        count={paginationMeta.totalElements}
        page={pagination.page}
        rowsPerPage={pagination.size}
        rowsPerPageOptions={[5, 10, 25]}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleRowsPerPageChange}
      />
    </Paper>
  );
});
