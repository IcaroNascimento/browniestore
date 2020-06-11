import React from 'react';
import { TextField, Button, makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';

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

	return (
		<form className={classes.root} noValidate autoComplete="on">
			<div>Bem vindo à BrownieStore!</div>
			<TextField id="standard-basic" label="Email" />
			<TextField id="standard-basic" label="Senha" type="password" />
			<Button className={classes.button} variant="contained">
				Entrar
			</Button>
			<div className={classes.link}>
				<Link to="/recuperarsenha" className="link">
					Esqueceu a sua senha?  
				</Link>
				<Link to="/criarconta" style = {{marginLeft: 10}} className="link">
					Criar conta
				</Link>
			</div>
		</form>
	);
}
