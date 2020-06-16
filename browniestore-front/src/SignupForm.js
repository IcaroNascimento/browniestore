import React, { useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';
import { signup } from './auth';

import SigninModal from './SigninModal';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1, 24),
			width: '22ch'
		}
	},
	button: {
		width: '43ch',
		position: 'relative',
		minWidth: 0,
		flexDirection: 'column',
		verticalAlign: 'top',
		fontSize: 10,
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

	const { name, email, password, success, error } = values;

	const clickSubmit = (event) => {
		event.preventDefault();
		signup({ name, email, password }).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, success: false });
			} else {
				setValues({
					...values,
					name: '',
					email: '',
					password: '',
					error: '',
					success: true
				});
			}
		});
	};

	const showError = () => (
		<div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
			{error}
		</div>
	);

	const showSuccess = () => (
		<div className="alert alert-info" style={{ display: success ? '' : 'none' }}>
			New account is created. Please Signin
		</div>
	);

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	return (
		<form className={classes.root} noValidate autoComplete="on">
			<div>Crie sua conta</div>
			<TextField onChange={handleChange('name')} id="standard-basic" label="Nome completo" value={name} />
			<TextField onChange={handleChange('email')} id="standard-basic" label="Email" value={email} />
			<TextField
				onChange={handleChange('password')}
				id="standard-basic"
				label="Escolha sua senha"
				type="password"
				value={password}
			/>
			<Button onClick={clickSubmit} className={classes.button} variant="contained">
				Criar conta
			</Button>
			<div className={classes.link}>
				<SigninModal />
			</div>
			{showSuccess()}
			{showError()}
		</form>
	);
}
