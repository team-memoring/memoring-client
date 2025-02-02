import {StyleSheet, View} from 'react-native';

import {useFormContext} from 'react-hook-form';
import {CharacterType} from '../../shared/Character';
import {CustomInput, CustomText} from '../../shared';

interface MemberMemoryNameViewProps {
  onCharacterTypeChange: (type: CharacterType) => void;
  onAccessibleIndexChange: (accessibleIndex: number) => void;
}

const MemberMemoryNameView = ({
  onCharacterTypeChange,
  onAccessibleIndexChange,
}: MemberMemoryNameViewProps) => {
  const {
    watch,
    setValue,
    setError,
    clearErrors,
    formState: {errors},
  } = useFormContext();

  const title = watch('title');

  const koreanRegex = /^[가-힣ㄱ-ㅎㅏ-ㅣ ]+$/;

  //FIXME: Should add duplicate name check logic after backend implementation
  const handleChangeText = (text: string) => {
    setValue('title', text);
    if (text.trim() === '') {
      clearErrors('title');
      onCharacterTypeChange('close');
      onAccessibleIndexChange(0);
    } else if (!koreanRegex.test(text)) {
      setError('title', {
        message: '최대 15자 / 영문, 숫자, 특수기호 불가',
      });
      onCharacterTypeChange('sad');
      onAccessibleIndexChange(0);
    } else {
      clearErrors('title');
      onCharacterTypeChange('close');
      onAccessibleIndexChange(1);
    }
  };

  return (
    <>
      <View>
        <View style={styles.text}>
          <CustomText
            weight="ExtraBold"
            style={{fontSize: 28, marginTop: 0, color: '#222225'}}>
            새로운 추억의 제목은
          </CustomText>
          <CustomText
            weight="ExtraBold"
            style={{fontSize: 28, color: '#222225'}}>
            무엇인가요?
          </CustomText>
        </View>

        <View style={{width: '100%', paddingHorizontal: 16, marginTop: 36}}>
          <CustomInput
            placeholder="이벤트 명을 입력해주세요"
            value={title}
            error={!!errors.title}
            maxLength={15}
            onChangeText={handleChangeText}
          />
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: 16,
            }}>
            {errors.title ? (
              <CustomText weight="Bold" style={styles.errorText}>
                {String(errors.title.message)}
              </CustomText>
            ) : (
              <CustomText weight="Bold" style={styles.captionText}>
                최대 15자 / 영문, 숫자, 특수기호 불가
              </CustomText>
            )}
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    marginTop: 72,
  },
  captionText: {
    fontSize: 16,
    color: '#AAAAAA',
  },
  errorText: {
    fontSize: 16,
    color: '#CE5419',
  },
});

export default MemberMemoryNameView;
