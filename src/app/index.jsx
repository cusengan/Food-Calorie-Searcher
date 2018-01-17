import React from 'react'
import {render} from 'react-dom'
import FoodInfo from './foodInfo.jsx'
import Error from './error.jsx'
import axios from 'axios'
import './apiTest'

const urlFindResourceId = 'https://apibeta.nutritionix.com/v2/search?q='
const urlSearch = 'https://apibeta.nutritionix.com/v2/item/'

class App extends React.Component{

	constructor(props){
		super(props)
		this.state = {
			foodSearch: '',
			food: '',
			calories: 0,
			protein: 0,
			carbs: 0,
			fat: 0,
			resourceID: 'stuff',
			picture: '',
			showState: false,
			showError: false,
			error: 'Invalid food name'
		}
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.displayError = this.displayError.bind(this)
	}

	displayError(){
		this.setState({
			showError: true,
			showState: false
		})
	}

	handleChange(event){ //keeps track of the food value
		this.setState({
			foodSearch: event.target.value
		})
	}

	handleSubmit(event){
		var resourceId = urlFindResourceId + this.state.foodSearch + '&limit=10&offset=0'
		axios.get(
		resourceId,
		{headers:{
			'x-app-id': '3295a486',
			'x-app-key': 'bf445d5862ac6c6213485dec89c1a47f',
			//"x-remote-user-id": 0
		}}
		).then((response) => {
			return response.data.results[0].resource_id
		}).then((resourceId) => {
			var foodAPI = urlSearch + resourceId
			axios.get(
			foodAPI,
			{headers:{
			'x-app-id': '3295a486',
			'x-app-key': 'bf445d5862ac6c6213485dec89c1a47f',
			//"x-remote-user-id": 0
			}}
			).then((response) => {
				console.log(response)
				var data = response.data

				this.setState({
					resourceID: data.brand.id,
					food: data.brand.name,
					showState: true,
					showError: false
				})
			},
			(error) =>{
				console.log(error)
				this.displayError()
			})

		},
		(error) =>{
			console.log(error)
			this.displayError()
		})

		event.preventDefault()
	}

	render(){
		return(
			<div>
				<h1>Calorie Searcher</h1>
				<input type="text" value={this.state.foodSearch} onChange={this.handleChange}/>
				<input type="submit" value="Submit" onClick={this.handleSubmit}/>
				<button id="search"> Click here!</button>
				{this.state.showState && <FoodInfo text={this.state.resourceID} food={this.state.food}/>}
				{this.state.showError && <Error errorMessage={this.state.error}/>}
			</div>
		);
	}
}

render(<App/>, document.getElementById("app"))

