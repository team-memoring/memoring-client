import {Platform, Pressable, StyleSheet, View} from 'react-native';
import CustomText from '../shared/CustomText';
import {CharacterType} from '../shared/Character';
import CustomInput from '../shared/CustomInput';
import {useFormContext} from 'react-hook-form';
import MemberInput from '../shared/MemberInput';

interface OnboardingHeroViewProps {
  onCharacterTypeChange: (type: CharacterType) => void;
  onAccessibleIndexChange: (accessibleIndex: number) => void;
}

const OnboardingHeroView = ({
  onCharacterTypeChange,
  onAccessibleIndexChange,
}: OnboardingHeroViewProps) => {
  const {
    watch,
    setValue,
    setError,
    clearErrors,
    formState: {errors},
  } = useFormContext();

  const familyName = watch('familyName');
  const heroName = watch('hero.name');
  const heroNickname = watch('hero.nickname');

  const koreanRegex = /^[가-힣ㄱ-ㅎㅏ-ㅣ]+$/;

  const handleHeroNameChange = (text: string) => {
    setValue('hero.name', text);
    if (text.trim() === '') {
      onAccessibleIndexChange(1);
    } else {
      onAccessibleIndexChange(2);
    }
  };

  const handleHeroNicknameChange = (text: string) => {
    setValue('hero.nickname', text);
  };

  return (
    <>
      <View>
        <View style={styles.text}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <CustomText
              weight="ExtraBold"
              style={{fontSize: 28, marginTop: 8, color: '#CE5419'}}>
              {`'${familyName}'`}
            </CustomText>
            <CustomText
              weight="ExtraBold"
              style={{fontSize: 28, marginTop: 8, color: '#222225'}}>
              의
            </CustomText>
          </View>
          <CustomText
            weight="ExtraBold"
            style={{fontSize: 28, color: '#222225'}}>
            주인공을 알려주세요
          </CustomText>
        </View>

        <View style={{width: '100%', paddingHorizontal: 16, marginTop: 36}}>
          <MemberInput
            role="grandfather"
            onRoleChange={() => {}}
            name={heroName}
            onNameChange={handleHeroNameChange}
            nickname={heroNickname}
            onNicknameChange={handleHeroNicknameChange}
          />
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
});

export default OnboardingHeroView;
