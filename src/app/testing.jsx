import React from 'react';

class Test extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			number:123,
			string: "william"
		}
	}
	render(){
		return(
			<div>
				<h1> {this.props.text} </h1>
				<h1> {this.state.string} </h1>
			</div>
		);
	}
}

export default Test;

