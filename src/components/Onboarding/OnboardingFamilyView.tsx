import {Pressable, StyleSheet, View} from 'react-native';
import CustomText from '../shared/CustomText';

import {useFormContext} from 'react-hook-form';
import MemberInput from '../shared/MemberInput';
import {FamilyRole, IMember} from '../../lib/model/i-family';
import {Key} from 'react';

import Plus from '../../assets/icons/plus.svg';
import {ScrollView} from 'react-native-gesture-handler';

interface OnboardingFamilyViewProps {
  onAccessibleIndexChange: (accessibleIndex: number) => void;
}

const OnboardingFamilyView = ({
  onAccessibleIndexChange,
}: OnboardingFamilyViewProps) => {
  const {watch, setValue} = useFormContext();

  const familyName = watch('familyName');
  const members = watch('members');

  const handleHeroRoleChange = (role: FamilyRole) => {
    setValue('hero.role', role);
  };

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
            구성원을 알려주세요
          </CustomText>
        </View>

        <ScrollView
          style={{
            width: '100%',
            paddingHorizontal: 16,
            marginTop: 36,
            maxHeight: 232,
          }}>
          {members.map((member: IMember, index: Key | null | undefined) => (
            <View
              style={{
                marginBottom: index === members.length - 1 ? 0 : 12,
              }}>
              <MemberInput
                key={index}
                role={member.role}
                onRoleChange={role => {
                  setValue(`members[${index}].role`, role);
                }}
                name={member.name}
                onNameChange={name => {
                  setValue(`members[${index}].name`, name);
                }}
                nickname={member.nickname ?? ''}
                onNicknameChange={nickname => {
                  setValue(`members[${index}].nickname`, nickname);
                }}
              />
            </View>
          ))}
        </ScrollView>
        <View style={{width: '100%', marginTop: 12, paddingHorizontal: 16}}>
          <Pressable
            onPress={() => {
              setValue('members', [
                ...members,
                {
                  role: 'relative',
                  name: '',
                  nickname: '',
                },
              ]);
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 24,
                borderRadius: 50,
                borderWidth: 1,
                borderColor: '#CE5419',
              }}>
              <Plus width={16} height={16} />
              <CustomText
                weight="ExtraBold"
                style={{fontSize: 18, color: '#CE5419'}}>
                가족 추가하기
              </CustomText>
            </View>
          </Pressable>
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

export default OnboardingFamilyView;
