import expect from 'expect';
import {sortBy,SORT_ORDER,SORT_BY} from '../src/js/actions/actions';

module.exports = describe('sortBy',function(){
	it('sortByName should work',()=>{
		const sortOrder = "SORT_BY_NAME";
		const expectedAction =  {
		    type: SORT_BY,
		    sortBy:sortOrder
		  };
		expect(sortBy(SORT_ORDER.SORT_BY_NAME)).toEqual(expectedAction);
	});
});