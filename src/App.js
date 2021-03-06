import React, { lazy, Suspense } from 'react';
import { makeStyles } from '@material-ui/core';
import { Helmet } from 'react-helmet';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Redirect, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router';
import useDocumentTitle from './hooks/useDocumentTitle'
import { HeaderBar, NavBar, NotFound, Progress } from './components';
import About from './About';
import Complete from './Complete';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    paddingLeft: 256
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto',
    padding: '1rem'
  }
}));

const Products = withRouter(
  lazy(() => import(/* webpackChunkName: "products" */ './products/Products'))
);

const App = ({ history }) => {
  const classes = useStyles();
  const title = useDocumentTitle(history.location);

  return <>
    <Helmet>
      <meta
        name="viewport"
        content="minimum-scale=1, initial-scale=1, width=device-width"
      />
      <title>{title}</title>
    </Helmet>
    <div className={classes.root}>
      <HeaderBar />
      <NavBar />
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Suspense fallback={<Progress processing={true} />}>
              <Switch>
                <Redirect from="/" exact to="/products" />
                <Route path="/products" component={Products} />
                <Route path="/about" component={About} />
                <Route path="/complete" component={Complete} />
                <Route exact path="**" component={NotFound} />
              </Switch>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  </>;
}

export default withRouter(App);
