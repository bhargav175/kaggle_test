import React, {Component} from 'react';


class Submission extends Component{
	constructor(props){
		super(props);
		this.state = {
			show:false
		};
	}
	onSubmit(e){
		e.preventDefault();
		this.props.onSubmit(this.refs.teamname.value,this.refs.score.value);
		this.setState({show:false});
	}
	show(bool){
		this.setState({show:bool});
	}
	render(){
		if(!this.state.show){
			return <div className="submission" onClick={this.show.bind(this,true)}>
					 <div className="fab">
					 	Add
					 	</div>
			</div>;
		}else{
			return <div className="submission" > 
              <div className="form-container">
              <button className="close" onClick={this.show.bind(this,false)}> Close Form </button>    
			 <form onSubmit={this.onSubmit.bind(this)}>
			 <input ref="teamname" placeholder="teamname" required />		
			 <input ref="score" type="number" placeholder="score" required />		
			 <input type="submit" value="Submit"/>
			</form>
			</div>
			</div> ;			
		}
		
	}
};


export default Submission;