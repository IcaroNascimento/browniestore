import React, { useState } from 'react';
import { Modal, makeStyles, Icon } from '@material-ui/core';
import './core/Menu.css';
import SigninForm from './SigninForm';

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'absolute',
		width: 500,
		height: 300,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(1, 1, 1)
	},
	closeIcon: {
		top: `3%`,
		left: `2%`,
		position: 'absolute',
		color: '#000000',
		'&:hover': {
			color: '#707070'
		}
	}
}));

export default function SimpleModal() {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [ modalStyle ] = useState(getModalStyle);
	const [ open, setOpen ] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const body = (
		<div style={modalStyle} className={classes.paper}>
			<Icon onClick={handleClose} className={classes.closeIcon}>
				clear
			</Icon>
			<SigninForm />
		</div>
	);

	return (
		<div>
			<Icon onClick={handleOpen} className="icons">
				person
			</Icon>
			<Modal open={open}>{body}</Modal>
		</div>
	);
}
