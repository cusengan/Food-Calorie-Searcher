import React from 'react'
import {render} from 'react-dom'
import Test from './testing.jsx'
import axios from 'axios'
import './apiTest'

const urlFindResourceId = "https://apibeta.nutritionix.com/v2/search?q="

class App extends React.Component{
	
	constructor(props){
		super(props)
		this.state = {
			food: '',
			calories: 0,
			protein: 0,
			carbs: 0,
			fat: 0,
			resourceID: 'stuff',
			picture: '',
			showState: false
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
		var resourceId = urlFindResourceId + this.state.food + "&limit=10&offset=0"
		axios.get(
		resourceId,
		{headers:{
			"x-app-id": "3295a486",
			"x-app-key": "bf445d5862ac6c6213485dec89c1a47f",
			//"x-remote-user-id": 0
		}}
		).then((response) => {
			console.log(response.data.results[0].item_name)
			console.log(response.data.results[0].resource_id)
			return response.data.results[0].resource_id
		}).then((resourceId) => {
			this.setState({
				resourceID: resourceId,
				showState: true
			})
		},
		(error) =>{
			console.log(error)
			console.log("bad")
			this.setState({
				resourceID: 'Error',
				showState: false
			})
		});

		event.preventDefault()
	}

	render(){
		return(
			<div>
				<h1>Calorie Searcher</h1>
				<input type="text" value={this.state.food} onChange={this.handleChange}/>
				<input type="submit" value="Submit" onClick={this.handleSubmit}/>
				<button id="search"> Click here!</button>
				{this.state.showState && <Test text={this.state.resourceID}/>}
			</div>
		);
	}
}

render(<App/>, document.getElementById("app"))

