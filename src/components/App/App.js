import React, { Component, Fragment } from 'react';
import { StatusBar, View, Image } from 'react-native';
import './App.scss';
import { API_HOST } from 'react-native-dotenv'

import Map from 'src/components/Map/Map';
import Location from 'src/components/Location/Location';
import CardDrawer from 'src/components/CardDrawer/CardDrawer';

navigator.geolocation = require('@react-native-community/geolocation');

class App extends Component {
    constructor() {
        super();

        this.state = {
            currentLocation: null,
            currentImage: null,
            suggestionIndex: 0,
            suggestions: []
        }

        this.handleMovement = this.handleMovement.bind(this);
        this.fetchNearby = this.fetchNearby.bind(this);
        this.handleSuggestionScroll = this.handleSuggestionScroll.bind(this);
    }

    fetchNearby(longitude, latitude) {
        fetch(`${API_HOST}/images/initial/${longitude}/${latitude}`)
            .then(response => response.json() )
            .then(data => this.setState({suggestions: data}) )
            .catch(error => console.error(error));
    }

    handleMovement(location) {
        // If the user is moving and is not looking for an image yet, get initial suggestions
        if (!this.state.currentImage) {
            const { longitude, latitude } = location;
            this.fetchNearby(longitude, latitude);
        }

        // Store the current location
        this.setState({
            currentLocation: location
        });
    }

    handleSuggestionScroll(imageIndex) {
        this.setState({suggestionIndex: imageIndex})
    }

    render() {
        const { currentLocation, suggestions, suggestionIndex } = this.state;
        console.log('Hier', suggestionIndex);
        

        return (
            <Fragment>
                <StatusBar
                    hidden
                    barStyle='light-content' />
                    <Location handleMovement={this.handleMovement}/>
                    <View style={{backgroundColor: '#f3f7fa'}}>
                        <Map 
                            currentLocation={currentLocation} 
                            suggestions={suggestions}
                            currentSuggestionCard={suggestionIndex}/>
                        <CardDrawer 
                            suggestions={suggestions}
                            handleScroll={this.handleSuggestionScroll}/>
                    </View>
            </Fragment>
        );
    }
}

export default App;
