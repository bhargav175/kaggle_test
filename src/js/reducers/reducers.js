import { combineReducers } from 'redux';

import {RECEIVE_COMPETITION_LIST,RECEIVE_COMPETITION_LEADERBOARD,
      REQUEST_COMPETITION_LEADERBOARD , GET_LOGGED_IN_USER, UPDATE_TEAM_SCORE} from '../actions/actions';



function user_reducer(state={userId : 0},action){
   switch(action.type){
      case GET_LOGGED_IN_USER :
        return Object.assign({},state,{userId : action.userId});
      default:
        return state;
   };
}

function competition_reducer(state={competition_list : []},action){
   switch(action.type){
      case RECEIVE_COMPETITION_LIST :
        return Object.assign({},state,{competition_list:action.competition_list});
      default:
        return state;
   };
}




function leaderboard_reducer(state={competition_slug:"",leaderboard_list:[]},action){
   switch(action.type){
      case REQUEST_COMPETITION_LEADERBOARD :
        return Object.assign({},state,{competition_slug:action.competition_slug,leaderboard_list:[]});
      case RECEIVE_COMPETITION_LEADERBOARD :
        return Object.assign({},state,{competition_slug:action.competition_slug,leaderboard_list : action.leaderboardList});  
      case UPDATE_TEAM_SCORE :
        let leaderboard_list = state.leaderboard_list.slice().map(i=>{
            if(i.TeamName != action.teamName){
              return i;
            }else{
              if(i.Score < action.score){
                  alert("Updated score for "+action.teamName);
                  i.Score = action.score;
                  return i;
              }
              return i;
            }


        });
        return Object.assign({},state,{leaderboard_list:leaderboard_list.slice()}) ;

        
      default:
        return state;
   };
}


// const rootReducer = combineReducers({
//   parcels,
//   search,
//   selectListItemIndex,
//   sortBy,
//   api
// });
// 
const rootReducer = combineReducers({
  competition_reducer,
  leaderboard_reducer,
  user_reducer
});

export default rootReducer;