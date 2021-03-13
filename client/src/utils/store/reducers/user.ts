import { GET_ME } from '../../constants/actionTypes';
import { IUser, IAction } from '../../types';

interface IInitialState {
  user: IUser | object;
  isAuth: boolean;
}

const initalState: IInitialState = {
  user: {},
  isAuth: !!localStorage.getItem('token'),
};

export default (state: IInitialState = initalState, action: IAction) => {
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
