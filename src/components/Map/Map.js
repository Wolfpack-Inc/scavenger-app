import React, { Component } from 'react';
import { Text } from 'react-native'
import { View } from 'react-native';
import MapView from 'react-native-maps';

import PersonMarker from 'src/components/PersonMarker/PersonMarker';
import ImageMarker from 'src/components/ImageMarker/ImageMarker';

class Map extends Component {
    constructor() {
        super();

        this.centerOn = this.centerOn.bind(this);
    }

    componentDidUpdate(prevProps) {
        // Center to the user when his location is found
        if(!prevProps.currentLocation && this.props.currentLocation) {
            // Add a small timeout in order to fix a bug that map is not loaded yet
            setTimeout(() => {
                this.centerOn(this.props.currentLocation, 0.01)
            }, 10);
        }

        // Center on a suggestion location when the user swipes the suggestion drawer
        if(prevProps.currentSuggestionCard != this.props.currentSuggestionCard) {
            this.centerOn(this.props.suggestions[this.props.currentSuggestionCard], 0, 0.01)
        }
    }

    centerOn(location, offset=0, delta=0.04) {
        const { longitude, latitude } = location;
        
        if (longitude && latitude) {
            // Animate to the center
            this.map.animateToRegion({
                latitude: latitude - offset,
                longitude,
                latitudeDelta: delta,
                longitudeDelta: delta
            });
        }
    }

    render() {
        const { currentLocation, suggestions } = this.props;

        return (
            <View>
                <MapView 
                    style={{
                        height: '100%'
                    }}
                    ref={map => {this.map = map}}
                    customMapStyle={mapStyle}
                    initialRegion={{
                        latitude: 51.702681,
                        longitude: 5.302172,
                        latitudeDelta: 0.0822,
                        longitudeDelta: 0.0421,
                    }}
                >
                    { suggestions.map((suggestion, index) => 
                        <ImageMarker 
                            key={index} 
                            longitude={suggestion.longitude} 
                            latitude={suggestion.latitude}
                            image={suggestion.url}
                            radius={suggestion.radius}/>
                    )}
                    <PersonMarker location={currentLocation}/>
                </MapView> 
            </View>
        );
    }
}

export default Map;

const mapStyle = [
    {
        "featureType": "all",
        "elementType": "labels",
        "stylers": [
            {
                "gamma": 0.26
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "lightness": -50
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "labels.text",
        "stylers": [
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "administrative.locality",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#8b94aa"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f3f7fa"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f3f7fa"
            }
        ]
    },
    {
        "featureType": "landscape.natural.landcover",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f3f7fa"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "hue": "#5500ff"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 50
            },
            {
                "hue": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#b1b6c2"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#dfe8f9"
            }
        ]
    }
]
