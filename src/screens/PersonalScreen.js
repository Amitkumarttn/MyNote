import React, {Component} from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import {connect} from 'react-redux';
import Realm from 'realm';
import {UUID, ObjectID} from 'bson';
import {Personal} from '../database/schema/PersonalSchema';

const {width, height} = Dimensions.get('window');

class PersonalScreen extends Component {
  state = {
    myData: [],
  };
  componentDidMount() {
    Realm.open({
      schema: [Personal],
    }).then(realm => {
      this.setState({myData: realm.objects('personal')});
      console.log('USER: ', realm.objects('personal'));
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.headingContainer}>
          <Text style={styles.heading}>Personal</Text>
          <View style={styles.countContainer}>
            <Text style={styles.countText}>{this.state.myData.length}</Text>
          </View>
        </View>
        <ScrollView>
          {this.state.myData.map((item, index) => (
            <View key={index} style={styles.dataContainer}>
              <Text style={styles.date}>Today at {`${item.getDate}`}</Text>
              {/*<Text style={styles.body}>{item.title}</Text>*/}
              <Text style={styles.body}>{item.body}</Text>
              <Text style={styles.viewNote}>View note...</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => {
  const props = {title: state.personalVal.title, body: state.personalVal.body};
  return props;
};
const mapDispatchToProps = distpach => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(PersonalScreen);
const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 30,
  },
  heading: {
    color: 'red',
    fontSize: 40,
    fontWeight: 'bold',
  },
  countContainer: {
    backgroundColor: '#ffcccb',
    borderRadius: 50,
    width: 50,
    alignItems: 'center',
  },
  countText: {
    color: 'red',
    fontSize: 40,
    fontWeight: 'bold',
  },
  dataContainer: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: width - 20,
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
  },
  title: {
    color: 'red',
    marginBottom: 10,
  },
  body: {
    color: '#000',
  },
  date: {
    color: 'red',
    fontWeight: '600',
    marginBottom: 15,
  },
  viewNote: {
    fontWeight: 'bold',
    color: 'red',
    alignSelf: 'flex-end',
  },
});
