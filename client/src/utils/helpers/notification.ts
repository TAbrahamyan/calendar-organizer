import { message } from 'antd';

interface INotificaction {
  type: string;
  msg: string;
}

export const notification = ({ type, msg }: INotificaction): void => {
  (message as any)[type](msg);
};
