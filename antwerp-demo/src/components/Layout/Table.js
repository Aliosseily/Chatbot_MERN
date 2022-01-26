import React, { Fragment, useState } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TablePagination,
  TableCell,
  styled,
  TableRow,
  IconButton,
} from "@mui/material";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const TableWrapper = (props) => {
  const {
    tableHeaders,
    tableBody,
    onRowClicked,
    showActionIcons,
    onDeleteHandler,
  } = props;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
      cursor: "pointer",
    },
    "&:nth-of-type(even)": {
      cursor: "pointer",
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  return (
    <Fragment>
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {tableHeaders.map((header) => (
                  <TableCell key={header.id}>{header.label}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {tableBody
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <StyledTableRow
                      hover
                      key={row._id}
                      onClick={() => {
                        onRowClicked(row._id);
                      }}
                    >
                      {tableHeaders.map((header) => {
                        const value = row[header.id];
                        return <TableCell key={header.id}>{value}</TableCell>;
                      })}
                      {showActionIcons && (
                        <TableCell>
                          <span style={{ display: "flex", gap: "10px" }}>
                            <IconButton
                              color="error"
                              onClick={() => {onDeleteHandler(row._id)}}
                            >
                              <DeleteForeverOutlinedIcon />
                            </IconButton>
                          </span>
                        </TableCell>
                      )}
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={tableBody.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Fragment>
  );
};

export default TableWrapper;
