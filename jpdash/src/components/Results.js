import React, { Component } from 'react';
import {Col, Row, Alert, Button,Icon} from 'antd';
import { Link } from 'react-router-dom';

export default class Results extends Component {
    render() {
        return (
            <Col style={styles.uploader} span={8}>
                <Alert style={{margin: 10}} message={`${this.props.successCount} correct insertions`} type='success'/>
                <Alert style={{margin: 10}} message={`${this.props.errorCount} error while inserting`} type='error'/>
                <Row type='flex' justify='end'>
                    <Link to='/errors'>View Errors</Link>
                    <Button onClick={this.props.reset}>
                        Reset
                        <Icon type="reset" />
                    </Button>
                </Row>
            </Col>
        );
    }
}

const styles = {
    uploader: {
        backgroundColor: '#FFFFFF',
        height: 600,
        borderRadius: 12,
        margin: 3,
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.50)',
        padding: 10,
    },
}