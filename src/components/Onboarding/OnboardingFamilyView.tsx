import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import CustomText from '../shared/CustomText';

import {useFormContext} from 'react-hook-form';
import MemberInput from '../shared/MemberInput';
import {FamilyRole, IMember} from '../../lib/model/i-family';
import {Key, useEffect} from 'react';

import Plus from '../../assets/icons/plus.svg';

interface OnboardingFamilyViewProps {
  onAccessibleIndexChange: (accessibleIndex: number) => void;
}

const OnboardingFamilyView = ({
  onAccessibleIndexChange,
}: OnboardingFamilyViewProps) => {
  const {watch, setValue} = useFormContext();

  const familyName = watch('familyName');
  const members = watch('members');

  const handleMemberRoleChange = (role: FamilyRole, index: number) => {
    setValue(`members.${index}.role`, role);
  };

  const handleMemberNameChange = (text: string, index: number) => {
    setValue(`members.${index}.name`, text);
  };

  const handleMemberNicknameChange = (text: string, index: number) => {
    setValue(`members.${index}.nickname`, text);
  };

  useEffect(() => {
    if (members.length >= 1) {
      const isAllFilled = members.every(
        (member: IMember) => member.name.trim() !== '',
      );

      if (isAllFilled) {
        onAccessibleIndexChange(3);
      } else {
        onAccessibleIndexChange(2);
      }
    }
  }, [members, onAccessibleIndexChange]);

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

        <FlatList
          style={{
            width: '100%',
            paddingHorizontal: 16,
            marginTop: 36,
            maxHeight: 232,
          }}
          data={members}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item, index}) => (
            <View style={{marginBottom: index === members.length - 1 ? 0 : 12}}>
              <MemberInput
                role={item.role}
                onRoleChange={role => handleMemberRoleChange(role, index)}
                name={item.name}
                onNameChange={name => handleMemberNameChange(name, index)}
                nickname={item.nickname ?? ''}
                onNicknameChange={nickname =>
                  handleMemberNicknameChange(nickname, index)
                }
              />
            </View>
          )}
        />

        <View style={{width: '100%', marginTop: 12, paddingHorizontal: 16}}>
          <Pressable
            style={({pressed}) => [
              pressed && styles.addButtonPressed, // ✅ 눌렸을 때 스타일 추가
            ]}
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
              style={[
                {
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 24,
                  borderRadius: 50,
                  borderWidth: 1,
                  borderColor: '#CE5419',
                },
              ]}>
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
  addButtonPressed: {
    opacity: 0.5,
  },
});

export default OnboardingFamilyView;
