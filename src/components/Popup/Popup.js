import React, { Component, Fragment } from 'react'
import { Text, View, Image, Dimensions, TouchableWithoutFeedback, TouchableOpacity, Animated } from 'react-native'
import { BoxShadow } from 'react-native-shadow'

import './Popup.scss';

const { width, height } = Dimensions.get('window')

const shadowOpt = {
	width: .8 * width,
	height:100,
    color:'#e3e7ef',
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
        this.opacity = new Animated.Value(0);

        this.handleClose = this.handleClose.bind(this);
        this.handleAccept = this.handleAccept.bind(this);
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
    }

    componentDidMount() {
        if (this.props.suggestionOpen) {
            this.open();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.suggestionOpen !== this.props.suggestionOpen) {
            this.props.suggestionOpen ? this.open() : this.close()
        }
    }

    open() {
        Animated.spring(this.fadeAnim, {
            toValue: 1,
            duration: 900,
            useNativeDriver: true
        }).start();

        Animated.timing(this.opacity, {
            toValue: 1,
            duration: 200,
            delay: 200,
            useNativeDriver: true
        }).start();
    }

    close() {
        Animated.spring(this.fadeAnim, {
            toValue: 0,
            duration: 1200,
            delay: 100,
            useNativeDriver: true
        }).start();

        Animated.timing(this.opacity, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true
        }).start();
    }

    handleClose() {
        this.props.handleClose();
    }

    handleAccept() {
        const { suggestions, suggestionPopupIndex, index } = this.props;
        const suggestion = suggestions[suggestionPopupIndex]

        this.props.acceptedImage(suggestion);
    }

    render() {
        const { suggestions, suggestionPopupIndex, suggestionOpen } = this.props;

        const suggestion = suggestions[suggestionPopupIndex]
        
        const { url, title, street, points } = suggestion
        
        return (
            <Fragment>
                { suggestionOpen &&
                    <TouchableWithoutFeedback onPress={this.handleClose}>
                        <Animated.View style={{opacity: this.opacity}} styleName='click-away'/>
                    </TouchableWithoutFeedback>
                }

                <Animated.View style={{
                    transform: [{
                        translateY: this.fadeAnim.interpolate({
                        inputRange: [0, 1],
                        outputRange: [height, 0]
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
                            <View styleName='tag-wrapper'>
                                <Location street={street}/>
                                <Score score={points}/>
                            </View>
                            <Text styleName='text'>{title}</Text>
                        </View>
                    </View>
                </Animated.View>
                <Button 
                    opacity={this.opacity}
                    handleClick={this.handleAccept}/>
            </Fragment>
        )
    }
}

class Button extends Component {
    render() {
        const { opacity } = this.props;
        
        return (
            <Animated.View
                styleName='accept-button'
                style={{
                    opacity
                }}>
                <TouchableOpacity 
                    onPress={this.props.handleClick}>
                        <View>
                            <Text styleName='label'>ACCEPTEER</Text>
                        </View>
                </TouchableOpacity>
            </Animated.View>
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

class Score extends Component {
    render() {
        const { score } = this.props;
        
        return (
            <View 
                styleName='score'>
                <Text 
                    styleName='score-label'
                    numberOfLines={1}>score</Text>
                <Text 
                    styleName='score-points'
                    numberOfLines={1}>{score}</Text>
            </View>
        )
    }
}

export default Popup
