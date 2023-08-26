import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { Container } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { getAllLaunches } from '../../api/spacex';

const Headers = () => {
  const headers = ['Name', 'Launch Date', 'Rocket ID', 'Details'];
  return (
    <TableHead>
      <TableRow>
        {headers.map((header) => (
          <TableCell key={header} align="left" padding="normal">
            {header}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

const EnhancedTable = () => {
  const { data: launches } = useQuery({
    queryKey: ['launches'],
    queryFn: () => getAllLaunches(),
  });

  const [launchToShowOnModal, setLaunchToShowOnModal] = React.useState<Launch | null>(null);
  console.log('launchToShowOnModal :>> ', launchToShowOnModal);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.

  const visibleRows = React.useMemo(() => {
    if (!launches) return [];
    return launches.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [page, rowsPerPage, launches]);
  if (!launches) return null;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - launches.length) : 0;

  return (
    <Container>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
          SpaceX Launches
        </Typography>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <Headers />
            <TableBody>
              {visibleRows.map((launch, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow hover onClick={() => setLaunchToShowOnModal(launch)} tabIndex={-1} key={launch.name} sx={{ cursor: 'pointer' }}>
                    <TableCell component="th" id={labelId} scope="row">
                      {launch.name}
                    </TableCell>
                    <TableCell align="left">{launch.date_local}</TableCell>
                    <TableCell align="left">{launch.rocket}</TableCell>
                    <TableCell
                      style={{
                        whiteSpace: 'nowrap',
                        textOverflow: 'ellipsis',
                        width: '500px',
                        display: 'block',
                        overflow: 'hidden',
                      }}
                      align="left">
                      {launch.details ? launch.details : 'N/A'}
                    </TableCell>
                  </TableRow>
                );
              })}
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
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Container>
  );
};

export default EnhancedTable;
