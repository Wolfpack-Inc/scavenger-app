import React, { Component } from 'react';
import { Text, View, Image } from 'react-native';

import './Card.scss';

export class Card extends Component {
    render() {
        const { image } = this.props;

        return (
            <View styleName='card'>
                <Image
                    styleName='image' 
                    source={{uri: image}} />
            </View>
        )
    }
}

export default Card
