import React from 'react';

const TableHeaders = () => {
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

export default TableHeaders;
