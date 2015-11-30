import fetch from 'isomorphic-fetch';
export const REQUEST_PARCELS = 'REQUEST_PARCELS';
export const RECEIVE_PARCELS = 'RECEIVE_PARCELS';
export const REQUEST_API_HITS = 'REQUEST_API_HITS';
export const RECEIVE_API_HITS = 'RECEIVE_API_HITS';
export const FILTER_BY_SEARCH = 'FILTER_BY_SEARCH';
export const SELECT_LIST_ITEM_INDEX ='SELECT_LIST_ITEM_INDEX';
export const SORT_BY = 'SORT_BY';

export const SORT_ORDER = {
        SORT_BY_NAME : 'SORT_BY_NAME',
        SORT_BY_VALUE : 'SORT_BY_VALUE',
        SORT_BY_WEIGHT : 'SORT_BY_WEIGHT'
};

/**
 * Start kaggle actions
 */



const COMPETITION_API = 'http://leaderboard-project.azurewebsites.net/api/competition';
const COMPETITION_LEADERBOARD_API = 'http://leaderboard-project.azurewebsites.net/api/competition/';
const USER_API = 'http://leaderboard-project.azurewebsites.net/api/user';
const SUBMISSION_API = 'http://leaderboard-project.azurewebsites.net/api/competition/';
export const REQUEST_COMPETITION_LIST = 'REQUEST_COMPETITION_LIST';
export const RECEIVE_COMPETITION_LIST = 'RECEIVE_COMPETITION_LIST';
export const REQUEST_COMPETITION_LEADERBOARD = 'REQUEST_COMPETITION_LEADERBOARD';
export const RECEIVE_COMPETITION_LEADERBOARD = 'RECEIVE_COMPETITION_LEADERBOARD';
export const REQUEST_USER_LIST = 'REQUEST_USER_LIST';
export const RECEIVE_USER_LIST = 'RECEIVE_USER_LIST';
export const SUBMISSION_REQUEST = 'SUBMISSION_REQUEST';
export const GET_LOGGED_IN_USER = 'GET_LOGGED_IN_USER';
export const SUBMISSION_RESPONSE = 'SUBMISSION_RESPONSE';
export const UPDATE_TEAM_SCORE = 'UPDATE_TEAM_SCORE';

/**
 * Get competitions
 */

function requestCompetitionList(){
    return {
        type : REQUEST_COMPETITION_LIST
    };
}

function receiveCompetitionList(competition_list){
  console.log(competition_list);
  return {
        type : RECEIVE_COMPETITION_LIST,
        competition_list : competition_list
    }; 
}

export function fetchCompetitionList(){
  return dispatch => {
    dispatch(setCurrentUser(78));
    dispatch(requestCompetitionList());
    return fetch(COMPETITION_API)      
        .then(response =>  response.json())
            .then(list => dispatch(receiveCompetitionList( list || [] )))
            .then(function(obj){
                  if (obj.competition_list instanceof Array){
                      if(obj.competition_list[0].CompetitionName  &&  obj.competition_list[0].CompetitionName !== ''){
                          return dispatch(fetchCompetitionLeaderboard(obj.competition_list[0].CompetitionName));
                      }
                    }
            });

  };
}
/**
 * get users
 */

function requestUserList(){
  console.log("requesting user list");
   return {
        type : REQUEST_USER_LIST
    };
}

function receiveUserList(userList){
    console.log("received user list",userList);
     return {
        type : RECEIVE_USER_LIST,
        userList : userList
    };
}

export function setCurrentUser(id){
     return {
        type : GET_LOGGED_IN_USER,
        userId : id
    };   
}

export function updateTeamScore(teamName,score){
     return {
         type : UPDATE_TEAM_SCORE,
         teamName:teamName,
         score : score
     };
}

function fetchUserList(){
  return dispatch => {
    dispatch(requestUserList());
    return fetch(USER_API)      
        .then(response =>  response.json())
            .then(list => dispatch(receiveCompetitionList( list || [] )));
  };
}

//fetch leaderboard

function requestCompetitionLeaderboard(competition_slug){
  console.log("requesting leaderboard");
   return {
        type : REQUEST_COMPETITION_LEADERBOARD,
        competition_slug:competition_slug
    };
}

function receiveCompetitionLeaderboard(competition_slug,leaderboardList){
    console.log("received leaderboard",leaderboardList);
     return {
        type : RECEIVE_COMPETITION_LEADERBOARD,
        competition_slug:competition_slug,
        leaderboardList:leaderboardList
    };
}

export function fetchCompetitionLeaderboard(competition_slug=''){
  return dispatch => {
    dispatch(requestCompetitionLeaderboard(competition_slug));
    return fetch(COMPETITION_LEADERBOARD_API+competition_slug+'/leaderboard')      
        .then(response =>  response.json())
            .then(list => dispatch(receiveCompetitionLeaderboard(  competition_slug || '' , list || [] )));
  };
}



// submission post

function submitSubmissionRequest(submission){
  console.log("requesting submission");
   return {
        type : SUBMISSION_REQUEST,
        submission:submission
    };
}

function getSubmitSubmissionResponse(submissionResponse){
    console.log("received submission ack",submissionResponse);
     return {
        type : SUBMISSION_RESPONSE,
        submissionResponse:submissionResponse
    };
}

function submitSubmission(submission={},competition_slug=''){
  return dispatch => {
    dispatch(submitSubmissionRequest(submission));
    return fetch(SUBMISSION_API+competition_slug+'/submit')      
        .then(response =>  response.json())
            .then(res => dispatch(getSubmitSubmissionResponse( res || {} )));
  };
}




/**
 * End Kagggle
 */


