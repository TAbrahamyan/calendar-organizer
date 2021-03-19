export interface IUser {
  _v: number;
  _id: string;
  email: string;
  fullName: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  emailToken: string;
  googleId: string;
  facebookUserID: string;
  isVerified: boolean;
  picture: '';
  tasks: ITasks;
}

export interface ITasks {
  _v: number;
  _id: string;
  title: string;
  description: string;
  createdDay: string;
  createdMonth: string;
  owner: string;
  completed: boolean;
}

export interface ICalendar {
  year: number;
  weekdays: string[];
  selectedDay: string;
  month: string;
  days: string[][];
}

export interface IAction {
  type: string;
  payload: any;
}
