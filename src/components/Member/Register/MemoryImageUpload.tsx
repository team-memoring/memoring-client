import {
  Alert,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {
  ImageLibraryOptions,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import {Control, useController} from 'react-hook-form';
import {IMemoryRegister} from '../../../lib/model/i-memory';

import Camera from '../../../assets/icons/camera.svg';
import Xmark from '../../../assets/icons/xmark.svg';

import {CustomText} from '../../shared';

interface MemoryImageUploadProps {
  control: Control<IMemoryRegister>;
  eventIndex: number;
}

const MemoryImageUpload = ({control, eventIndex}: MemoryImageUploadProps) => {
  const {
    field: {value = [], onChange},
  } = useController({
    control,
    name: `events.${eventIndex}.images`,
  });

  const pickImage = async () => {
    if (value.length >= 5) {
      Alert.alert('최대 5개의 이미지만 업로드할 수 있습니다.');
      return;
    }

    const hasPermission = await requestPermission();
    if (!hasPermission) {
      Alert.alert('갤러리 접근 권한이 필요합니다.');
      return;
    }

    const options: ImageLibraryOptions = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    try {
      const response = await new Promise<ImagePickerResponse>(resolve => {
        launchImageLibrary(options, resolve);
      });

      if (!response.assets || response.assets.length === 0) {
        return;
      }

      const newImageUri = response.assets[0].uri;
      if (newImageUri) {
        const updatedUris = [...value, newImageUri]; // 기존 value 배열 + 새 이미지 URI
        onChange(updatedUris); // react-hook-form 상태 업데이트
      }
    } catch (error) {
      console.log('ImagePicker Error:', error);
    }
  };

  const removeImage = (index: number) => {
    const updatedUris = [...value];
    updatedUris.splice(index, 1);
    onChange(updatedUris);
  };

  const requestPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
          {
            title: '이미지 접근 권한',
            message: '이미지를 업로드하기 위해 갤러리 접근 권한이 필요합니다.',
            buttonNeutral: '나중에 묻기',
            buttonNegative: '거부',
            buttonPositive: '허용',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    }
    return true;
  };

  return (
    <>
      {value.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.imageContainer}>
            {value.map((uri, index) => (
              <View
                key={uri}
                style={[
                  styles.imageWrapper,
                  {
                    marginRight: index !== value.length - 1 ? 8 : 0,
                  },
                ]}>
                <Image source={{uri}} style={styles.image} />
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeImage(index)}>
                  <Xmark width={16} height={16} />
                </TouchableOpacity>
              </View>
            ))}
            {value.length < 5 && (
              <TouchableOpacity style={styles.addButton} onPress={pickImage}>
                <Camera width={24} height={24} />
                <CustomText
                  weight="Bold"
                  style={{
                    fontSize: 14,
                    lineHeight: 19,
                    color: '#C5C5C7',
                    marginTop: 4,
                  }}>
                  {`${value.length}/${5}개`}
                </CustomText>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      ) : (
        <Pressable style={styles.container} onPress={pickImage}>
          <Camera width={24} height={24} />
          <CustomText
            weight="Bold"
            style={{
              fontSize: 14,
              lineHeight: 19,
              color: '#C5C5C7',
              marginTop: 4,
            }}>
            사진 최대 5개
          </CustomText>
        </Pressable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#F7F7F9',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 108,
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWrapper: {
    position: 'relative',
  },
  image: {
    width: 108,
    height: 108,
    borderRadius: 16,
  },
  removeButton: {
    position: 'absolute',
    right: 8,
    top: 8,
    backgroundColor: '#FFFFFF99',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    width: 108,
    height: 108,
    borderRadius: 16,
    backgroundColor: '#F7F7F9',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  addButtonText: {
    fontSize: 32,
    color: '#666666',
  },
});

export default MemoryImageUpload;
