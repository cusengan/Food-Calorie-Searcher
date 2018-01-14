

const url = "https://trackapi.nutritionix.com/v2/search/item?nix_item_id=570d85c6806817ee1300c785"
const urlSearch = "https://trackapi.nutritionix.com/v2/search/instant?query=Kale"


function getRequest(){
	axios.get(
	url,
	{headers:{
		"x-app-id": "3295a486",
		"x-app-key": "bf445d5862ac6c6213485dec89c1a47f",
		"x-remote-user-id": 0
	}}
	).then((response) => {
		console.log("Hi");
		console.log(response.data.foods[0].food_name);
		console.log(response.data.foods[0].serving_qty);
		console.log(response.data.foods[0].serving_unit);

	},
	(error) =>{
		console.log(error)
		console.log("bad")
	});
}

document.addEventListener('DOMContentLoaded', () =>{
	var button = document.getElementById('search');

	button.addEventListener('click', ()=>{
		getRequest();
	});

});
