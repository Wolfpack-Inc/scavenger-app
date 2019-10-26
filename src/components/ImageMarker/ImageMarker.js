import React, { Component, Fragment } from 'react'
import { ImageBackground, Text, View } from 'react-native'
import { Marker, Circle } from 'react-native-maps';

import './ImageMarker.scss'

export class ImageMarker extends Component {
    state = {
        initialRender: true
    }
    
    render() {
        const { longitude, latitude, image, radius } = this.props;

        return (
            <Fragment>
                { radius && 
                    <Circle 
                        center={{longitude, latitude}} 
                        radius={radius}
                        fillColor='rgba(61, 132, 255, 0.1)'
                        strokeColor='rgba(61, 132, 255, 0.4)'
                        strokeWidth={1.2}/>
                }
                <Marker 
                    flat={true}
                    coordinate={{longitude, latitude}}
                    anchor={{x: 0.5, y: 0.5}}>
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
            </Fragment>
        )
    }
}

export default ImageMarker
