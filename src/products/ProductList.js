import React from 'react';
import { withRouter } from 'react-router';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  Typography,
} from '@material-ui/core';
import {
  Add as AddIcon,
} from '@material-ui/icons';

import { ButtonFooter, CardContent } from '../components';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom: '0.25rem'
  },
  paper: {
    height: 140,
    width: 100,
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
}));

function ProductList({
  addNewProduct,
  handleDeleteProduct,
  handleSelectProduct,
  products,
  history,
}) {
  const classes = useStyles();

  function selectProduct(e) {
    const product = getSelectedProduct(e);
    handleSelectProduct(product);
    history.push(`/products/${product.id}`);
  }

  function deleteProduct(e) {
    const product = getSelectedProduct(e);
    handleDeleteProduct(product);
  }

  function getSelectedProduct(e) {
    const index = +e.currentTarget.dataset.index;
    return products[index];
  }

  return (
    <div>
      <Grid container className={classes.root} spacing={2}>
        <Grid item xs={11}>
          <Typography variant="h5">
            Products
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <span className={classes.actionArea}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              startIcon={<AddIcon />}
              onClick={addNewProduct}
            >
              Add
            </Button>
          </span>
        </Grid>
      </Grid>
      {products.length === 0 && <div>Loading data ...</div>}
      <ul className="list">
        {products.map((product, index) => (
          <li key={product.id} role="presentation">
            <div className="card">
              <CardContent
                name={product.name}
                description={product.description}
              />
              <footer className="card-footer">
                <ButtonFooter
                  className="delete-item"
                  iconClasses="fas fa-trash"
                  onClick={deleteProduct}
                  label="Delete"
                  dataIndex={index}
                  dataId={product.id}
                />
                <ButtonFooter
                  className="edit-item"
                  iconClasses="fas fa-edit"
                  onClick={selectProduct}
                  label="Edit"
                  dataIndex={index}
                  dataId={product.id}
                />
              </footer>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default withRouter(ProductList);
