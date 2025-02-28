import React from 'react';

import {CustomText} from '../shared';

const DummyResultView = ({
  initialReact,
  mainReact,
}: {
  initialReact: string;
  mainReact: string;
}) => {
  return (
    <>
      <CustomText
        weight="ExtraBold"
        style={{
          fontSize: 28,
          color: '#CE5419',
          paddingTop: 120,
          paddingHorizontal: 46.5,
          textAlign: 'center',
        }}>
        {initialReact}
      </CustomText>
      <CustomText
        weight="ExtraBold"
        style={{
          fontSize: 36,
          color: '222225',
          paddingTop: 6,
          paddingHorizontal: 46.5,
          textAlign: 'center',
        }}>
        {mainReact}
      </CustomText>
    </>
  );
};

export default DummyResultView;
