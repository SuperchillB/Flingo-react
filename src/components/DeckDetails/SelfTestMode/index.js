import React, { useState, useContext } from 'react';
import ToggleSwitch from '../../common/ToggleSwitch';
import { deckState } from '../../../containers/App';

const SelfTestMode = () => {
  const { deckContext, updateContext } = useContext(deckState);
  const [isActive, setIsActive] = useState(false);
  const handleSelfTestMode = (value) => {
    setIsActive(value);
    updateContext('selfTestModeActive', value);
    updateContext('selfTestModeHideLeft', false);
  };

  const handleSelfTestModeSide = (value) => {
    updateContext('selfTestModeHideLeft', !value);
  };

  // selfTestModeActive: false,
  // selfTestModeSide: 'to',

  return (
    <div>
      <ToggleSwitch
        idAttr="selfTestMode"
        labelLeft="Self-Test Mode"
        type="single"
        onClickHandler={(e) => handleSelfTestMode(e.target.checked)}
      />
      {deckContext.selfTestModeActive && (
        <ToggleSwitch
          idAttr="selfTestMode"
          labelLeft="Hide left"
          labelRight="Hide right"
          type="double"
          onClickHandler={(e) => handleSelfTestModeSide(e.target.checked)}
        />
      )}
    </div>
  );
};

export default SelfTestMode;
