import { AnimationAction } from '@orbyt/redux';
import React from 'react';
import { View, TouchableOpacity, Text, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import { ShareCard } from './shareCard';

const ReceiveCard = (prop: any) => {
  const { receive } = prop;
  const { updateRecieving } = AnimationAction(prop);
  const cardY: any = React.useRef(new Animated.Value(700)).current;

  React.useEffect(() => {
    if (receive) {
      Animated.timing(cardY, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(cardY, {
        toValue: 700,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [receive]);

  return (
    <Animated.View
      style={[
        {
          position: 'absolute',
          width: '100%',
          backgroundColor: 'black',
          height: '80%',
          bottom: '0%',
          padding: 10,
        },
        {
          transform: [
            {
              translateY: cardY,
            },
          ],
        },
      ]}
    >
      <TouchableOpacity
        onPress={() => {
          updateRecieving(!receive);
        }}
      >
        <Icon color="white" name="close" size={40} />
      </TouchableOpacity>
      <View
        style={[
          {
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            borderWidth: 4,
            borderRadius: 10,
            borderColor: 'white',
            margin: 50,
          },
        ]}
      />
      <View
        style={[
          {
            display: 'flex',
            flexDirection: 'row',
          },
        ]}
      >
        <ShareCard title="Whatsapp" icon="wallet" link="" />
        <ShareCard title="Email" icon="wallet" link="" />
        <ShareCard title="Twitter" icon="wallet" link="" />
        <ShareCard title="FaceBook" icon="wallet" link="" />
      </View>
    </Animated.View>
  );
};

const mapStateToProps = (state: any, props: any) => {
  return {
    receive: state.animation.receive,
  };
};

export default connect(mapStateToProps)(ReceiveCard);
