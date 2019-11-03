import React, { Component } from 'react';
import { Text, View, Image, TouchableWithoutFeedback } from 'react-native';
import { BoxShadow } from 'react-native-shadow'

import './Card.scss';

const shadowOpt = {
	width:305,
	height:120,
	color:"#e3e7ef",
	border:18,
	radius:25,
	opacity:0.6,
	x:-2,
	y:6
}

class Card extends Component {
    constructor() {
        super();

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handleClick(this.props.index)
    }

    render() {
        const { image, text, last, street, points } = this.props;

        return (
            <View 
                styleName='card-wrapper'
                style={{ 
                        marginRight: last ? 30 : 0,
                    }}>
                <BoxShadow setting={shadowOpt}>
                    <TouchableWithoutFeedback onPress={this.handleClick}>
                        <View styleName='card'>
                            <Image
                                styleName='image' 
                                source={{uri: image}} />
                            <View styleName='content'>
                                <Location street={street}/>
                                <Text 
                                    styleName='text'
                                    numberOfLines={3}>{text}</Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </BoxShadow>
                            <Score score={points}/>
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

class Score extends Component {
    render() {
        const { score } = this.props;
        
        return (
            <View 
                styleName='score'>
                <Text 
                    styleName='score-points'
                    numberOfLines={1}>{score}</Text>
            </View>
        )
    }
}

export default Card
