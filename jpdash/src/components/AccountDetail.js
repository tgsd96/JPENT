import React, { Component } from 'react';
import { Col, Row, Table, Input } from 'antd';
export default class AccountDetail extends Component {

    state = {
        userName: 'Selected Account will appear here'
    }
    updateID = (e)=>{
        this.props.updateID(this.props.account.cust_id,e.target.value);
    }
    render() {
        const sameColumns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: 'Interface Code',
            dataIndex: 'interface_code',
            key: 'interface_code'
        }];

        const recomColumns = [{
            title: 'Customer ID',
            dataIndex: 'cust_id',
            key: 'cust_id'
        },{
            title: 'Name',
            dataIndex: 'name',
            key: 'name'
        }]
        var renderComp;
        if(Object.keys(this.props.account).length === 0 && this.props.account.constructor === Object){
            renderComp = <Row><h3>{this.state.userName}</h3></Row>
        }else{
            const { account } = this.props;
            renderComp =  <div> <Row align='middle'>
                    <Col span={16}><h3>{account.name}</h3></Col>
                    <Col span={3}><h3>{account.cust_id}</h3></Col>
                    <Col span={3}><h3>{account.interface_code}</h3></Col>
                </Row>
                <Row>
                    <Col>
                    <Input placeholder='Update customer id' onPressEnter={this.updateID}/>
                    </Col>
                </Row>
                <Row>
                    <Col><p>Other names and interface</p></Col>
                </Row>
                <Row>
                    <Table dataSource={account.same} columns={sameColumns}/>
                </Row>
                <Row>
                    <Col><p>Recommended</p></Col>
                </Row>
                <Row>
                    <Table dataSource={account.recom} columns={recomColumns}/>
                </Row>
                </div>

        }
        return (
            <Col style={styles.wrapper} span={11}>
                    {renderComp}
            </Col>
        );
    }
}

const styles = {
    wrapper : {
        backgroundColor: '#FFFFFF',
        minHeight: 400 ,
        borderRadius: 10,
        padding: 15,
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.50)'
    }
}