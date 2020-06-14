import React, { useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';
import { API } from './config'

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

	const { name, email, password } = values;

	const signup = (user) => {
		fetch(`${API}/signup`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(user)
		})
			.then((response) => {
				return response.json();
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const clickSubmit = (event) => {
		event.preventDefault();
		signup({ name, email, password });
	};

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
			<Button onClick={clickSubmit} className={classes.button} variant="contained">
				Criar conta
			</Button>
			<div className={classes.link}>
				<SigninModal />
			</div>
		</form>
	);
}
