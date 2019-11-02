import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Counter from 'react-native-counter';

import './Score.scss';

export class Score extends Component {
    constructor() {
        super();

        this.state = {
            showCounter: true,
            prevScore: 0
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextProps.score !== this.props.score) | (this.state.prevScore !== nextState.prevScore);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.score !== this.props.score) {
            this.setState({
                showCounter: true,
                prevScore: prevProps.score
            })
        }
    }

    counterDone() {
        this.setState({
            showCounter: false
        })
    }

    render() {
        const { score } = this.props;
        const { showCounter, prevScore } = this.state;

        if (score === null) {
            return(null)
        }

        return (
            <View styleName='score-wrapper'>
                <Text styleName='score'>score</Text>
                { showCounter ?
                    <Counter
                        start={prevScore}
                        end={score}
                        easing='linear'
                        onComplete={this.counterDone.bind(this)}
                        style={{
                            color: '#5c6880',
                            fontFamily: 'Roboto-Black',
                            fontSize: 24
                        }}/>

                    :

                    <Text style={{
                        color: '#5c6880',
                        fontFamily: 'Roboto-Black',
                        fontSize: 24
                    }}>{score}</Text>
                }
            </View>
        )
    }
}

export default Score
