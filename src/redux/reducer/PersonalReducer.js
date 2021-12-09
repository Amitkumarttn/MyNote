const INITIAL_STATE = {
  title: '',
  body: '',
};

const PersonalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'TITLE':
      return {...state, title: action.payload};
    case 'BODY':
      return {...state, body: action.payload};
    default:
      return state;
  }
};
export default PersonalReducer;
