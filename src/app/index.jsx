import React from 'react'
import {render} from 'react-dom'
import FoodInfo from './foodInfo.jsx'
import FoodGraph from './foodGraph.jsx'
import Error from './error.jsx'
import axios from 'axios'

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
		this.handleKeyPress = this.handleKeyPress.bind(this)
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
					picture: data.images.front.full,
					calories: data.label.nutrients[4].value,
					protein: data.label.nutrients[0].value,
					carbs: data.label.nutrients[2].value,
					fat: data.label.nutrients[1].value,
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

	handleKeyPress(event){
		if(event.charCode == 13){
			event.preventDefault()
    		event.stopPropagation()
    		this.handleSubmit(event)
		}
	}

	render(){
		return(
			<div>
				<h1>Calorie Searcher</h1>
				<input type="text" value={this.state.foodSearch} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
				<input type="submit" value="Submit" onClick={this.handleSubmit}/>
				{this.state.showState && <FoodInfo food={this.state.food} picture={this.state.picture} calories={this.state.calories} 
				protein={this.state.protein} carbs={this.state.carbs} fat={this.state.fat}/>}
				{this.state.showState && <FoodGraph food={this.state.food} picture={this.state.picture} calories={this.state.calories} 
				protein={this.state.protein} carbs={this.state.carbs} fat={this.state.fat}/>}
				{this.state.showError && <Error errorMessage={this.state.error}/>}
			</div>
		);
	}
}

render(<App/>, document.getElementById("app"))

