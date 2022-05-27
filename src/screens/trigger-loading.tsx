import React, { Component } from 'react';
import { ActivityIndicator, Button, View, Text } from 'react-native';



class TriggerLoading extends Component {
  // constructor(props) {


  constructor(props: any) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  startLoading() {
    if (this.state.isLoading) {
      // still loading something
      console.log('still loading');
    } else {
      // its not loading, can be triggered
      this.setState({ isLoading: true });
      setTimeout(() => {
        this.setState({ isLoading: false });
      }, 3000);
      // some async/promise operation
      // after completed, do something about it
      // response msg
      // actions based on response
      // finally set isLoading state to false
    }
  }

  render() {
    return (
      <View>
        <ActivityIndicator size="large" color="#f1f1f1" />
        <Button
          disabled={this.state.isLoading}
          title="Start loading"
          onPress={() => this.startLoading()}
        />
      </View>
    );
  }
}

export default TriggerLoading;
