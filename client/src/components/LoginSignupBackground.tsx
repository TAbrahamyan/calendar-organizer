import React from 'react';
import TopRight from '../assets/images/login-signup-top-right.png';
import BottomLeft from '../assets/images/login-signup-bottom-left.png';
import BottomRight from '../assets/images/login-signup-bottom-right.png';

interface ICssPropertiesValue {
  bottom: string;
  right: string;
  height: string;
}

export default () => {
  const imagesStyle = (cssPropertiesValue: ICssPropertiesValue): React.CSSProperties => ({
    position: 'fixed',
    bottom: cssPropertiesValue.bottom,
    right: cssPropertiesValue.right,
    height: cssPropertiesValue.height,
  });

  return (
    <>
      <img src={TopRight} style={imagesStyle({ bottom: 'null', right: '0', height: '200px' })} />
      <img src={BottomLeft} style={imagesStyle({ bottom: '0', right: 'null', height: '600px' })} />
      <img src={BottomRight} style={imagesStyle({ bottom: '0', right: '0', height: '200px' })} />
    </>
  );
};
