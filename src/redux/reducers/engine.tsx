import Engine from '../../core/engine';

const initialState = {
	backgroundState: {},
};

const engineReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case 'INIT_BG_STATE':
			return { backgroundState: Engine.state };
		case 'UPDATE_BG_STATE': {
			const newState = { ...state };
            //@ts-ignore
			newState.backgroundState[action.key] = Engine.state[action.key];
			return newState;
		}
		default:
			return state;
	}
};

export default engineReducer;