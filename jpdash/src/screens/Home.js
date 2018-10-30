import React, { Component } from 'react';
import { Row } from 'antd';
import Uploader from '../components/Upload';
import Downloader from '../components/Downloader';
import { Route } from 'react-router-dom';

export default class Home extends Component {
    render() {  
        return (
            <Row type='flex' justify='space-around' gutter={16}>
                <Route  path='/' component = {Uploader} />
                <Route exact path='/' component={Downloader}/>
                {/* <Downloader/> */}
            </Row>
        );
    }
}