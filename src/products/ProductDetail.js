import React, { useEffect } from 'react';
import { withRouter } from 'react-router';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  makeStyles,
  Button,
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CustomTextField, Submit } from '../components';

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

const schema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string(),
  quantity: yup.number().required(),
});

function ProductDetail({
  product,
  handleCancelProduct,
  handleSaveProduct,
  history,
}) {
  const classes = useStyles();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

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
                <CustomTextField
                  required
                  id="name"
                  name="name"
                  label="商品名"
                  fullWidth
                  variant="outlined"
                  defaultValue={product?.name}
                  rules={{ required: true }}
                  control={control}
                  error={errors.name ? true : false}
                  helperText={errors.name && '入力してください'}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <CustomTextField
                  id="description"
                  name="description"
                  label="商品説明"
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  defaultValue={product?.description}
                  control={control}
                />
              </Grid>
              <Grid item xs={12} md={12}>
                <CustomTextField
                  required
                  id="quantity"
                  name="quantity"
                  label="数量"
                  fullWidth
                  variant="outlined"
                  defaultValue={product?.quantity}
                  rules={{ required: true }}
                  control={control}
                  error={errors.quantity ? true : false}
                  helperText={errors.quantity && '数値を入力してください'}
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
