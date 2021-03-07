import { GET_ME } from '../../constants/actionTypes';

const initalState = {
  user: null,
  isAuth: !!localStorage.getItem('token'),
};

export default (state: any = initalState, action: any) => {
  switch (action.type) {
    case GET_ME:
      return {
        user: action.payload,
        isAuth: true,
      };
    default:
      return state;
  }
};
