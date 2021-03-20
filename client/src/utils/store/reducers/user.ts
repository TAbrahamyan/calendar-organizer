import { GET_ME, VERIFICATION_MODAL } from '../../constants/actionTypes';
import { IUser, IAction } from '../../types';

interface IInitialState {
  user: IUser | object;
  isAuth: boolean;
  verificationModal: boolean;
}

const initalState: IInitialState = {
  user: {},
  isAuth: !!localStorage.getItem('token'),
  verificationModal: false,
};

const userReducer = (state: IInitialState = initalState, action: IAction) => {
  switch (action.type) {
    case GET_ME:
      return {
        ...state,
        user: action.payload,
        isAuth: true,
      };
    case VERIFICATION_MODAL:
      return {
        ...state,
        verificationModal: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
