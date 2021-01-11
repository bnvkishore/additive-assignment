import React, { useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { select } from '../store';
import { Box } from '@material-ui/core';

import PageHeader from '../Shared/PageHeader';

const useStyles = makeStyles(theme => ({
	root: {
		minWidth: '275px',
		width: '75%'
	},
	overviewContainer: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: 'calc(100vh - 64px)',
		background: '#f3f3f3'
	},
	contentSection: {
		minHeight: '300px'
	},
	listSection: {
		marginTop: theme.spacing(3)
	}
}))

const removeSelectedEmployee = (name= '', list) => {
	const originalList = [...list];
	const index = list.map(item => item.toLowerCase()).indexOf(name.toLowerCase());
	if(index > -1) {
		originalList.splice(index, 1)
	}
	return originalList;
}

function RenderSubordinates(props) {
	const classes = useStyles();
	const { name } = props;
	const employeesList = useSelector(state => select.homePage.getEmployeesList(state));
	const subordinatesList = useSelector(state => select.homePage.getSubordinatesList(state));
	const anyDirectSubordinates = subordinatesList.find(item => typeof(item)==='object');
	const filteredList = subordinatesList.length> 0 && anyDirectSubordinates ? employeesList.filter(e => !subordinatesList[1]['direct-subordinates'].includes(e)) : [];
	const otherEmployees = anyDirectSubordinates && removeSelectedEmployee(name, filteredList);
	return (
		<div className={classes.listSection}>
			<div>
			<Typography variant='h6' color='textSecondary' >Direct subordinates:</Typography>
				<ul>
				{subordinatesList.length>0 && anyDirectSubordinates && subordinatesList[1]['direct-subordinates'].map( (i, index) => (
						<li key={`direct=${index}`}>
							<Typography variant='body1' color='textSecondary' >{i}</Typography>
						</li>
				))}
				</ul>
			</div>
			<div>
			<Typography variant='h6' color='textSecondary' >Non Direct subordinates:</Typography>
				<ul>
				{otherEmployees && otherEmployees.map( (j, index) => (
						<li key={`nondirect=${index}`}>
							<Typography variant='body1' color='textSecondary' >{j}</Typography>
						</li>
				))}
				</ul>
			</div>
				
		</div>
	)
}

function Overview(props) {
	const { match, history } = props;
	const dispatch = useDispatch();
	const classes = useStyles();
	const subordinatesList = useSelector(state => select.homePage.getSubordinatesList(state));
	const employeesList = useSelector(state => select.homePage.getEmployeesList(state));

	useEffect(() => {
		if(employeesList.length<=0) {
			dispatch.homePage.fetchEmployees();
		}
		dispatch.homePage.fetchSubordinate(match?.params?.name);
	},[])

	const backHandler = () => {
		history.push('/')
	}

	return(
		<>
			<PageHeader />
			<div className={classes.overviewContainer}>
					<Card className={classes.root}>
						<CardHeader title={<Typography variant='h4' align='center'>Employee Overview</Typography>} />
						<CardContent className={classes.contentSection}>
							<Box>
								<Typography variant='h5' color='textPrimary' >Subordinates of employee {match?.params?.name}</Typography>
								{subordinatesList.length > 0 ? <RenderSubordinates name={match?.params?.name}/> : <Typography variant='h6' align='center' >No data found</Typography> }
							</Box>
							<Button variant='contained' color='default' onClick={backHandler}> Back</Button>
						</CardContent>
						
					</Card>
			</div>
		</>
	)
}

export default Overview;
