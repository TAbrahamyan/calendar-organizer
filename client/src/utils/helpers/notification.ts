import { message } from 'antd';

export const notification = ({ type, msg }: any): void => {
  (message as any)[type](msg);
};
