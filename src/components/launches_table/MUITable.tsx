import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getAllLaunches } from '../../api/spacex';
import TableHeaders from './TableHeaders';
import LaunchRow from './LaunchRow';

const EnhancedTable = () => {
  const { data: launches } = useQuery({
    queryKey: ['launches'],
    queryFn: () => getAllLaunches(),
  });

  const [launchToShowOnModal, setLaunchToShowOnModal] = React.useState<Launch | null>(null);
  console.log('launchToShowOnModal :>> ', launchToShowOnModal);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(() => {
    if (!launches) return [];
    return launches.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [page, rowsPerPage, launches]);

  if (!launches) return null;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - launches.length) : 0;

  return (
    <Container>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <TableHeaders />
            <TableBody>
              {visibleRows.map((launch) => (
                <LaunchRow launch={launch} setLaunchToShowOnModal={setLaunchToShowOnModal} />
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}>
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={launches.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={(event, newPage) => setPage(newPage)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default EnhancedTable;
