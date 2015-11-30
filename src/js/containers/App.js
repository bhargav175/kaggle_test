import React, {Component} from 'react';
import {connect} from 'react-redux';
import {fetchCompetitionList,fetchCompetitionLeaderboard, setCurrentUser,updateTeamScore} from '../actions/actions';
import Leaderboard from '../components/Leaderboard';
import Competitions from '../components/Competitions';
import Search from '../components/Search';
import Submission from '../components/Submission';




class App extends Component{
	componentDidMount(){
		const {dispatch} = this.props;
		dispatch(setCurrentUser());
    dispatch(fetchCompetitionList());
    
	}
 	// onSearchStringChange(e){
 	// 	const {dispatch} = this.props;
 	// 	dispatch(filterBySearch(e.target.value));
  //   dispatch(selectListItemIndex(0));
 	// }
  // onListItemSelected(index){
  //   const {dispatch} = this.props;
  //    dispatch(selectListItemIndex(index));
  // }
  // onSortItemSelected(sortType){
  //   const {dispatch} = this.props;
  //    dispatch(sortBy(sortType));
  // }
  // 
  // 
  onSubmission(team,val){
      const {dispatch} = this.props;
      dispatch(updateTeamScore(team,val));
  }
  onCompetitionItemClick(competition_slug){
      const {dispatch} = this.props;
      dispatch(fetchCompetitionLeaderboard(competition_slug));
  }
	render(){
		const {competition_reducer, leaderboard_reducer, user_reducer} = this.props;
    let comps = competition_reducer.competition_list.filter((i)=>{
           return i.CompetitionName === leaderboard_reducer.competition_slug;
    }); 
    let current_competition = comps.length ? comps[0] : { id:0, CompetitionName:''};
    console.log(current_competition);
    return <div> <div className="flexbox">
      <div className="left">
         <Competitions 
             onListItemSelected = {this.onCompetitionItemClick.bind(this)} 
             selectedCompetition={leaderboard_reducer.competition_slug} 
             list={competition_reducer.competition_list} />

      </div>
      <div className="right">
            <Leaderboard userId={user_reducer.userId} competition={current_competition} content={leaderboard_reducer.leaderboard_list}/>
      </div>

      </div>
        <Submission onSubmit={this.onSubmission.bind(this)} />
    </div>;

    
   
	}
}

function select(state) {
  let {competition_reducer,leaderboard_reducer,user_reducer} = state;
  // let {search,sortBy} = state;
  // let {searchString} = search;
  // let parcels = Object.assign({},state.parcels);

  
  //  if(parcels.list instanceof Array ) {

  //     parcels.list =  parcels.list.slice().sort((a,b)=>{
  //           if(sortBy.sortBy===SORT_ORDER.SORT_BY_VALUE){
  //              return a.value - b.value;
  //           }
  //           if(sortBy.sortBy===SORT_ORDER.SORT_BY_WEIGHT){
  //              return Number.parseFloat(a.weight) - Number.parseFloat(b.weight);
  //           }

  //           if(a.name < b.name) return -1;
  //           if(a.name > b.name) return 1;
  //           return 0;
  //       }).slice();

  //  } 

  // if(searchString && searchString!=="" && state.parcels.list instanceof Array){
  // 		parcels.list = state.parcels.list.filter(item=>{
  // 			 if(!item.name) return false;
  // 			 return item.name.toLowerCase().indexOf(searchString.toLowerCase())==0 || item.type.toLowerCase().indexOf(searchString.toLowerCase())==0 || item.weight.indexOf(Number.parseFloat(searchString))==0 ;
  // 		}).slice();
  // }

   console.log(state);
  // return {
  // 		parcels : parcels,
  // 		search : state.search,
  //     selectListItemIndex: state.selectListItemIndex,
  //     sortBy : state.sortBy,
  //     api : state.api
  // };
  // 
  // 
  
  // active_competition : active_competition,
       // logged_in_user : logged_in_user,
       // submission : submission,
       // competition_search_string : competition_search_string

    return{
       competition_reducer,
       leaderboard_reducer,
       user_reducer

    };
}
export default connect(select)(App);