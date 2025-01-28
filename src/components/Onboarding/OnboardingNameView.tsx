import {Platform, Pressable, StyleSheet, View} from 'react-native';
import CustomText from '../shared/CustomText';
import Character from '../shared/Character';
import CustomInput from '../shared/CustomInput';
import {useFormContext} from 'react-hook-form';

interface OnboardingNameViewProps {
  onNextPress: () => void;
}

const OnboardingNameView = ({onNextPress}: OnboardingNameViewProps) => {
  const {
    watch,
    setValue,
    setError,
    clearErrors,
    formState: {errors},
  } = useFormContext();

  const familyName = watch('familyName');
  const isFamilyNameEmpty = familyName.trim() === '';

  const koreanRegex = /^[가-힣ㄱ-ㅎㅏ-ㅣ]+$/;

  //FIXME: Should add duplicate name check logic after backend implementation
  const handleChangeText = (text: string) => {
    setValue('familyName', text);
    if (text.trim() === '') {
      clearErrors('familyName');
    } else if (!koreanRegex.test(text)) {
      setError('familyName', {message: '한글만 입력 가능합니다.'});
    } else {
      clearErrors('familyName');
    }
  };

  const isNextDisabled = isFamilyNameEmpty || !!errors.familyName;

  return (
    <>
      <View>
        <View style={styles.text}>
          <CustomText
            weight="ExtraBold"
            style={{fontSize: 28, marginTop: 8, color: '#222225'}}>
            우리 가족의 공간,
          </CustomText>
          <CustomText
            weight="ExtraBold"
            style={{fontSize: 28, color: '#222225'}}>
            어떤 이름이 좋을까요?
          </CustomText>
        </View>

        <View style={{width: '100%', paddingHorizontal: 16, marginTop: 36}}>
          <CustomInput
            placeholder="가족 이름을 입력해주세요"
            value={familyName}
            maxLength={15}
            onChangeText={handleChangeText}
          />
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              marginTop: 16,
            }}>
            {errors.familyName ? (
              <CustomText weight="Bold" style={styles.errorText}>
                {String(errors.familyName.message)}
              </CustomText>
            ) : (
              <CustomText weight="Bold" style={styles.captionText}>
                최대 15자 / 공백, 영문, 숫자, 특수기호 불가
              </CustomText>
            )}
          </View>
        </View>
      </View>
      <Character type="close" />
      <Pressable
        disabled={isNextDisabled}
        onPress={onNextPress}
        style={[
          styles.nextButton,
          {paddingBottom: Platform.OS === 'ios' ? 52 : 24},
          isNextDisabled && {backgroundColor: '#939396'},
        ]}>
        <CustomText
          weight="ExtraBold"
          style={{
            color: '#fff',
            fontSize: 20,
          }}>
          다음으로
        </CustomText>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    alignItems: 'center',
    marginTop: 72,
  },
  nextButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: '#222225',
    alignItems: 'center',
    paddingTop: 24,
  },
  characterContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: -430,
    alignItems: 'center',
    overflow: 'hidden',
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

export default OnboardingNameView;
