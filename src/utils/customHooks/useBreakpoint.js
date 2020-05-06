import React, { useContext } from 'react';
import { BreakpointContext } from '../../containers/BreakpointProvider';
import { isEmpty, isObject } from '../dataStructureUtils';

const useBreakpoint = () => {
  const context = useContext(BreakpointContext);
  if (!context || !isObject(context) || isEmpty(context)) {
    throw new Error('useBreakpoint must be used within BreakpointProvider');
  }
  return context;
};

export default useBreakpoint;
