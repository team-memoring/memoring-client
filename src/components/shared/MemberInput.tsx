import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import {FamilyRole, familyRoleMap} from '../../lib/model/i-family';

import DropDownPicker from './DropDownPicker';

interface MemberInputProps {
  role: string;
  onRoleChange: (role: FamilyRole) => void;
  name: string;
  onNameChange: (text: string) => void;
  nickname: string;
  onNicknameChange: (text: string) => void;
}

const MemberInput: React.FC<MemberInputProps> = ({
  role,
  onRoleChange,
  name,
  onNameChange,
  nickname,
  onNicknameChange,
}) => {
  const roles = Object.entries(familyRoleMap).map(([key, value]) => ({
    label: value,
    value: key as FamilyRole,
  }));

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <DropDownPicker
          items={roles}
          selectedValue={role}
          onValueChange={value => onRoleChange(value as FamilyRole)}
        />
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* 성함 입력 */}
      <TextInput
        style={styles.input}
        placeholder="성함"
        placeholderTextColor="#C5C5C7"
        value={name}
        onChangeText={onNameChange}
      />

      {/* Divider */}
      <View style={styles.divider} />

      {/* 애칭 입력 */}
      <TextInput
        style={styles.input}
        placeholder="애칭"
        placeholderTextColor="#C5C5C7"
        value={nickname}
        onChangeText={onNicknameChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    paddingHorizontal: 24,
    paddingVertical: 24,

    width: '100%',
    justifyContent: 'space-between',
  },
  dropdownContainer: {
    flex: 1,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: '#E9E9EC',
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: '#222225',
    fontFamily: 'NanumGothicBold',
  },
  roleText: {
    fontSize: 18,
    color: '#CE5419',
    fontFamily: 'NanumGothicBold',
    minWidth: 66,
  },
});

export default MemberInput;
