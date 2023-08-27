import { TableCell, TableHead, TableRow } from '@mui/material';
import React from 'react';

type Props = {
  tableColumns: {
    header: string;
    key: string;
  }[];
};

const TableHeaders = ({ tableColumns }: Props) => (
  <TableHead>
    <TableRow>
      {tableColumns.map((column) => (
        <TableCell key={column.header} align="left" padding="normal">
          {column.header}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

export default TableHeaders;
