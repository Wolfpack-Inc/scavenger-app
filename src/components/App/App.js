import React, { Component, Fragment } from 'react';
import { StatusBar, View, TouchableOpacity, Text } from 'react-native';
import './App.scss';
import { API_HOST } from 'react-native-dotenv'

import Map from 'src/components/Map/Map';
import Location from 'src/components/Location/Location';
import CardDrawer from 'src/components/CardDrawer/CardDrawer';
import Popup from 'src/components/Popup/Popup';
import CurrentImage from 'src/components/CurrentImage/CurrentImage';
import Crosshair from 'src/components/Crosshair/Crosshair';

navigator.geolocation = require('@react-native-community/geolocation');

class App extends Component {
    constructor() {
        super();

        this.state = {
            currentLocation: null,
            currentImage: { "id": 9973, "latitude": 51.68706, "longitude": 5.29839, "radius": 68.0194648740342, "street": "Berewoutstraat", "title": "Gezien vanaf de Mariabrug over de Dommel in richting Vughterstraat. Links de Sint Janssingel, rechts de Westwal", "url": "http://denbosch.hosting.deventit.net/HttpHandler/icoon.ico?file=405429823" },
            suggestionIndex: 0,
            suggestions: [],
            suggestionPopupIndex: null,
            suggestionOpen: false,
            region: null
        }

        console.log(API_HOST);

        this.handleMovement = this.handleMovement.bind(this);
        this.fetchNearby = this.fetchNearby.bind(this);
        this.handleSuggestionScroll = this.handleSuggestionScroll.bind(this);
        this.handlePopupClose = this.handlePopupClose.bind(this);
        this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
        this.acceptedImage = this.acceptedImage.bind(this);
        this.getDeviceId = this.getDeviceId.bind(this);
    }

    componentDidMount() {
        this.getDeviceId();
    }

    getDeviceId() {
        
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

    onRegionChange(region) {
        this.setState({
            region
        })
    }

    render() {
        const { currentLocation, suggestions, suggestionIndex, suggestionPopupIndex, suggestionOpen, currentImage, region } = this.state;
        
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
                            lookingFor={currentImage}
                            onRegionChange={this.onRegionChange.bind(this)}
                            currentRegion={region}/>
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
                    { currentImage &&
                        <Fragment>
                            <Crosshair />
                            <Button />
                        </Fragment>
                    }
                    {currentImage &&
                        <CurrentImage
                            image={currentImage} />
                    }
            </Fragment>
        );
    }
}

class Button extends Component {
    render() {
        return (
            <View styleName='accept-button'>
                <TouchableOpacity
                    onPress={this.props.handleClick}>
                    <View>
                        <Text styleName='label'>GEVONDEN</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}

export default App;
