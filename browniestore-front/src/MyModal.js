import React, { useState } from 'react';
import { Modal, makeStyles } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import './core/Menu.css';


function getModalStyle() {
	const top = 50 
	const left = 50 

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
		justifyContent:'center',
		position: 'absolute',
		width: 500,
		height: 400,
		backgroundColor: theme.palette.background.paper,
		boxShadow: theme.shadows[5],
		padding: theme.spacing(1, 1, 1),
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
			<h2 id="simple-modal-title">Modal</h2>
		</div>
	);

	return (
		<div>
			<Icon onClick={handleOpen} className="icons">person</Icon>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description"
			>
				{body}
			</Modal>
		</div>
	);
}
