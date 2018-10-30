import React, { Component } from 'react';
import {Col, Row, Alert, Button,Icon} from 'antd';
import { Link } from 'react-router-dom';

export default class Results extends Component {
    render() {
        return (
            <Col style={styles.uploader}>
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
        minHeight:300,
        borderRadius: 3,
        padding: 10,
        minWidth: 500
    },
}