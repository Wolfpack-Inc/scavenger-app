import React, { Component, Fragment } from 'react'
import { Text, View, Image, Dimensions, TouchableWithoutFeedback } from 'react-native'
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

        this.handleClose = this.handleClose.bind(this);
    }

    handleClose() {
        this.props.handleClose();
        console.log('close');
    }

    render() {
        const { suggestion } = this.props;
        console.log(suggestion);
        
        const { url, title, street } = suggestion

        console.log(suggestion, url);
        
        return (
            <Fragment>
                <TouchableWithoutFeedback onPress={this.handleClose}>
                    <View styleName='click-away'/>
                </TouchableWithoutFeedback>
                
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
