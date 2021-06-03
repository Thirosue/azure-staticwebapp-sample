import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles,
  Button,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { Submit } from '../components';

const captains = console;

const useStyles = makeStyles(() => ({
  root: {},
  button: {
    textTransform: 'none',
  },
  actionArea: {
    marginRight: '1em'
  }
}));

function ProductDetail({
  product,
  handleCancelProduct,
  handleSaveProduct,
  history,
}) {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    captains.log(product);
    if (!product) {
      history.push('/products'); // no product, bail out of Details
    }
  }, [product, history]);

  async function handleSave(data) {
    const chgProduct = { ...data, id: product.id || null };
    await handleSaveProduct(chgProduct, history.location?.state?.redirect);
  }

  return (
    <>
      <form
        autoComplete="off"
        noValidate
        className={classes.root}
      >
        <Card>
          <CardHeader
            title="商品情報"
          />
          <Divider />
          <CardContent>
            <Grid
              container
              spacing={3}
            >
              <Grid item xs={12} md={12}>
                <TextField
                  required
                  id="name"
                  name="name"
                  label="商品名"
                  defaultValue={product?.name}
                  fullWidth
                  inputRef={register({ required: true })}
                  error={Boolean(errors.name)}
                  helperText={errors.name && '入力してください'}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  id="description"
                  name="description"
                  label="商品説明"
                  defaultValue={product?.description}
                  fullWidth
                  multiline
                  rows={3}
                  inputRef={register}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  required
                  id="quantity"
                  name="quantity"
                  label="数量"
                  defaultValue={product?.quantity}
                  fullWidth
                  inputRef={register({
                    required: true,
                    pattern: {
                      value: /^[0-9]*$/i
                    }
                  })}
                  helperText={errors.quantity && '数値のみで入力してください'}
                  error={Boolean(errors.quantity)}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box
            display="flex"
            justifyContent="flex-end"
            p={2}
          >
            <span className={classes.actionArea}>
              <Button
                variant="contained"
                className={classes.button}
                onClick={handleCancelProduct}
              >
                Cancel
              </Button>
            </span>
            <span>
              <Submit
                className={classes.button}
                onClick={handleSubmit(handleSave)}
              >
                Save
              </Submit>
            </span>
          </Box>
        </Card>
      </form>
    </>
  );
}

export default withRouter(ProductDetail);
