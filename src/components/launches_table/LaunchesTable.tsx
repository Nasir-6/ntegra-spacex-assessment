import React, { useMemo, useState } from 'react';
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
import Loader from '../../Loader';

const LaunchesTable = () => {
  const { data: launches, isLoading } = useQuery({
    queryKey: ['launches'],
    queryFn: () => getAllLaunches(),
  });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = useMemo(() => {
    if (!launches) return [];
    return launches.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [page, rowsPerPage, launches]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = launches && page > 0 ? Math.max(0, (1 + page) * rowsPerPage - launches.length) : 0;

  return (
    <div className="App">
      <Loader isLoading={isLoading} />
      {launches && (
        <Container>
          <Typography variant="h2" component="h1" fontWeight="medium" padding={2}>
            SpaceX Launches
          </Typography>
          <Paper sx={{ width: '100%', mb: 2, backdropFilter: 'blur(30px)', backgroundColor: 'rgba(0,0,30,0.5)' }}>
            <TableContainer>
              <Table sx={{ minWidth: 750 }} size="medium" data-testid="rockets-table">
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
      )}
      <Outlet />
    </div>
  );
};

export default LaunchesTable;
