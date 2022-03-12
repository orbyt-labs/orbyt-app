import bookmarksReducer from './bookmarks';
import engineReducer from './engine';
import userReducer from './user';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	engine: engineReducer,
	bookmarks: bookmarksReducer,
	user: userReducer,
});

export default rootReducer;