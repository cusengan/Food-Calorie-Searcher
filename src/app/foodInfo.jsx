import React from 'react'

class FoodInfo extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			number:123,
			string: "william"
		}
	}
	render(){
		return(
			<div>
				<h1> {this.props.food} </h1>
				<h1> {this.props.text} </h1>
				<h1> {this.state.string} </h1>
			</div>
		)
	}
}

export default FoodInfo

