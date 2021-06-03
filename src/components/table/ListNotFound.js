import React from 'react';
import {
    Box,
    Typography,
} from '@material-ui/core';

const ListNotFound = () => (
    <>
        <Box mb='1rem' />
        <Typography variant="subtitle1" id="noResults" component="div">
            検索結果がありません。
        </Typography>
    </>
);

export default ListNotFound;
