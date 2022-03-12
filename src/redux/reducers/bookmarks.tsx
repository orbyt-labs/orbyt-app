const bookmarksReducer = (state = [], action: any) => {
	switch (action.type) {
		case 'ADD_BOOKMARK':
			return [...state, action.bookmark];
		case 'REMOVE_BOOKMARK':
            //@ts-ignore
			return state.filter((item) => item.url !== action.bookmark.url);
		default:
			return state;
	}
};
export default bookmarksReducer;