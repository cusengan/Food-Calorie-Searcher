import React from 'react'
import {Pie} from 'react-chartjs-2'

class FoodGraph extends React.Component{
	constructor(props){
		super(props)
		var data = {
			datasets: [
				{
					data: [this.props.protein, this.props.carbs, this.props.fat],
					backgroundColor: [
					'#FF6384',
					'#36A2EB',
					'#FFCE56'
					],
					hoverBackgroundColor: [
					'#FF6384',
					'#36A2EB',
					'#FFCE56'
					]
				}
			],
			labels: ['Protein','Carbs', 'Fat'],
			
		};
		this.state = {
			chartData: data
		}
	}

	componentWillReceiveProps(nextProps){ //this method is called when new props are coming to this component
		var data = {
			datasets: [
				{
					data: [nextProps.protein, nextProps.carbs, nextProps.fat],
					backgroundColor: [
					'#FF6384',
					'#36A2EB',
					'#FFCE56'
					],
					hoverBackgroundColor: [
					'#FF6384',
					'#36A2EB',
					'#FFCE56'
					]
				}
			],
			labels: ['Protein','Carbs', 'Fat'],
			
		};
		this.setState({
			chartData: data
		})
	}

	render(){
		return(
			<Pie data={this.state.chartData} />
		)
	}

}

export default FoodGraph