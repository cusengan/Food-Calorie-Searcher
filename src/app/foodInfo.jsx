import React from 'react'
const place_holder = '../images/not_avaialbe.png'

class FoodInfo extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			number:123,
			string: 'william',
			place_holder: '../images/not_avaialbe.png'
		}
	}
	render(){
		return(
			<div>
				<img style={{width: 50, height: 50}} src={this.props.picture}/>
				<h1> {this.props.food} </h1>
				<pre>
					Calories: {this.props.calories}

					Protein: {this.props.protein}

					Carbs: {this.props.carbs}

					Fat: {this.props.fat}
				</pre>
				<h1> {this.state.string} </h1>
			</div>
		)
	}
}

export default FoodInfo

