import React, { Component, Fragment } from 'react'
import { Image, Text, View, TouchableNativeFeedback, Animated, Dimensions } from 'react-native'

import './CurrentImage.scss'

const { width, height } = Dimensions.get('window')

export class CurrentImage extends Component {
    constructor() {
        super();

        this.open = new Animated.Value(0);

        this.state = {
            open: false
        }
    }

    handleClick() {
        this.setState({
            open: !this.state.open
        });

        Animated.timing(this.open, {
            toValue: this.state.open ? 1 : 0,
            duration: 240,
            // useNativeDriver: true
        }).start();
    }

    render() {
        const { image } = this.props;
        const { open } = this.state;
        const { url } = image;

        return (
            <Animated.View 
                styleName='touch-wrapper'
                style={{
                    width: this.open.interpolate({
                        inputRange: [0, 1],
                        outputRange: [140, width]
                    }),
                    borderRadius: this.open.interpolate({
                        inputRange: [0, 1],
                        outputRange: [10, 0]
                    }),
                    height: this.open.interpolate({
                        inputRange: [0, 1],
                        outputRange: [200, height]
                    }),
                    margin: this.open.interpolate({
                        inputRange: [0, 1],
                        outputRange: [15, 0]
                    }),
                }}>
                    
                <TouchableNativeFeedback 
                    styleName='touchable' 
                    onPress={this.handleClick.bind(this)}>
                    <Image
                        styleName='image'
                        source={{ uri: url }}/>
                </TouchableNativeFeedback>
            </Animated.View>
        )
    }
}

export default CurrentImage
