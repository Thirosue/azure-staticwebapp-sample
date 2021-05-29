/* eslint-disable */
import React from 'react';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import { head } from 'lodash';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  IconButton,
} from '@material-ui/core';
import {
  Add as AddIcon,
} from '@material-ui/icons';

import {
  ButtonFooter,
  CardContent,
  TablePaginationActions,
  EnhancedTableToolbar,
  EnhancedTableHead,
} from '../components';

const useStyles = makeStyles((theme) => ({
  pageTitle: {
    flexGrow: 1,
    marginBottom: '0.25rem'
  },
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  control: {
    padding: theme.spacing(2),
  },
  actionArea: {
    marginRight: '1rem'
  },
  button: {
    margin: theme.spacing(1),
    textTransform: 'none',
  },
  table: {
    minWidth: 750,
  },
}));

const headCells = [
  { id: 'items', numeric: false, disablePadding: true, label: 'Items' },
  { id: 'description', numeric: false, disablePadding: true, label: 'Description' },
  { id: 'quantity', numeric: true, disablePadding: false, label: 'Quantity' },
];

function ProductList({
  addNewProduct,
  handleDeleteProduct,
  handleSelectProduct,
  products,
  history,
}) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('items');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleRequestSort = (_, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = products.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  function selectProduct(id) {
    const product = getSelectedProduct(id);
    handleSelectProduct(product);
    history.push(`/products/${id}`);
  }

  function deleteProduct(e) {
    console.log('delete target: ', e)
    // const product = getSelectedProduct(e);
    // handleDeleteProduct(product);
  }

  function getSelectedProduct(id) {
    return head(products.filter(product => product.id === id));
  }

  const handleClick = (_, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, products.length - page * rowsPerPage);

  return (
    <div>
      {products.length === 0 && <div>Loading data ...</div>}

      <div className={classes.root}>
        <Paper className={classes.paper}>
          <EnhancedTableToolbar
            header={'Products'}
            selected={selected}
            addItems={addNewProduct}
            deleteItems={deleteProduct}
          />
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="custom pagination table">
              <EnhancedTableHead
                classes={classes}
                headCells={headCells}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={products.length}
              />
              <TableBody>
                {products.map((row, index) => {
                  const isItemSelected = isSelected(row.id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell style={{ width: 60 }} onClick={(event) => handleClick(event, row.id)} padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell onClick={() => selectProduct(row.id)} padding="none">
                        {row.name}
                      </TableCell>
                      <TableCell onClick={() => selectProduct(row.id)} padding="none">{row.description}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                    </TableRow>
                  );
                })}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 50, 100, { label: 'All', value: -1 }]}
                    colSpan={3}
                    count={products.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    SelectProps={{
                      inputProps: { 'aria-label': 'rows per page' },
                      native: true,
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    ActionsComponent={TablePaginationActions}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        </Paper>
      </div>
    </div>
  );
}

export default withRouter(ProductList);
