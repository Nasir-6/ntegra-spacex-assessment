import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Outlet } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getAllLaunches } from '../../api/spacex';
import TableHeaders from './table_headers/TableHeaders';
import LaunchRow from './launch_row/LaunchRow';

const LaunchesTable = () => {
  const { data: launches } = useQuery({
    queryKey: ['launches'],
    queryFn: () => getAllLaunches(),
  });

  // console.log('launches', launches);

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

  // TODO: Add loading/empty/Error state - Bear in mind useMemo should come before - so num of hooks is consistent!
  if (!launches) return null;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - launches.length) : 0;

  return (
    <div className="App">
      <Typography variant="h1">SpaceX Landing Page</Typography>
      <Container>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} size="medium">
              <TableHeaders />
              <TableBody>
                {visibleRows.map((launch) => (
                  <LaunchRow launch={launch} key={launch.id} />
                ))}
                {emptyRows > 0 && (
                  <TableRow
                    data-testid="empty-rows"
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
            data-testid="pagination"
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
      <Outlet />
    </div>
  );
};

export default LaunchesTable;
