import React from 'react';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	headerContainer: {
		height: theme.spacing(8),
		display: 'flex',
		alignItems: 'center'
	},
}))
function PageHeader() {
	const classes= useStyles();
	return (
		<Grid container>
			<AppBar position="static" color='transparent'>
				<Toolbar>
					<div className={classes.headerContainer}>
						LOGO
					</div>
				</Toolbar>
			</AppBar>
		</Grid>
	)
}
export default PageHeader;