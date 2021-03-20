import React from 'react';
import { useDispatch } from 'react-redux';
import { fetchVerifyEmail } from '../../utils/store/actions/user';
import { useComponentWillMount } from '../../utils/hooks';

const EmailVerification: React.FC = () => {
  const dispatch = useDispatch();

  useComponentWillMount(() => {
    const emailToken = window.location.href.split('=')[1];

    if (emailToken && emailToken.length === 128) {
      dispatch(fetchVerifyEmail(emailToken));
    }
  });

  return <></>;
};

export default EmailVerification;
