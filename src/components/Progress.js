import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.tooltip + 1,
        color: '#fff',
    },
}));

const Progress = ({ processing }) => {
    const classes = useStyles()
    return <>
        {!!processing && (
            <Backdrop className={classes.backdrop} open={true}>
                <svg width="38" height="38" viewBox="0 0 38 38" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
                    <g fill="none" fillRule="evenodd">
                        <g transform="translate(1 1)" strokeWidth="2">
                            <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                            <path d="M36 18c0-9.94-8.06-18-18-18">
                                <animateTransform
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 18 18"
                                    to="360 18 18"
                                    dur="1s"
                                    repeatCount="indefinite" />
                            </path>
                        </g>
                    </g>
                </svg>
            </Backdrop>
        )}
    </>;
}

export default Progress;