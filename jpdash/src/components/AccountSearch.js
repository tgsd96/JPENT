import React, { Component } from 'react';
import { Col, Row, Input, Table } from 'antd';
export default class AccountSearch extends Component {
    state = {
        searchTerm : '',
        selectedName : '',
        selectedID : '',
        selectedIC : '',
    }

    handleSearch = (e)=>{
        this.setState({ searchTerm : e.target.value});
        console.log(e.target.value);
        this.props.accountHandler(e.target.value);
    }
    handleTouch = (name,cust_id,IC)=>{
        console.log(name);
        console.log(cust_id)
        this.setState({ selectedName: name, selectedID: cust_id, selectedIC: IC})
        this.props.rowClick(name,cust_id,IC);
    }
    render() {
        const Columns = [
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                render: (text,record) => <a onClick={()=>this.handleTouch(record.name,record.cust_id,record.interface_code)}>{text}</a>
            },
            {
                title : 'Customer Id',
                dataIndex: 'cust_id',
                key: 'cust_id'
            },
            {
                title: 'Interface Code',
                dataIndex: 'interface_code',
                key: 'interface_code'
            }
        ]
        return (
            <Col style={styles.wrapper} span={11}>
                <Row>
                    <h3>Search for Account</h3>
                </Row>
                <Row>
                    <Input
                        placeholder='Search'
                        value={this.state.searchTerm}
                        onChange={this.handleSearch}
                     />
                </Row>
                <Row>
                    <Table dataSource={this.props.accounts}  columns={Columns} />

                </Row>
            </Col>
        );
    }
}

const styles = {
    wrapper : {
        backgroundColor: '#FFFFFF',
        minHeight: 400,
        borderRadius: 10,
        padding: 15,
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.50)'
    }
}