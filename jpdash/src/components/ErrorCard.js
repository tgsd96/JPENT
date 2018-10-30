import React, { Component } from 'react';
import { Row, Col, Radio } from 'antd';

const RadioGroup  = Radio.Group;

export default class ErrorCard extends Component {

    handleChange = (e) =>{
        this.props.changeHandler(this.props.errorData.name,e.target.value);
    }
    render() {
        const { errorData } = this.props; 
        return (
            // <div style={styles.wrapper}> 
                <Row  type='flex' justify='space-around'>
                    <Col style={styles.wrapper} span={20}>
                    <Row>
                        <h4>{errorData.name}</h4>
                        <p>{errorData.interface_code} | <span style={{color:'#3e3e3e'}}>{errorData.date}</span></p>
                    </Row>
                    {errorData.recommendations.length==0?<div/>:<Row>
                        <p>Recommendations</p>
                    </Row>}
                    <Row>
                        <RadioGroup onChange={this.handleChange}>
                            {errorData.recommendations.map((recom,index)=>{
                                return(
                                    <Radio style={styles.radioStyle} value={recom.cust_id} ><b>{recom.name}</b></Radio>
                                )
                            })}
                            <Radio style={styles.radioStyle} value={0}>Do not create</Radio>
                            <Radio style={styles.radioStyle} value={-1}>Create New Account</Radio>
                        </RadioGroup>
                    </Row>
                    </Col>
                </Row>
            // </div>
        );
    }
}

const styles = {
    wrapper : {
        backgroundColor: '#F4F5F7',
        borderRadius: 3,
        // width: '90%',
        margin: 10,
        padding: 15,
        minHeight: 100
    },
    radioStyle : {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    }
}
