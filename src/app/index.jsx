import React from 'react'
import {render} from 'react-dom'
import Test from './testing.jsx'
import './apiTest'

class App extends React.Component{
	
	constructor(props){
		super(props)
		this.state = {
			food: ''
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event){ //keeps track of the food value
		this.setState({
			food: event.target.value
		})
	}

	handleSubmit(event){
		alert('A food was submitted: ' + this.state.food)
		event.preventDefault()
	}

	render(){
		return(
			<div>
				<h1>Calorie Searcher</h1>
				<input type="text" value={this.state.food} onChange={this.handleChange}/>
				<input type="submit" value="Submit" onClick={this.handleSubmit}/>
				<button id="search"> Click here!</button>
				<Test text="we own"/>
			</div>
		);
	}
}

render(<App/>, document.getElementById("app"))

