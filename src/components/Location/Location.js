import React, { Component } from 'react'
import { PermissionsAndroid } from 'react-native';

async function requestLocationPermission() {
    try {
        await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'Location Permission',
                message: 'Scavenger hunt would like to use your location',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK',
            },
        );
    } catch (err) {
        console.warn(err);
    }
}

export class Location extends Component {
    componentDidMount() {
        // Request the user to use the location of the phone
        requestLocationPermission();

        // Fetch the location of the user on mount
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;

            this.props.handleMovement({
                latitude, 
                longitude
            })
        }, (error) => {
            console.warn(error)
        }, {
            timeout: 10000,
            enableHighAccuracy: true
        });
         
        // Track the location of the user
        navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;

            this.props.handleMovement({
                latitude, 
                longitude
            })
        });
    } 

    render() {
        return (null)
    }
}

export default Location