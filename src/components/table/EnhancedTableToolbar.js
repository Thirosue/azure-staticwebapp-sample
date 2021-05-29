import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: theme.palette.secondary.main,
        backgroundColor: lighten(theme.palette.secondary.light, 0.85),
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  title: {
    flex: '1 1 100%',
  },
  actionArea: {
    marginRight: '1rem'
  },
  button: {
    margin: theme.spacing(1),
    textTransform: 'none',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useStyles();
  const { header, selected, addItems, deleteItems } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: selected.length > 0,
      })}
    >
      {selected.length > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {selected.length} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          {header}
        </Typography>
      )}

      {selected.length > 0 && (
        <Tooltip title="Delete">
          <IconButton onClick={() => deleteItems(selected)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      )}
      {selected.length === 0 && addItems && (
        <Tooltip title="Add">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            startIcon={<AddIcon />}
            onClick={addItems}
          >
            Add
          </Button>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  header: PropTypes.string.isRequired,
  selected: PropTypes.array.isRequired,
  addItems: PropTypes.func.isRequired,
  deleteItems: PropTypes.func.isRequired,
};

export default EnhancedTableToolbar;