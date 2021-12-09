import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import {connect} from 'react-redux';
import AddDetails from '../components/AddDetails';
import {menuIcon, plusIcon} from '../constant';
import Realm from 'realm';
import {Personal} from '../database/schema/PersonalSchema';
// import MyModal from '../components/Modal';
class HomeScreen extends Component {
  state = {
    personal: false,
    work: false,
    idea: false,
    list: false,
    modalVisible: false,
    personalData: [],
    workData: [],
    ideaData: [],
    listData: [],
  };
  componentDidMount() {
    Realm.open({
      schema: [Personal],
    })
      .then(realm => {
        this.setState({personalData: realm.objects('personal')});
        console.log('USER: ', realm.objects('personal'));
      })
      .catch(err => console.log(err));
  }
  handlePersonal = () => {
    this.setState({personal: true, work: false, idea: false, list: false});
    this.props.navigation.navigate('Personal');
  };
  handleWork = () => {
    this.setState({personal: false, work: true, idea: false, list: false});
    this.props.navigation.navigate('Work');
  };
  handleIdea = () => {
    this.setState({personal: false, work: false, idea: true, list: false});
    this.props.navigation.navigate('Idea');
  };
  handleList = () => {
    this.setState({personal: false, work: false, idea: false, list: true});
    this.props.navigation.navigate('List');
  };
  setModalVisible = visible => {
    this.setState({modalVisible: visible});
  };
  render() {
    const {personal, work, idea, list, modalVisible} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>
            {' '}
            My <Text style={styles.secondHeading}>Notes</Text>{' '}
          </Text>
        </View>

        <View style={styles.mainContainer}>
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={() => this.handlePersonal()}>
            <Text
              style={[styles.subheading, {color: personal ? 'red' : 'blue'}]}>
              Personal
            </Text>
            <View
              style={[
                styles.textContainer,
                {backgroundColor: personal ? '#ffcccb' : '#fff'},
              ]}>
              <Text
                style={[
                  styles.subheading,
                  {
                    color: personal ? 'red' : 'blue',
                  },
                ]}>
                {this.state.personalData.length}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={() => this.handleWork()}>
            <Text style={[styles.subheading, {color: work ? 'red' : 'blue'}]}>
              Work
            </Text>
            <View
              style={[
                styles.textContainer,
                {backgroundColor: work ? '#ffcccb' : '#fff'},
              ]}>
              <Text
                style={[
                  styles.subheading,
                  {
                    color: work ? 'red' : 'blue',
                  },
                ]}>
                {this.state.workData.length}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={() => this.handleIdea()}>
            <Text style={[styles.subheading, {color: idea ? 'red' : 'blue'}]}>
              Ideas
            </Text>
            <View
              style={[
                styles.textContainer,
                {backgroundColor: idea ? '#ffcccb' : '#fff'},
              ]}>
              <Text
                style={[
                  styles.subheading,
                  {
                    color: idea ? 'red' : 'blue',
                  },
                ]}>
                {this.state.ideaData.length}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.titleContainer}
            onPress={() => this.handleList()}>
            <Text style={[styles.subheading, {color: list ? 'red' : 'blue'}]}>
              Lists
            </Text>
            <View
              style={[
                styles.textContainer,
                {backgroundColor: list ? '#ffcccb' : '#fff'},
              ]}>
              <Text
                style={[
                  styles.subheading,
                  {
                    color: list ? 'red' : 'blue',
                  },
                ]}>
                {this.state.listData.length}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            this.setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TouchableOpacity
                style={styles.closeIconContainer}
                onPress={() => this.setModalVisible(!modalVisible)}>
                <Image style={styles.closeIcon} source={plusIcon} />
              </TouchableOpacity>
              <AddDetails />
            </View>
          </View>
        </Modal>
        <View style={styles.iconContainer}>
          <TouchableOpacity>
            <Image style={styles.menuIcon} source={menuIcon} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.plusIconContainer}
            onPress={() => this.setModalVisible(true)}>
            <Image style={styles.plusIcon} source={plusIcon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  // const props = {name: state.personalVal.name};
  // return props;
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    // fetchApi: () => getData(dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headingContainer: {
    alignItems: 'center',
    marginVertical: 15,
    marginBottom: 80,
  },
  heading: {
    color: 'red',
    fontWeight: 'bold',
    fontSize: 40,
  },
  secondHeading: {
    color: 'blue',
  },
  mainContainer: {
    // alignItems: 'center',
    // justifyContent: 'center',
    textAlign: 'left',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  subheading: {
    color: 'blue',
    fontWeight: 'bold',
    fontSize: 30,
    alignItems: 'center',
    // textAlign: 'center',
    justifyContent: 'center',
    // alignContent: 'center',
    alignSelf: 'center',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 200,
  },
  menuIcon: {
    width: 40,
    height: 40,
    tintColor: 'blue',
  },
  plusIcon: {
    width: 40,
    height: 40,
    tintColor: '#fff',
  },
  plusIconContainer: {
    backgroundColor: 'red',
    borderRadius: 50,
  },
  textContainer: {
    width: 50,
    height: 50,
    // backgroundColor: 'red',
    borderRadius: 50,
    // alignItems: 'center',
    // textAlign: 'center',
    justifyContent: 'center',
    // alignContent: 'center',
    // alignSelf: 'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  closeIcon: {
    width: 30,
    height: 30,
    transform: [{rotate: '45deg'}],
    // position: 'absolute',
    // top: 0,
    // right: 0,
    // marginHorizontal: 10,
    // marginVertical: 10,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    marginHorizontal: 10,
    marginVertical: 10,
  },
});
