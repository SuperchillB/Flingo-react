import React, { useState } from 'react';
import ToggleSwitch from '../../common/ToggleSwitch';

const SelfTestMode = ({ onToggleSelfTestMode }) => {
  const [isActive, setIsActive] = useState(false);
  const selfTestModehandler = (value) => {
    setIsActive(value);
  };

  return (
    <div>
      <ToggleSwitch
        idAttr="selfTestMode"
        labelLeft="Self-Test Mode"
        type="single"
        onClickHandler={(e) => selfTestModehandler(e.target.checked)}
      />
      {isActive && (
        <ToggleSwitch
          idAttr="selfTestMode"
          labelLeft="Hide left"
          labelRight="Hide right"
          type="double"
          onClickHandler={(e) => onToggleSelfTestMode(e.target.checked)}
        />
      )}
    </div>
  );
};

export default SelfTestMode;
