import React, { Component } from 'react'
import { View } from 'react-native'

import './Crosshair.scss'

export class Crosshair extends Component {
    render() {
        return (
            <View styleName='wrapper'>
                <View styleName='marker' />
            </View>
        )
    }
}

export default Crosshair
