import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';

const Menu = () => (
	<Typography>
		<Link to="/">
			Início
		</Link>
		<Link to="/signin">
			<Icon>person</Icon>
		</Link>
	</Typography>
);

export default withRouter(Menu);
