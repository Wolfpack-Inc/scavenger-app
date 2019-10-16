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
                        source={{uri: 'https://images.unsplash.com/photo-1566807810030-3eaa60f3e670?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80'}}
                        onLoad={() => this.forceUpdate()}
                        onLayout={() => this.setState({initialRender: false})}
                        key={`${this.state.initialRender}`} />
                </View>
            </Marker>
        )
    }
}

export default PersonMarker
