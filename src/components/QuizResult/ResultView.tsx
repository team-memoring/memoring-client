import React from 'react';

import {CustomText} from '../shared';

const ResultView = ({
  selectedAnswer,
  answer,
}: {
  selectedAnswer: string;
  answer: string;
}) => {
  return (
    <>
      <CustomText
        weight="ExtraBold"
        style={{
          fontSize: 28,
          color: selectedAnswer === answer ? '#CE5419' : '#939396',
          paddingTop: 120,
          paddingHorizontal: 46.5,
          textAlign: 'center',
        }}>
        {selectedAnswer === answer ? '정답이에요!' : '아쉬워요...'}
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
        {selectedAnswer}
      </CustomText>
    </>
  );
};

export default ResultView;
