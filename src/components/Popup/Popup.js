import React, { Component, Fragment } from 'react'
import { Text, View, Image, Dimensions, TouchableWithoutFeedback, Animated } from 'react-native'
import { BoxShadow } from 'react-native-shadow'

import './Popup.scss';

const { width, height } = Dimensions.get('window')

const shadowOpt = {
	width: .8 * width,
	height:100,
    color:"#e3e7ef",
    // color: '#ff0000',
	border: 15,
	radius: 10,
	opacity:1,
	x:0,
	y:2
}

export class Popup extends Component {
    constructor() {
        super();

        this.fadeAnim = new Animated.Value(0);

        this.handleClose = this.handleClose.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.suggestionOpen !== this.props.suggestionOpen) {
            console.log('Animating to', this.props.suggestionOpen ? 1 : 0);
            
            Animated.spring(this.fadeAnim, {
                toValue: this.props.suggestionOpen ? 1 : 0,
                duration: 900,
                useNativeDriver: true
            }).start();
        }
    }

    handleClose() {
        console.log('close');
        this.props.handleClose();
    }

    render() {
        const { suggestions, suggestionPopupIndex, suggestionOpen } = this.props;

        const suggestion = suggestions[suggestionPopupIndex]
        
        const { url, title, street } = suggestion
        
        return (
            <Fragment>
                { suggestionOpen &&
                    <TouchableWithoutFeedback onPress={this.handleClose}>
                        <View styleName='click-away'/>
                    </TouchableWithoutFeedback>
                }

                <Animated.View style={{
                    transform: [{
                        translateY: this.fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [2 * (height / 3), 0]
                        }),
                    }]
                }}>
                    
                    <View styleName='wrapper'>
                        <View styleName='background'>
                            <BoxShadow setting={shadowOpt}>
                                <Image
                                    styleName='image'
                                    source={{uri: url}} />
                            </BoxShadow>
                            <Location street={street}/>
                            <Text styleName='text'>{title}</Text>
                            <Button/>
                        </View>
                    </View>
                </Animated.View>
            </Fragment>
        )
    }
}

class Button extends Component {
    render() {
        return (
            <View styleName='accept-button'>
                <Text styleName='label'>ACCEPT</Text>
            </View>
        )
    }
}

class Location extends Component {
    render() {
        const { street } = this.props;
        
        return (
            <View 
                styleName='location'>
                <Text 
                    styleName='location-label'
                    numberOfLines={1}>{street}</Text>
            </View>
        )
    }
}

export default Popup
