import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import CustomText from './CustomText';

import {FamilyRole} from '../../lib/model/i-family';

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
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setDropdownOpen(!isDropdownOpen)}>
        <CustomText weight="Bold" style={styles.roleText}>
          {role}
        </CustomText>
        <Ionicons
          name={isDropdownOpen ? 'chevron-up' : 'chevron-down'}
          size={16}
          color="#A34D2A"
        />
      </TouchableOpacity> */}

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
    paddingHorizontal: 16,
    height: 56,
    width: '100%',
    justifyContent: 'space-between',
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: '#E9E9EC',
    marginHorizontal: 20,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#222225',
    fontFamily: 'NanumGothicBold',
  },
  picker: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 8,
    zIndex: 10,
  },
});

export default MemberInput;
