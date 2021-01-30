import React from 'react';
import TopRight from '../../assets/images/login-signup-top-right.png';
import BottomRight from '../../assets/images/login-signup-bottom-right.png';
import BottomLeft from '../../assets/images/login-signup-bottom-left.png';

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
      <img src={TopRight} alt="top-right" style={imagesStyle({ bottom: 'null', right: '0', height: '200px' })} />
      <img src={BottomRight} alt="bottom-right" style={imagesStyle({ bottom: '0', right: '0', height: '200px' })} />
      <img src={BottomLeft} alt="bottom-left" style={imagesStyle({ bottom: '0', right: 'null', height: '600px' })} />
    </>
  );
};
