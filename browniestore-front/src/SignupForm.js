import React, { useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';

import SigninModal from './SigninModal';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1, 24),
			width: '25ch'
		}
	},
	button: {
		fontSize: 10,
		width: '-webkit-fill-available',
		marginTop: 24,
		color: '#FFFFFF',
		background: '#3E3E3E',
		'&:hover': {
			color: '#FFFFFF',
			background: '#707070'
		}
	},
	link: {
		display: 'inline-block',
		fontSize: 12,
		clear: 'both',
		whiteSpace: 'nowrap'
	}
}));

export default function SignupForm() {
	const classes = useStyles();

	const [ values, setValues ] = useState({
		name: '',
		email: '',
		password: '',
		error: '',
		success: false
	});

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	return (
		<form className={classes.root} noValidate autoComplete="on">
			<div>Crie sua conta</div>
			<TextField onChange={handleChange('name')} id="standard-basic" label="Nome completo" />
			<TextField onChange={handleChange('email')} id="standard-basic" label="Email" />
			<TextField
				onChange={handleChange('password')}
				id="standard-basic"
				label="Escolha sua senha"
				type="password"
			/>
			<Button className={classes.button} variant="contained">
				Criar conta
			</Button>
			<div className={classes.link}>
				<SigninModal />
			</div>
			{JSON.stringify(values)}
		</form>
	);
}
