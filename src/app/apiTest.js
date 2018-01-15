import axios from 'axios';
const url = "https://trackapi.nutritionix.com/v2/search/item?nix_item_id=570d85c6806817ee1300c785"
//const urlSearch = "https://trackapi.nutritionix.com/v2/search/instant?query=yogurt"
const urlTag = "https://apibeta.nutritionix.com/v2/item/644"
const urlSearch2 = "https://apibeta.nutritionix.com/v2/search?q=yogurt&limit=10&offset=0"
//const resourceId = "https://apibeta.nutritionix.com/v2/item/xx5wi8Zxo"

var printThis = ''

const urlFindResourceId = "https://apibeta.nutritionix.com/v2/search?q="

function getNutrients(food){
	var resourceId = urlFindResourceId + food + "&limit=10&offset=0"
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
	}).then((resourceID) => {
		printThis = resourceID
	},
	(error) =>{
		console.log(error)
		console.log("bad")
	});

}
async function getNutrientsHelper(resourceID){
	var urlSearch = "https://apibeta.nutritionix.com/v2/item/" + resourceID 
	axios.get(
	urlSearch,
	{headers:{
		"x-app-id": "3295a486",
		"x-app-key": "bf445d5862ac6c6213485dec89c1a47f",
		//"x-remote-user-id": 0
	}}
	).then((response) => {
		return response
	},
	(error) =>{
		console.log(error)
		console.log("bad")
	});
}

document.addEventListener('DOMContentLoaded', () =>{
	var button = document.getElementById('search')

	button.addEventListener('click', ()=>{
		getNutrients("yogurt")
		console.log(printThis)
	});

});