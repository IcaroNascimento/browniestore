import React, { useState } from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';
import { signin } from './auth';
import { Link, Redirect } from 'react-router-dom';

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

export default function SigninForm() {
	const classes = useStyles();

	const [ values, setValues ] = useState({
		email: '',
		password: '',
		error: '',
		loading: false,
		redirectToReferrer: false
	});

	const { email, password, loading, error, redirectToReferrer } = values;

	const handleChange = (name) => (event) => {
		setValues({ ...values, error: false, [name]: event.target.value });
	};

	const clickSubmit = (event) => {
		event.preventDefault();
		setValues({ ...values, error: false, loading: true });
		signin({ email, password }).then((data) => {
			if (data.error) {
				setValues({ ...values, error: data.error, loading: false });
			} else {
				setValues({
					...values,
					redirectToReferrer: true
				});
			}
		});
	};

	const showError = () => (
		<div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
			{error}
		</div>
	);

	const showLoading = () =>
		loading && (
			<div className="alert alert-info">
				<h2>Loading...</h2>
			</div>
		);

	const redirectUser = () => {
		if (redirectToReferrer) {
			return <Redirect to="/" />;
		}
	};

	return (
		<form className={classes.root} noValidate autoComplete="on">
			<div>Bem vindo à BrownieStore!</div>
			<TextField onChange={handleChange('email')} id="standard-basic" label="Email" value={email} />
			<TextField
				onChange={handleChange('password')}
				id="standard-basic"
				label="Escolha sua senha"
				type="password"
				value={password}
			/>
			<Button onClick={clickSubmit} className={classes.button} variant="contained">
				Entrar
			</Button>
			<div className={classes.link}>
				<Link to="/recuperarsenha" className="link">
					Esqueceu a sua senha?
				</Link>
				<Link to="/criarconta" style={{ marginLeft: 10 }} className="link">
					Criar conta
				</Link>
			</div>
			{showLoading()}
			{showError()}
			{redirectUser()}
		</form>
	);
}
