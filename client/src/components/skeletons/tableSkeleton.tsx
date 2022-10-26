/* eslint-disable react/jsx-closing-tag-location */
import Skeleton from '@mui/material/Skeleton';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

const cells = Array(7).fill(<TableCell align="center">
  <Skeleton
    variant="rounded"
    sx={{ backgroundColor: '#f1f3f5', padding: '1rem 0.5rem' }}
    width={130}
    height={20}
    animation="wave"
  />
</TableCell>);

function TableSkeleton() {
  return (
    <TableRow>
      <TableCell align="center">
        <Skeleton variant="circular" sx={{ backgroundColor: '#f1f3f5' }} width={20} height={20} animation="wave" />
      </TableCell>
      {cells}
    </TableRow>
  );
}

export default TableSkeleton;
