import React, { Component, Fragment } from 'react';
import { StatusBar, View, Image } from 'react-native';
import './App.scss';
import { API_HOST } from 'react-native-dotenv'

import Map from 'src/components/Map/Map';
import Location from 'src/components/Location/Location';
import CardDrawer from 'src/components/CardDrawer/CardDrawer';
import Popup from 'src/components/Popup/Popup';

navigator.geolocation = require('@react-native-community/geolocation');

class App extends Component {
    constructor() {
        super();

        this.state = {
            currentLocation: null,
            currentImage: null,
            suggestionIndex: 0,
            suggestions: [],
            suggestionPopupIndex: null,
            suggestionOpen: false
        }

        console.log(API_HOST);

        this.handleMovement = this.handleMovement.bind(this);
        this.fetchNearby = this.fetchNearby.bind(this);
        this.handleSuggestionScroll = this.handleSuggestionScroll.bind(this);
        this.handlePopupClose = this.handlePopupClose.bind(this);
        this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
        this.acceptedImage = this.acceptedImage.bind(this);
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

    handlePopupClose() {
        this.setState({
            suggestionOpen: false
        })
    }

    handleSuggestionClick(suggestionIndex) {
        this.setState({
            suggestionPopupIndex: suggestionIndex,
            suggestionOpen: true
        })
    }

    acceptedImage(image) {
        this.setState({
            currentImage: image
        });

        this.handlePopupClose();
    }

    render() {
        const { currentLocation, suggestions, suggestionIndex, suggestionPopupIndex, suggestionOpen, currentImage } = this.state;
        
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
                            currentSuggestionCard={suggestionIndex}
                            lookingFor={currentImage}/>
                        { !currentImage &&
                            <CardDrawer 
                                suggestions={suggestions}
                                handleScroll={this.handleSuggestionScroll}
                                handleSuggestionClick={this.handleSuggestionClick}/>
                        }
                    </View>
                    { suggestionPopupIndex !== null &&
                        <Popup 
                            suggestionOpen={suggestionOpen}
                            suggestions={suggestions}
                            suggestionPopupIndex={suggestionPopupIndex}
                            acceptedImage={this.acceptedImage}
                            handleClose={this.handlePopupClose}/>
                    }
            </Fragment>
        );
    }
}

export default App;
