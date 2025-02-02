import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Pressable,
  findNodeHandle,
  UIManager,
  ScrollView,
} from 'react-native';

import {useFormContext} from 'react-hook-form';

import {
  FamilyRole,
  familyRoleList,
  familyRoleMap,
} from '../../../lib/model/i-family';
import {IMemoryRegister} from '../../../lib/model/i-memory';
import {CustomText} from '../../shared';

import Search from '../../../assets/icons/search.svg';
import AddPlus from '../../../assets/icons/add_plus.svg';
import Xmark from '../../../assets/icons/xmark.svg';
import Modal from '../../shared/Modal';
import LinearGradient from 'react-native-linear-gradient';

interface MemberRoleSelectorProps {
  onAccessibleIndexChange: (accessibleIndex: number) => void;
}

const MemberRoleSelector = ({
  onAccessibleIndexChange,
}: MemberRoleSelectorProps) => {
  const {watch, setValue} = useFormContext<IMemoryRegister>();

  const roles = watch('roles');

  const [selectedRoles, setSelectedRoles] = useState<FamilyRole[]>([]);

  const [isOpen, setIsOpen] = useState(false);

  const [containerLayout, setContainerLayout] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const triggerRef = useRef<View>(null);

  const isRoleEmpty = roles.length === 0;

  const measureTrigger = () => {
    const handle = triggerRef.current && findNodeHandle(triggerRef.current);
    if (handle) {
      UIManager.measure(handle, (x0, y0, width, height, x, y) => {
        setContainerLayout({x, y, width, height});
      });
    }
  };

  const handleOpen = () => {
    measureTrigger();
    setIsOpen(true);
  };

  const toggleRole = (role: FamilyRole) => {
    const currentRoles = [...roles];
    const roleIndex = currentRoles.indexOf(role);

    if (roleIndex > -1) {
      currentRoles.splice(roleIndex, 1);
    } else {
      currentRoles.push(role);
    }

    setSelectedRoles(currentRoles);

    setValue('roles', currentRoles, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const toggleSelectedRole = (role: FamilyRole) => {
    const currentRoles = [...selectedRoles];
    const roleIndex = currentRoles.indexOf(role);

    if (roleIndex === -1) {
      currentRoles.push(role);
    }

    setSelectedRoles(currentRoles);
  };

  const handleAddRole = () => {
    const currentSelectedRoles = [...selectedRoles];

    setValue('roles', currentSelectedRoles, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setIsOpen(false);
  };

  useEffect(() => {
    onAccessibleIndexChange(isRoleEmpty ? 1 : 2);
  }, [isRoleEmpty, onAccessibleIndexChange]);

  return (
    <>
      <View style={styles.container} ref={triggerRef}>
        {isRoleEmpty ? (
          <Pressable onPress={handleOpen}>
            <CustomText
              weight="Bold"
              style={{fontSize: 18, color: '#C5C5C7', lineHeight: 40}}>
              함께한 가족을 추가해주세요
            </CustomText>
          </Pressable>
        ) : (
          <View style={{flex: 1, position: 'relative'}}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{
                flexDirection: 'row',
              }}>
              {roles.map((role, index) => (
                <View
                  key={role}
                  style={[
                    styles.selectTag,
                    {
                      backgroundColor: '#F7F7F9',
                      marginRight: index !== roles.length - 1 ? 8 : 0,
                    },
                  ]}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 4,
                    }}>
                    <CustomText
                      weight="ExtraBold"
                      style={[
                        {fontSize: 15},
                        roles.includes(role)
                          ? {color: '#222225'}
                          : {color: '#222225'},
                      ]}>
                      {familyRoleMap[role]}
                    </CustomText>
                    <Pressable onPress={() => toggleRole(role)}>
                      <Xmark width={16} height={16} />
                    </Pressable>
                  </View>
                </View>
              ))}
            </ScrollView>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0)', '#FFFFFF']}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              style={{
                position: 'absolute',
                right: 0,
                top: 0,
                bottom: 0,
                width: 10,
              }}
              pointerEvents="none"
            />
          </View>
        )}
        <Pressable onPress={handleOpen}>
          <Search width={32} height={32} />
        </Pressable>
      </View>

      <Modal
        visible={isOpen}
        onClose={() => setIsOpen(false)}
        position={{
          top: containerLayout.y + containerLayout.height + 12,
          left: 16,
          right: 16,
        }}>
        <View
          style={[
            styles.rolesContainer,
            {paddingVertical: 16, paddingHorizontal: 24},
          ]}>
          {familyRoleList.map(role => (
            <Pressable
              key={role}
              onPress={() => toggleSelectedRole(role)}
              style={
                selectedRoles.includes(role)
                  ? [styles.selectItem, styles.selectedItem]
                  : [styles.selectItem, styles.notSelectedItem]
              }>
              <CustomText
                weight="ExtraBold"
                style={[
                  {fontSize: 15},
                  selectedRoles.includes(role)
                    ? {color: '#CE5419'}
                    : {color: '#222225'},
                ]}>
                {familyRoleMap[role]}
              </CustomText>
            </Pressable>
          ))}
          <View
            style={{
              width: '100%',
              marginTop: 12,
            }}>
            <Pressable
              style={{
                width: '100%',
                backgroundColor: '#222225',
                paddingVertical: 11.5,
                borderRadius: 50,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={handleAddRole}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 4,
                }}>
                <CustomText
                  weight="ExtraBold"
                  style={{color: '#fff', fontSize: 15}}>
                  추가하기
                </CustomText>
                <AddPlus width={11.5} height={11.5} />
              </View>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 60,
    paddingLeft: 24,
    paddingRight: 22,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rolesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  selectItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    alignSelf: 'flex-start',
    borderRadius: 50,
    margin: 4,
  },
  selectedItem: {
    backgroundColor: 'rgba(206, 84, 25, 0.16)',
    borderColor: '#CE5419',
  },
  notSelectedItem: {
    backgroundColor: '#F7F7F9',
    borderColor: '#F7F7F9',
  },
  selectTag: {
    borderRadius: 50,
    paddingLeft: 16,
    paddingRight: 12,
    paddingVertical: 11.5,
    alignSelf: 'flex-start',
  },
});

export default MemberRoleSelector;
