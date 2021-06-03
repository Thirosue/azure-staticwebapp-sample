import React from 'react';
import {
  makeStyles,
  Button,
  Toolbar,
  Typography,
  Tooltip
} from '@material-ui/core';
import {
  Add as AddIcon
} from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  title: {
    flex: '1 1 100%',
  },
  button: {
    margin: theme.spacing(1),
    textTransform: 'none',
  },
}));

const ProductListHeader = ({ title, addNewProduct }) => {
  const classes = useStyles();

  return (
    <Toolbar
      className={classes.root}
    >
      <Typography className={classes.title} variant="h5" id="tableTitle" component="div">
        {title}
      </Typography>
      <Tooltip title="Add">
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<AddIcon />}
          onClick={addNewProduct}
        >
          Add
        </Button>
      </Tooltip>
    </Toolbar>
  );
}

export default ProductListHeader;
