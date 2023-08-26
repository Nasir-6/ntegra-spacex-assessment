import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { getAllLaunches } from '../../api/spacex';

const headers = ['Name', 'Launch Date', 'Rocket ID', 'Details'];

const EnhancedTableHead = () => (
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

const EnhancedTableToolbar = () => (
  <Toolbar
    sx={{
      pl: { sm: 2 },
      pr: { xs: 1, sm: 1 },
    }}>
    <Typography sx={{ flex: '1 1 100%' }} variant="h6" id="tableTitle" component="div">
      SpaceX Launches
    </Typography>
  </Toolbar>
);

const EnhancedTable = () => {
  const { data: launches } = useQuery({
    queryKey: ['launches'],
    queryFn: () => getAllLaunches(),
  });

  const [selected, setSelected] = React.useState<string | null>(null);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleClick = (event: React.MouseEvent<unknown>, name: string) => {
    if (selected === name) setSelected(null);
    else setSelected(name);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name: string) => selected === name;

  // Avoid a layout jump when reaching the last page with empty rows.

  const visibleRows = React.useMemo(() => {
    if (!launches) return [];
    return launches.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  }, [page, rowsPerPage, launches]);
  if (!launches) return null;
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - launches.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead />
            <TableBody>
              {visibleRows.map((launch, index) => {
                const isItemSelected = isSelected(launch.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, launch.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={launch.name}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}>
                    <TableCell component="th" id={labelId} scope="row">
                      {launch.name}
                    </TableCell>
                    <TableCell align="right">{launch.date_local}</TableCell>
                    <TableCell align="right">{launch.rocket}</TableCell>
                    <TableCell align="right">{launch.details}</TableCell>
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
    </Box>
  );
};

export default EnhancedTable;
