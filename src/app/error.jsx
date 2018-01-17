import React from 'react'

class Error extends React.Component{
	constructor(props){
		super(props)
	}

	render(){
		return(
			<h1>{this.props.errorMessage} </h1>
		)
		
	}
}

export default Error