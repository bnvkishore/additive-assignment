import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';

import PageHeader from '../Shared/PageHeader';


const useStyles = makeStyles(theme =>({
	root: {
		minWidth:'275px',
		width: '50%',
	},
	searchContainer: {
		height: 'calc(100vh - 64px)',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		background: '#f3f3f3'
	},
	searchInput: {
		width: '100%'
	}
}))

function HomePage(props) {
	const { history } = props;
	const classes = useStyles();
	const dispatch = useDispatch();
	const [input,setInput] = useState('');
	
	useEffect(() => {
		dispatch.homePage.fetchEmployees();
	},[]);

	const handleInputChange = (e) => {
		setInput(e.target.value);
	}

	const searchHandler = () => {
		history.push(`/overview/${input}`);
	}
	return (
		<div>
			<PageHeader />
			<div className={classes.searchContainer}>
					<Card className={classes.root}>
						<CardHeader 
							title= {<Typography variant='h4' align='center'>Employee Explorer</Typography>}
						/>
						<CardContent>
							<Grid container alignItems='center' spacing={2}>
								<Grid item md={10}>
									<TextField 
										id="outlined-basic" 
										placeholder="Enter Employee name" 
										variant="outlined" 
										className={classes.searchInput}
										value={input}
										onChange={(e)=>handleInputChange(e)}
									/>
								</Grid>
								<Grid item md={2}>
									<Button variant="contained" color="primary" onClick={searchHandler}>Search</Button>
								</Grid>
							</Grid>
							
						</CardContent>
					</Card>
			</div>
		</div>
	)
}

export default HomePage;