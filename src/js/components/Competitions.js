import React, {Component} from 'react';


class CompetitionListItem extends Component{
	constructor(props){
		super(props);
	}
	render(){
		let {CompetitionName} = this.props.item,
		className = "list-item ";
			
		if(this.props.active){
			className+="active";
		}

		return <div className={className} onClick={this.props.clickHandler.bind(this)}>
				{CompetitionName}
		</div>;
	}
}

// export class DetailListItem extends Component{
// 	render(){
// 		let className = "list-item-detail";
// 		if(!this.props.item) return <div className={className} />;
// 		let {name,image,date,type,weight,price,quantity,link,color,live_location} = this.props.item;
// 		let map = GMap({lat:live_location.latitude,lng:live_location.longitude,onClick:()=>{},markers:[
// 			{ position: {
//         lat: live_location.latitude,
//         lng: live_location.longitude,
//       },
//       key: "Taiwan",
//       defaultAnimation: 2}],
//       onMarkerRightClick : ()=>{}});
// 		let	fields = <div className="fields">
// 					<div className = "list-item-detail-title" style={{background:color}}>
// 						<p className="name">{name}</p>
// 						<p className="type">{type}</p>
// 					</div>
// 					<div className="list-item-detail-body">
					
// 						<div className="values">
// 						<p>Date 		-  {date}</p>
// 						<p>Weight 		- {weight}</p>
// 						<p>Price 		- {price}</p>
// 						<p>Quantity 	- {quantity}</p>
// 						<p>Link 		- {link}</p>
// 						<p>Color 		-{color}</p>
// 						</div>
// 						</div>
// 					<div className="list-item-detail-media"> 
// 						 <img src={image} />
// 						 <div className="map">
// 						 	{map}
// 						 </div>
// 					 </div>
// 				</div>;
		
// 		return <div className={className}>
// 				{fields}
// 		</div>;
// 	}
// }


class CompetitionList extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){

	}
	render(){
		let listItems = "No items";
		if(this.props.list instanceof Array){
			listItems = this.props.list.map((i,index)=>{
				if(i.CompetitionName === this.props.selectedCompetition){
					return <CompetitionListItem key={index} 
							item={i} 
							active="true"
							clickHandler={this.props.onListItemSelected.bind(this,i.CompetitionName)} />;	
				}
				return <CompetitionListItem key={index} 
							item={i} 
							clickHandler={this.props.onListItemSelected.bind(this,i.CompetitionName)} />;
			});
		}
		return <div className="list">
			{listItems}
		</div>;
	}
}


export default CompetitionList;