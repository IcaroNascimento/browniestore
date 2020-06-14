import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import Logo from './logo.png';
import './Menu.css';
import SignupModal from '../SignupModal'

const Menu = () => (
	<div
		style={{
			display: 'flex',
			justifyContent: 'space-between',
			alignItems: 'center',
			height: '64px',
			fontFamily: 'Rubik'
		}}
	>
		<div style={{ display: 'flex', justifyContent: 'left', marginLeft: '24px' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', width: '150px' }}>
				<Link to="/" className="link">
					Início
				</Link>
				<Link to="/loja" className="link">
					Loja
				</Link>
				<Link to="/Contato" className="link">
					Contato
				</Link>
			</div>
		</div>
		<div>
			<img
				src={Logo}
				alt="website logo"
				style={{
					display: 'flex',
					justifyContent: 'left',
					alignItems: 'center',
					marginTop: '20px',
					marginLeft: '-64px',
					marginBottom: '20px',
					height: '80px'
				}}
			/>
		</div>
		<div style={{ display: 'flex', justifyContent: 'right', marginRight: '24px' }}>
			<div style={{ display: 'flex', justifyContent: 'space-between', width: '64px' }}>
				<SignupModal />
				<Link to="/shop" className="icons">
					<Icon>shopping_cart</Icon>
				</Link>
			</div>
		</div>
	</div>
);

export default withRouter(Menu);
