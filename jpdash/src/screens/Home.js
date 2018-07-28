import React, { Component } from 'react';
import { Row } from 'antd';
import Uploader from '../components/Upload';
import Downloader from '../components/Downloader';

export default class Home extends Component {
    render() {
        return (
            <Row type='flex' justify='space-around' gutter={16}>
                <Uploader />
                <Downloader/>
            </Row>
        );
    }
}