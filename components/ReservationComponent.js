import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Picker,
  Switch,
  Button,
  //   Modal,
  Alert
} from 'react-native';
// import { Card } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import * as Animatable from 'react-native-animatable';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';

class Reservation extends Component {
  constructor(props) {
    super(props);

    this.state = {
      guests: 1,
      smoking: false,
      date: ''
      //   showModal: false
    };
  }

  //   toggleModal() {
  //     this.setState({ showModal: !this.state.showModal });
  //   }

  resetForm() {
    this.setState({
      guests: 1,
      smoking: false,
      date: ''
      //   showModal: false
    });
  }

  static navigationOptions = {
    title: 'Reserve Table'
  };

  obtainCalendarPermission() {
    // let permission = await Permissions.getAsync(Permissions.CALENDAR);
    // if (permission.status !== 'granted') {
    //   Alert.alert('Permission not granted to use calendar');
    // }
    // return permission;
    Calendar.requestPermissionsAsync().then(({ status }) => {
      if (status === 'granted') {
        console.log('Here are all your calendars:');
        Calendar.getCalendarsAsync().then(calendars =>
          console.log('calenders received')
        );
      } else {
        Alert.alert('Permission not granted to use calendar (' + status + ')');
      }
    });
  }

  async addReservationToCalendar(date) {
    await this.obtainCalendarPermission();
    defaultCalendar = await this.getDefaultCalendarSource();
    console.log(defaultCalendar);
    Calendar.createEventAsync(defaultCalendar.id, {
      title: 'Con Fusion Table Reservation',
      startDate: new Date(Date.parse(date)),
      endDate: new Date(Date.parse(date) + 2 * 60 * 60 * 1000),
      timeZone: 'Asia/Hong_Kong',
      location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
    });
    Alert.alert('Event generated in your calendar');
  }

  async getDefaultCalendarSource() {
    const calendars = await Calendar.getCalendarsAsync();
    const defaultCalendars = calendars.filter(each => each.allowsModifications);
    return defaultCalendars[0];
  }

  async obtainNotificationPermission() {
    let permission = await Permissions.getAsync(
      Permissions.USER_FACING_NOTIFICATIONS
    );
    if (permission.status !== 'granted') {
      permission = await Permissions.askAsync(
        Permissions.USER_FACING_NOTIFICATIONS
      );
      if (permission.status !== 'granted') {
        Alert.alert('Permission not granted to show notifications');
      }
    }
    return permission;
  }

  async presentLocalNotification(date) {
    await this.obtainNotificationPermission();
    Notifications.presentLocalNotificationAsync({
      title: 'Your Reservation',
      body: 'Reservation for ' + date + ' requested',
      ios: {
        sound: true
      },
      android: {
        sound: true,
        vibrate: true,
        color: '#512DA8'
      }
    });
    Notifications.createChannelAndroidAsync('Confusion', {
      name: 'Confusion',
      sound: true,
      vibrate: true
    });
  }

  handleReservation() {
    const { guests, smoking, date } = this.state;
    console.log(JSON.stringify(this.state));
    Alert.alert(
      'Your Reservation OK ?',
      `Number of Guests : ${guests}\n Smoking ? ${
        smoking ? 'Yes\n' : 'No\n'
      } Date and Time : ${date}\n`,
      [
        {
          text: 'Cancel',
          onPress: () => {
            this.resetForm();
          },
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            this.presentLocalNotification(date);
            this.addReservationToCalendar(date);
            this.resetForm();
          }
        }
      ],
      { cancelable: false }
    );
    // this.toggleModal();
  }

  render() {
    return (
      <ScrollView>
        <Animatable.View animation='zoomIn' duration={2000} delay={1000}>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Number of Guests</Text>
            <Picker
              style={styles.formItem}
              selectedValue={this.state.guests}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ guests: itemValue })
              }
            >
              <Picker.Item label='1' value='1' />
              <Picker.Item label='2' value='2' />
              <Picker.Item label='3' value='3' />
              <Picker.Item label='4' value='4' />
              <Picker.Item label='5' value='5' />
              <Picker.Item label='6' value='6' />
            </Picker>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Smoking/Non-Smoking?</Text>
            <Switch
              style={styles.formItem}
              value={this.state.smoking}
              trackColor='#512DA8'
              onValueChange={value => this.setState({ smoking: value })}
            ></Switch>
          </View>
          <View style={styles.formRow}>
            <Text style={styles.formLabel}>Date and Time</Text>
            <DatePicker
              style={{ flex: 2, marginRight: 20 }}
              date={this.state.date}
              format=''
              mode='datetime'
              placeholder='select date and Time'
              minDate='2017-01-01'
              confirmBtnText='Confirm'
              cancelBtnText='Cancel'
              customStyles={{
                dateIcon: {
                  position: 'absolute',
                  left: 0,
                  top: 4,
                  marginLeft: 0
                },
                dateInput: {
                  marginLeft: 36
                }
                // ... You can check the source to find the other keys.
              }}
              onDateChange={date => {
                this.setState({ date: date });
              }}
            />
          </View>
          <View style={styles.formRow}>
            <Button
              onPress={() => this.handleReservation()}
              title='Reserve'
              color='#512DA8'
              accessibilityLabel='Learn more about this purple button'
            />
          </View>
        </Animatable.View>
        {/* <Modal
          animationType={'slide'}
          transparent={false}
          visible={this.state.showModal}
          onDismiss={() => this.toggleModal()}
          onRequestClose={() => this.toggleModal()}
        >
          <View style={styles.modal}>
            <Text style={styles.modalTitle}>Your Reservation</Text>
            <Text style={styles.modalText}>
              Number of Guests: {this.state.guests}
            </Text>
            <Text style={styles.modalText}>
              Smoking?: {this.state.smoking ? 'Yes' : 'No'}
            </Text>
            <Text style={styles.modalText}>
              Date and Time: {this.state.date}
            </Text>

            <Button
              onPress={() => {
                this.toggleModal();
                this.resetForm();
              }}
              color='#512DA8'
              title='Close'
            />
          </View>
        </Modal> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  formRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    margin: 20
  },
  formLabel: {
    fontSize: 18,
    flex: 2
  },
  formItem: {
    flex: 1
  },
  modal: {
    justifyContent: 'center',
    margin: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: '#512DA8',
    textAlign: 'center',
    color: 'white',
    marginBottom: 20
  },
  modalText: {
    fontSize: 18,
    margin: 10
  }
});

export default Reservation;
