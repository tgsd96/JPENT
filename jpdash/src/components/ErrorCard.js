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
                        <p>{errorData.interface_code}</p>
                    </Row>
                    <Row>
                        <p>Recommendations</p>
                    </Row>
                    <Row>
                        <RadioGroup onChange={this.handleChange}>
                            {errorData.recommendations.map((recom,index)=>{
                                return(
                                    <Radio style={styles.radioStyle} value={recom.cust_id} >{recom.name}</Radio>
                                )
                            })}
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
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        // width: '90%',
        margin: 10,
        padding: 15,
        minHeight: 100,
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.50)'
    },
    radioStyle : {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    }
}
