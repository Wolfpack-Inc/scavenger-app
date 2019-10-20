import React, { Component } from 'react';
import { Dimensions, View, ScrollView } from 'react-native';

import './CardDrawer.scss';

import Card from './Card/Card';

const { width, height } = Dimensions.get('window')

export class CardDrawer extends Component {
    constructor() {
        super();

        this.handleScroll = this.handleScroll.bind(this)
    }

    handleScroll(event) {
        const scrollX = event.nativeEvent.contentOffset.x
        console.log(Math.round(scrollX / 330));
        this.props.handleScroll(Math.round(scrollX / 330))
    }

    render() {
        const { suggestions } = this.props;

        return (
            <View styleName='card-drawer'>
                <ScrollView 
                    styleName='scroll'
                    horizontal
                    snapToInterval={330}
                    showsHorizontalScrollIndicator={false}
                    onMomentumScrollEnd={this.handleScroll} >
                        { suggestions.map((suggestion, index) => 
                            <Card 
                                key={index}
                                image={suggestion.url}
                                text={suggestion.title}
                                street={suggestion.street}
                                last={index === suggestions.length-1} />)
                        }
                </ ScrollView>
            </View>
        )
    }
}

export default CardDrawer
