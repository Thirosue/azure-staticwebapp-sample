import React from 'react';
import { withRouter } from 'react-router';
import { useForm } from 'react-hook-form';
import querystring from 'querystring';
import { head } from 'lodash';
import {
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TablePagination,
  TableRow,
  Paper,
  Checkbox,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
} from '@material-ui/core';
import {
  Search as SearchIcon
} from '@material-ui/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  CustomTextField,
  TablePaginationActions,
  EnhancedTableToolbar,
  EnhancedTableHead,
  Progress,
  ListNotFound,
} from '../components';
import ProductListHeader from './ProductListHeader';
import {
  useUnmountRef,
  useSafeState,
} from '../hooks';
import Const from '../const';

const captains = console;

const useStyles = makeStyles((theme) => ({
  headerRoot: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  headerTitle: {
    flex: '1 1 100%',
  },
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

const schema = yup.object().shape({
  name: yup.string(),
  description: yup.string(),
});

const headCells = [
  { id: 'name', numeric: false, disablePadding: true, label: 'Name' },
  { id: 'description', numeric: false, disablePadding: true, label: 'Description' },
  { id: 'quantity', numeric: true, sortDisable: true, disablePadding: false, label: 'Quantity' },
];

const parseQuery = (history) => {
  const { search } = history.location;
  const index = search.lastIndexOf('?');
  if (index < 0) {
    return {
      name: '',
      description: '',
      page: 0,
      rows: Const.defaultPageSize,
    };
  } else {
    const searchParam = search.substring(index + 1);
    return querystring.parse(searchParam);
  }
};

function ProductList({
  addNewProduct,
  searchProduct,
  handleDeleteProduct,
  handleSelectProduct,
  history,
}) {
  const classes = useStyles();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const unmountRef = useUnmountRef();
  const [mounted, setMounted] = React.useState(false);
  const [searched, setSearched] = useSafeState(unmountRef, false);
  const [form, setForm] = React.useState({});
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [rows, setRows] = useSafeState(unmountRef, []);
  const [count, setCount] = useSafeState(unmountRef, 0);  // Total Count
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(Const.defaultPageSize);

  React.useEffect(() => {
    captains.log(history.location.search);
    const query = parseQuery(history);
    const { name, description, page, rows, order, orderBy } = query;
    setForm({
      name,
      description,
    });
    setPage(parseInt(page) ? parseInt(page) : 0);
    setRowsPerPage(parseInt(rows) ? parseInt(rows) : Const.defaultPageSize);
    setOrder(order ? order : 'asc');
    setOrderBy(orderBy ? orderBy : 'name');
    setMounted(true);

    const search = async () => {
      captains.log('do search... ', query);
      const results = await searchProduct(query);
      setCount(results.count);
      setRows(results.data);
      setSearched(true);
    }

    if (history.location.search) {
      search();
    }
  }, [history.location.search]);

  const pushState = (query) =>
    history.push(`/products?${querystring.stringify(query)}`);

  const handlePageChange = async (_, newPage) => {
    const query = parseQuery(history);
    pushState({ ...query, page: newPage });
  };

  const handleRowsPerPageChange = (event) => {
    const query = parseQuery(history);
    const rowsPerPage = parseInt(event.target.value);
    pushState({ ...query, page: 0, rows: rowsPerPage });
  };

  const handleRequestSort = (_, property) => {
    const query = parseQuery(history);
    const isAsc = orderBy === property && order === 'asc';
    pushState({ ...query, page: 0, order: isAsc ? 'desc' : 'asc', orderBy: property });
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const selectProduct = (id) => {
    const query = parseQuery(history);
    const product = getSelectedProduct(id);
    handleSelectProduct(product);
    history.push(`/products/${id}`, { redirect: `/products?${querystring.stringify(query)}` });
  }

  const deleteProduct = async () => {
    const query = parseQuery(history);
    const product = getSelectedProduct(head(selected));
    await handleDeleteProduct(product, `/products?${querystring.stringify(query)}`);
  }

  const getSelectedProduct = (id) => head(rows.filter(product => product.id === id));

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

  const search = (data) => {
    pushState({ ...data, page: 0, rows: rowsPerPage });
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;
  const emptyRows = rowsPerPage - rows.length;

  return (<>
    {!mounted ? <Progress processing={true} /> :
      <div>
        <div className={classes.root}>
          <ProductListHeader
            title={'商品一覧'}
            addNewProduct={addNewProduct}
          />
          <form
            autoComplete="off"
            noValidate
          >
            <Card>
              <CardContent>
                <Grid
                  container
                  spacing={2}
                >
                  <Grid item xs={6} md={6}>
                    <CustomTextField
                      id="name"
                      name="name"
                      label="商品名"
                      defaultValue={form.name}
                      fullWidth
                      variant="outlined"
                      control={control}
                    />
                  </Grid>
                  <Grid item xs={6} md={6}>
                    <CustomTextField
                      id="description"
                      name="description"
                      label="商品説明"
                      defaultValue={form.description}
                      fullWidth
                      variant="outlined"
                      control={control}
                    />
                  </Grid>
                </Grid>
              </CardContent>
              <Box
                display="flex"
                justifyContent="flex-end"
                p={2}
              >
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  startIcon={<SearchIcon />}
                  onClick={handleSubmit(search)}
                >
                  Search
                </Button>
              </Box>
            </Card>
          </form>
          {/* No Results */}
          {searched && 0 === rows.length && <ListNotFound />}
          {/* else */}
          {searched && 0 < rows.length &&
            <>
              <Box mb='1rem' />
              <Paper className={classes.paper}>
                <EnhancedTableToolbar
                  header={'検索結果一覧'}
                  selected={selected}
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
                      rowCount={rows.length}
                    />
                    <TableBody>
                      {rows.map((row, index) => {
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
                            <TableCell style={{ width: 250 }} onClick={() => selectProduct(row.id)} padding="none">
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
                          rowsPerPageOptions={[5, 10, 50, { label: 'All', value: -1 }]}
                          count={count}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            inputProps: { 'aria-label': 'Rows per page' },
                            native: true,
                          }}
                          onPageChange={handlePageChange}
                          onRowsPerPageChange={handleRowsPerPageChange}
                          ActionsComponent={TablePaginationActions}
                        />
                      </TableRow>
                    </TableFooter>
                  </Table>
                </TableContainer>
              </Paper>
            </>
          }
        </div>
      </div>
    }
  </>);
}

export default withRouter(ProductList);
