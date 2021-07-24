import React from 'react';
import { TextField } from '@material-ui/core';
import { useController } from 'react-hook-form';

const CustomTextField = ({ name, control, rules, defaultValue, ...textFieldProps }) => {
  const {
    field: { ref, ...rest },
  } = useController({
    name,
    control,
    rules,
    defaultValue,
  });

  return <TextField {...rest} {...textFieldProps} inputRef={ref} />;
}

export default CustomTextField;