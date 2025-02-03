import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {IMemoryRegister} from '../../../lib/model/i-memory';
import {useFormContext} from 'react-hook-form';
import {CustomText} from '../../shared';

interface MemberMemoryTextareaProps {
  currentMemoryIndex: number;
}

const MemberMemoryTextarea = ({
  currentMemoryIndex,
}: MemberMemoryTextareaProps) => {
  const {watch, setValue} = useFormContext<IMemoryRegister>();

  const text = watch(`events.${currentMemoryIndex}.description`);

  const handleTextChange = (text: string) => {
    setValue(`events.${currentMemoryIndex}.description`, text);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textarea}
        multiline={true}
        numberOfLines={2}
        placeholder="추억에 대해 간략하게 설명해주세요."
        placeholderTextColor="#C5C5C7"
        value={text}
        maxLength={150}
        onChangeText={handleTextChange}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 8,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <CustomText
            weight="Bold"
            style={{
              fontSize: 14,
              color: '#77777A',
            }}>
            {text.length}
          </CustomText>
          <CustomText
            weight="Bold"
            style={{
              fontSize: 14,
              color: '#C5C5C7',
            }}>
            /150자
          </CustomText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 8,
    height: 115,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#F7F7F9',
  },
  textarea: {
    fontFamily: 'NanumGothicBold',
    fontSize: 16,
    textAlignVertical: 'top',
    lineHeight: 24,
    height: 48,
    paddingVertical: 0,
    includeFontPadding: false,
  },
});

export default MemberMemoryTextarea;
