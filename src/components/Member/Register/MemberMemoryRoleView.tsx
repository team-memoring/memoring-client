import {StyleSheet, View} from 'react-native';

import {useFormContext} from 'react-hook-form';

import {CustomText} from '../../shared';
import MemberRoleSelector from './MemberRoleSelector';

interface MemberMemoryRoleViewProps {
  onAccessibleIndexChange: (accessibleIndex: number) => void;
}

const MemberMemoryRoleView = ({
  onAccessibleIndexChange,
}: MemberMemoryRoleViewProps) => {
  return (
    <>
      <View>
        <View style={styles.text}>
          <CustomText
            weight="ExtraBold"
            style={{fontSize: 28, color: '#222225'}}>
            어떤 가족 구성원과
          </CustomText>
          <CustomText
            weight="ExtraBold"
            style={{fontSize: 28, color: '#222225'}}>
            함께한 추억인가요?
          </CustomText>
        </View>

        <View style={{width: '100%', paddingHorizontal: 16, marginTop: 36}}>
          <MemberRoleSelector
            onAccessibleIndexChange={onAccessibleIndexChange}
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

export default MemberMemoryRoleView;
