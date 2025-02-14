import React, {useState} from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {CustomText} from '../../shared';
import Calendar from '../../../assets/icons/calendar.svg';

const MemoryDatePicker = () => {
  const [date, setDate] = useState(new Date());
  const [tempDate, setTempDate] = useState(new Date()); // iOS에서 변경할 임시 날짜
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    if (selectedDate) {
      setTempDate(selectedDate); // 변경은 임시로 저장 (iOS)
    }
  };

  const confirmDate = () => {
    setDate(tempDate); // "완료" 버튼을 누르면 최종 확정
    setShowPicker(false);
  };

  const cancelDate = () => {
    setTempDate(date); // 기존 날짜로 복구
    setShowPicker(false);
  };

  return (
    <View>
      <TouchableOpacity
        style={styles.datePickerContainer}
        onPress={() => setShowPicker(true)}>
        <CustomText weight="ExtraBold" style={styles.dateText}>
          {date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </CustomText>
        <Calendar width={24} height={24} />
      </TouchableOpacity>

      {/* iOS 전용 모달 */}
      {Platform.OS === 'ios' && showPicker && (
        <Modal
          transparent
          animationType="none"
          visible={showPicker}
          onRequestClose={cancelDate}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={tempDate}
                mode="date"
                display="spinner"
                onChange={onChange}
              />
              {/* 완료 및 취소 버튼 */}
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={cancelDate}>
                  <CustomText style={styles.cancelButton}>취소</CustomText>
                </TouchableOpacity>
                <TouchableOpacity onPress={confirmDate}>
                  <CustomText style={styles.confirmButton}>완료</CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}

      {/* Android에서는 기존 방식 유지 */}
      {Platform.OS === 'android' && showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  datePickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F9',
    padding: 24,
    borderRadius: 50,
    justifyContent: 'space-between',
    marginTop: 8,
  },
  dateText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

    alignItems: 'center',
    padding: 16,
    paddingBottom: 24,
  },
  modalButtons: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingHorizontal: 16,
  },
  cancelButton: {
    color: '#FF4444',
    fontSize: 16,
  },
  confirmButton: {
    color: '#007AFF',
    fontSize: 16,
  },
});

export default MemoryDatePicker;
