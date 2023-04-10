const ACTIONS = {
	SET_LOADING_PARSER: 'SET_LOADING_PARSER',
	SET_LOADING_BACKEND_CALL: 'SET_LOADING_BACKEND_CALL',
	SET_LOADING_LOCAL_STORAGE: 'SET_LOADING_LOCAL_STORAGE'
};

const initialState = {
	isLoadingParser: false,
	isLoadingBackendCall: false,
	isLoadingLocalStorage: false
};

const loadingReducer = (state, { type, payload }) => {
	switch (type) {
			case ACTIONS.SET_LOADING_PARSER:
				return { ...state, isLoadingParser: payload };
			case ACTIONS.SET_LOADING_SIMPLE_CALL:
				return { ...state, isLoadingBackendCall: payload };
			case ACTIONS.SET_LOADING_LOCAL_STORAGE:
				return { ...state, isLoadingLocalStorage: payload };
			default:
				return state;
	}
};

export { ACTIONS, initialState, loadingReducer };
