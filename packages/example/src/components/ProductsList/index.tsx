import { useProductModel } from '@/models/useProductModel';
import { ProductSelect } from '@/components/ProductSelect';
import {
  Button,
  CircularProgress,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ProductsList: React.FC = observer(() => {
  const navigate = useNavigate();
  const productModel = useProductModel();
  const [pagination, setPagination] = useState({ page: 0, size: 10 });
  const [removingId, setRemovingId] = useState<string | undefined>();
  const [selectedProductId, setSelectedProductId] = useState<string>('');

  const listParams = { pagination, queryKey: 'products-table' };

  const { content, pagination: paginationMeta, autoHeal } =
    productModel.selectPaginatedProducts(listParams);

  useEffect(() => {
    if (autoHeal) productModel.list(listParams);
  }, [pagination, autoHeal]);

  const handlePageChange = (_: unknown, newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  const handleRowsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPagination({ page: 0, size: parseInt(e.target.value, 10) });
  };

  const handleRemove = async (id: string | undefined) => {
    try {
      setRemovingId(id);
      await productModel.remove(id);
    } finally {
      setRemovingId(undefined);
    }
  };

  return (
    <Paper sx={{ overflow: 'auto', display: 'grid' }}>
      <Stack
        sx={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
        }}
      >
        <Typography variant="h6">
          Products ({paginationMeta.totalElements})
        </Typography>
        <Stack sx={{ flexDirection: 'row', gap: 2, alignItems: 'center' }}>
          <ProductSelect
            value={selectedProductId}
            onValueChange={setSelectedProductId}
            label="Filter by product"
          />
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate('/products/create')}
            sx={{ whiteSpace: 'nowrap' }}
          >
            New product
          </Button>
        </Stack>
      </Stack>
      <TableContainer sx={{ overflow: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell width={96} />
            </TableRow>
          </TableHead>
          <TableBody>
            {content.map((product) => (
              <TableRow key={product.id} hover>
                <TableCell>{product.name}</TableCell>
                <TableCell align="right">${product.price.toFixed(2)}</TableCell>
                <TableCell align="right" padding="none" sx={{ pr: 1 }}>
                  <Stack
                    sx={{ flexDirection: 'row', justifyContent: 'flex-end' }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => navigate(`/products/${product.id}/edit`)}
                    >
                      <PencilSquareIcon style={{ width: 18, height: 18 }} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      disabled={removingId === product.id}
                      onClick={() => handleRemove(product.id)}
                    >
                      {removingId === product.id ? (
                        <CircularProgress size={18} color="error" />
                      ) : (
                        <TrashIcon style={{ width: 18, height: 18 }} />
                      )}
                    </IconButton>
                  </Stack>
                </TableCell>
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
