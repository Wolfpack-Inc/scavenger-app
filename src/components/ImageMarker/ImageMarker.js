import React, { Component } from 'react'
import { ImageBackground, Text, View } from 'react-native'
import { Marker } from 'react-native-maps';

import './ImageMarker.scss'

export class ImageMarker extends Component {
    state = {
        initialRender: true
    }
    
    render() {
        const { longitude, latitude, image } = this.props;

        return (
            <Marker coordinate={{longitude, latitude}}>
                <View styleName='marker' >
                    <ImageBackground
                        styleName='pictogram'
                        imageStyle={{ borderRadius: 8 }}
                        source={{uri: image}}
                        onLoad={() => this.forceUpdate()}
                        onLayout={() => this.setState({initialRender: false})}
                        key={`${this.state.initialRender}`} />
                </View>
            </Marker>
        )
    }
}

export default ImageMarker
