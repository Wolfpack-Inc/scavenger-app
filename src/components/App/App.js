import React, { Component, Fragment } from 'react';
import { StatusBar, View, TouchableOpacity, Text } from 'react-native';
import './App.scss';

import { API_HOST } from 'react-native-dotenv';

import Map from 'src/components/Map/Map';
import Location from 'src/components/Location/Location';
import CardDrawer from 'src/components/CardDrawer/CardDrawer';
import Popup from 'src/components/Popup/Popup';
import CurrentImage from 'src/components/CurrentImage/CurrentImage';
import Crosshair from 'src/components/Crosshair/Crosshair';
import Score from 'src/components/Score/Score';

import DeviceInfo from 'react-native-device-info';

navigator.geolocation = require('@react-native-community/geolocation');

class App extends Component {
    constructor() {
        super();

        this.state = {
            deviceId: null,
            currentLocation: null,
            currentImage: null,
            suggestionIndex: 0,
            suggestions: [],
            suggestionPopupIndex: null,
            suggestionOpen: false,
            region: null,
            points: null
        }

        this.handleMovement = this.handleMovement.bind(this);
        this.fetchNearby = this.fetchNearby.bind(this);
        this.fetchSuggestions = this.fetchSuggestions.bind(this);
        this.handleSuggestionScroll = this.handleSuggestionScroll.bind(this);
        this.handlePopupClose = this.handlePopupClose.bind(this);
        this.handleSuggestionClick = this.handleSuggestionClick.bind(this);
        this.acceptedImage = this.acceptedImage.bind(this);
        this.startup = this.startup.bind(this);
    }

    componentDidMount() {
        this.startup();
    }

    startup() {
        // Get the id of the device, this will be the user id
        const deviceId = DeviceInfo.getUniqueId();
        
        this.setState({
            deviceId 
        });

        // Get or get the user
        fetch(`${API_HOST}/create/user/${deviceId}`)
            .then(data => fetch(`${API_HOST}/session-points/${deviceId}`))
            .then(response => response.json() )
            .then(data => this.setState({points: data['points']}))
            .catch(error => console.error(error));
    }

    fetchNearby(longitude, latitude) {
        fetch(`${API_HOST}/images/initial/${longitude}/${latitude}`)
            .then(response => response.json())
            .then(data => this.setState({suggestions: data}) )
            .catch(error => console.error(error));
    }

    fetchSuggestions() {
        console.log('fetching suggestions');

        fetch(`${API_HOST}/suggestions/${this.state.deviceId}`)
            .then(response => response.json())
            .then(suggestions => this.setState({
                suggestions,
                currentImage: null
            }))
    }

    handleMovement(location) {
        // If the user is moving and is not looking for an image yet, get initial suggestions
        if (this.state.suggestions.length === 0) {
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
        // Only update the region when searching for a image
        if (this.state.currentImage) {
            this.setState({
                region
            })
        }
    }

    handleFound() {
        const { deviceId, currentImage, region } = this.state;
        const { longitude, latitude } = region

        console.log(deviceId, currentImage['id'], longitude, latitude);

        fetch(`${API_HOST}/save-taken-image/${deviceId}/${currentImage['id']}/${longitude}/${latitude}`)
            .then(data => fetch(`${API_HOST}/session-points/${deviceId}`))
            .then(response => response.json())
            .then(data => this.setState({points: data['points']}))
            .then(data => this.fetchSuggestions())
            .catch(error => console.error(error));
    }

    render() {
        const { currentLocation, suggestions, suggestionIndex, suggestionPopupIndex, suggestionOpen, currentImage, region, points } = this.state;

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
                            onRegionChange={this.onRegionChange.bind(this)}/>
                        { !currentImage &&
                            <CardDrawer 
                                suggestions={suggestions}
                                handleScroll={this.handleSuggestionScroll}
                                handleSuggestionClick={this.handleSuggestionClick}/>
                        }
                    </View>
                    <Score score={points}/>
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
                            <Button handleClick={this.handleFound.bind(this)}/>
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
