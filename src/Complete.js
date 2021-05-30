import React from 'react';
import { withRouter } from 'react-router';
import { Progress } from './components';

const Complete = ({ history }) => {
  React.useEffect(() => {
    const to = history.location?.state?.to || '/';
    history.push(to);
  }, [history]);

  return <Progress processing={true}>callback</Progress>
}

export default withRouter(Complete);
