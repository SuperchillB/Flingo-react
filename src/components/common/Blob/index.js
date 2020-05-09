import React, { useEffect } from 'react';
import BlobSVG from '../../../assets/flingo-blob.svg';
import { globalHistory } from '@reach/router';
import styles from './styles.module.scss';

const Blob = () => {
  useEffect(() => {
    globalHistory.listen((data) => {
      console.log(data);
      if (data.action === 'PUSH') {
        const randX = Math.floor(Math.random() * 81) - 40; // -40 => 40
        const randY = Math.floor(Math.random() * 47) - 16; // -16 => 30
        const randZ = Math.floor(Math.random() * 91) - 45; // -45deg => 45deg
        const randScale = parseFloat(
          (Math.random() * (1.1 - 0.9) + 0.9).toFixed(2),
        );
        document.getElementById(
          'blob',
        ).style.transform = `translate(${randX}rem, ${randY}rem) rotate(${randZ}deg) scale(${randScale})`;
        // ).style.transform = `scale(${randScale})`;
      }
    });
  }, []);

  return <BlobSVG id="blob" className={styles.blob} />;
};

export default Blob;
