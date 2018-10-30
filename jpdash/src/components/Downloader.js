import React, { Component } from 'react';
import { Col, Row, DatePicker, Radio, Button, Icon } from 'antd';
import axios from  'axios';
import moment from 'moment';

const { RangePicker } = DatePicker;
const  RadioGroup  = Radio.Group;
export default class Downloader extends Component {

    state = {
        startDate : '',
        endDate : '',
        type: 'pur',
    }
    handleDate = (date,dateString)=>{

        this.setState({
            startDate:  dateString[0],
            endDate: dateString[1]
        })
    }

    handleType = (e)=>{
        this.setState({ type: e.target.value });
    }

    handleSubmit = async ()=>{
        // axios.get('http://localhost:5000/download',)
        console.log(this.state);
        const GET_URL = `http://localhost:5000/download/${this.state.type}?startDate=${this.state.startDate}&endDate=${this.state.endDate}`
        // const result = await axios.get(GET_URL);
        window.open(GET_URL);
        // const result = await axios.get(GET_URL);
    }

    render() {
        return (
            <Col span={11} style={styles.downloader} className='downloader'>
                <Row>
                <Col span={12} >
                        <h3>Download</h3>
                    </Col>
                </Row>
                <Row>
                    <Col span={12}>
                    <p>Select start and end date</p>
                    </Col>
                </Row>
                <Row type='flex' align='middle'>
                    <Col span={12}>
                    <RangePicker onChange={this.handleDate} />
                    </Col>
                    <Col span={11}>
                    <RadioGroup style={{marginLeft:10}} onChange={this.handleType}>
                        <Radio value='pur'>Purchases</Radio>
                        <Radio value='list'>List</Radio>
                    </RadioGroup>
                    </Col>
                </Row>
                <Row style={{marginTop:10}} type='flex' justify='center'>
                    <Col span={24}>
                    <Button onClick={this.handleSubmit}>
                        <Icon type='download'/>
                        Download
                    </Button>
                    </Col>
                </Row>
            </Col>
        );
    }
}

const styles = {
    downloader: {
        backgroundColor: '#FFFFFF',
        height: 350,
        borderRadius: 12,
        margin: 3,
        padding: 10,
    }
}