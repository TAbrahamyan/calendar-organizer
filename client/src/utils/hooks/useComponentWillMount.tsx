import React from 'react';

const useComponentWillMount = (func: any): void => {
  const willMount = React.useRef(true);

  if (willMount.current) {
    func();
  }

  willMount.current = false;
};

export default useComponentWillMount;
