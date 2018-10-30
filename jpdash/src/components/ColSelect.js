import React, { Component } from 'react';
import { Row,Col,Radio,Upload, Icon, Button, Alert, DatePicker } from 'antd';

const RadioGroup = Radio.Group;

export default class ColSelect extends Component {
    state = {
        name : null,
        billvalue: null,
    }
    handleSubmit(){
        console.log(this.state)
        this.props.selectCols(this.state.name, this.state.billvalue);
    }
    render() {
        return (
            <Col style={styles.uploader}>
            <Row>
                <h2>Choose <b>Name</b></h2>
                <RadioGroup  onChange={(e)=>{this.setState({name:e.target.value})}}>
                    {this.props.cols.map((value,index)=>{
                        return <Radio style={styles.radioStyle} key= {index} value={index}>{value}</Radio>
                    })}
                </RadioGroup>
            </Row>
            <Row>
                <h2>Choose <b>Bill Value</b></h2>
                <RadioGroup   style={{display:'block'}}onChange={(e)=>{this.setState({billvalue: e.target.value})}}>
                    {this.props.cols.map((value,index)=>{
                        return <Radio style={styles.radioStyle} key= {index} value={index}>{value}</Radio>
                    })}
                </RadioGroup>
            </Row>
            <Row type='flex' justify='end'>
                    <Button onClick={()=>this.handleSubmit()}>
                        Next
                        <Icon type="send" />
                    </Button>
                </Row>
            </Col>
        );
    }
}
const styles = {
    uploader: {
        minHeight: 300,
        borderRadius: 3,
        padding: 10,
        minWidth: 500,
    },
    radioStyle:{
        display: 'block',
        height: '15px',
    }
}