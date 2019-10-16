import React, { Component, Fragment } from 'react';
import { StatusBar, View, Image } from 'react-native';
import './App.scss';

import Map from 'src/components/Map/Map';
import Location from 'src/components/Location/Location';
import CardDrawer from 'src/components/CardDrawer/CardDrawer';

navigator.geolocation = require('@react-native-community/geolocation');

class App extends Component {
    constructor() {
        super();

        this.state = {
            currentLocation: null
        }

        this.handleMovement = this.handleMovement.bind(this);
    }

    handleMovement(location) {
        this.setState({
            currentLocation: location
        });
    }

    render() {
        const { currentLocation } = this.state;

        return (
            <Fragment>
                <StatusBar
                    hidden
                    barStyle='light-content' />
                    <Location handleMovement={this.handleMovement}/>
                    <View>
                        <Map currentLocation={currentLocation}/>
                        <CardDrawer />
                    </View>
            </Fragment>
        );
    }
}

export default App;
