import React, { Component } from 'react';

export default class BackDrop extends Component {
    render() {
        return (
            <div style={style} className='backdrop'>

            </div>
        );
    }
}

const style = {
    backgroundColor: 'white',
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: '-100'
}

