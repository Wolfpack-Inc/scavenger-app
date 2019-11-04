import React, { Component } from 'react'
import { ImageBackground, Text, View } from 'react-native'
import MapView, { Marker } from 'react-native-maps';

import './PersonMarker.scss'

export class PersonMarker extends Component {
    state = {
        initialRender: true
    }
    
    render() {
        const { location } = this.props;

        if(!location) {
            return(null)
        }

        return (
            <Marker coordinate={location}>
                <View styleName='marker' >
                    <ImageBackground
                        styleName='pictogram'
                        imageStyle={{ borderRadius: 12 }}
                        source={{ uri: 'https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3300&q=80'}}
                        onLoad={() => this.forceUpdate()}
                        onLayout={() => this.setState({initialRender: false})}
                        key={`${this.state.initialRender}`} />
                </View>
            </Marker>
        )
    }
}

export default PersonMarker
