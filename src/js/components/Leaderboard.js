import React, {Component} from 'react';


class LeaderboardListItem extends Component{
	constructor(props){
		super(props);
	}
	render(){
		let {item,userId} = this.props;
		let {Users} = item;
		
		let className = "list-item ";
		console.log(Users);
		if(Users.map(i=>i.Id).indexOf(userId)>=0){
			className+="active";
		}
       
        let usersTitle = Users.map(i=>i.UserName).join(', '), usersCount = Users.length;
       
		return <tr title={usersTitle} className={className||''} >
				<td>{this.props.item.Rank||''}</td>
				<td>{this.props.item.TeamName + " ("+usersCount+")"||''}</td>
				<td>{this.props.item.Score||''}</td>
				<td>{this.props.item.NumSubmissions||''}</td>
				<td>{this.props.item.DateSubmitted || ''}</td>
		</tr>;
	}
}

export default class Leaderboard extends Component{
	constructor(props){
		super(props);
	}
	render(){
		  if(this.props.loading){

		  	 return <div className=" leaderboard--list list">
		  	 	 <p className="loading"> Fetching Content </p>
		  	 	 </div>;
		  }else{
		  	let {competition,userId} = this.props;
			let listItems = this.props.content.map((item, index)=>{
			  return <LeaderboardListItem userId={userId} item={item} key={index} />;
			});
			return <div className=" leaderboard--list list">
			<h1>{competition.CompetitionName || ''}</h1>
				<table>
				<thead>
					<tr>
						<th>Rank</th>
						<th>TeamName</th>
						<th>Score</th>
						<th>Submissions</th>
						<th>Date Submitted</th>
					</tr>
				</thead>
				<tbody>
					{listItems}
				</tbody>
				

				</table>
			</div>;
		  }
	}
}

