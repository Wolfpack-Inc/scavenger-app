import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';

import './CardDrawer.scss';

import Card from './Card/Card';

export class CardDrawer extends Component {
    render() {
        return (
            <View styleName='card-drawer'>
                <ScrollView 
                    styleName='scroll'
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false} >
                        <Card image='https://denbosch.hosting.deventit.net/HttpHandler/icoon.ico?file=405427120'/>
                        <Card image='https://denbosch.hosting.deventit.net/HttpHandler/icoon.ico?file=406457288' />
                        <Card image='https://denbosch.hosting.deventit.net/HttpHandler/icoon.ico?file=406464759' />
                </ ScrollView>
            </View>
        )
    }
}

export default CardDrawer
