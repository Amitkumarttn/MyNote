import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {connect} from 'react-redux';
import {dropdownIcon} from '../constant';
import Realm from 'realm';
import {UUID, ObjectID} from 'bson';
import {Personal} from '../database/schema/PersonalSchema';

const {height, width} = Dimensions.get('window');

const data = [
  {label: 'Personal', value: 1},
  {label: 'Work', value: 2},
  {label: 'Ideas', value: 3},
  {label: 'Lists', value: 4},
];

class AddDetails extends Component {
  state = {
    value: null,
    isFocus: false,
    title: '',
    body: '',
  };
  _handlePress = () => {
    if (this.state.value === 1) {
      // Personal DATA
      this.props.gettingTitle(this.state.title);
      this.props.gettingBody(this.state.body);
      this.realmPersonalData();
      //   this.props.navigation.navigate('Personal');
    }
  };
  realmPersonalData = () => {
    const {title, body} = this.state;
    Realm.open({
      schema: [Personal],
    })
      .then(realm => {
        realm.write(() => {
          realm.create('personal', {
            id: new ObjectID(),
            title: title,
            body: body,
            getDate: new Date().toDateString(),
          });
        });
        console.log('SIGNUP SUCCESSFULLY');
        realm.close();
      })
      .catch(err => {
        console.log('Error', err);
      });
  };
  render() {
    const {value, isFocus} = this.state;
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.TextInputContainer}
            placeholder="Enter title"
            value={this.state.title}
            onChangeText={text => this.setState({title: text})}
          />
          <TextInput
            style={styles.TextInputContainer}
            placeholder="Enter body"
            value={this.state.body}
            onChangeText={text => this.setState({body: text})}
            multiline={true}
          />
        </View>

        <Dropdown
          style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data}
          maxHeight={220}
          labelField="label"
          valueField="value"
          placeholder={!isFocus ? 'Select item' : '...'}
          value={value}
          onFocus={() => this.setState({isFocus: true})}
          onBlur={() => this.setState({isFocus: false})}
          onChange={item => {
            this.setState({value: item.value});
            this.setState({isFocus: item.value});
          }}
          renderLeftIcon={() => (
            <Image
              style={[styles.dropIcon, {tintColor: isFocus ? 'blue' : 'black'}]}
              source={dropdownIcon}
            />
          )}
        />
        <Text>{this.props.title}</Text>
        <Text>{this.props.body}</Text>
        <TouchableOpacity
          style={styles.ButtonContainer}
          onPress={() => this._handlePress()}>
          <Text style={styles.Btn}>CREATE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};
const mapDispatchToProps = distpach => {
  return {
    gettingTitle: title => distpach({type: 'TITLE', payload: title}),
    gettingBody: body => distpach({type: 'BODY', payload: body}),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDetails);
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    width: 250,
  },
  icon: {
    marginRight: 5,
    // width: 10,
    // height: 10,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropIcon: {
    width: 20,
    height: 20,
    tintColor: '#888',
    marginRight: 12,
  },
  TextInputContainer: {
    width: width - 100,
    height: 60,
    backgroundColor: '#fff',
    borderColor: '#888',
    borderWidth: 2,
    paddingLeft: 30,
    justifyContent: 'center',
    borderRadius: 50,
    marginBottom: 18,
    // marginTop: 20,
  },
  ButtonContainer: {
    backgroundColor: 'blue',
    width: width - 100,
    height: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  Btn: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 15,
  },
});
