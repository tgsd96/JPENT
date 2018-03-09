import React, {Component} from 'react';
import DataRow from './dataRow';

class AllPurchases extends Component{
    constructor(props){
        super(props);
        this.state = {
            data : []
        };
    }
    componentDidMount(){
        fetch('http://127.0.0.1:5000/view').then((resp)=>{return resp.json()}).then((resp)=>{
            console.log(resp);
            this.setState({
            data : resp
        })});
    }

    render(){
        let tableStyle = {
            padding : '10px',
            borderCollapse : 'collapse',
            border : '1px solid #E0E0E0'
        }
        let commonStyle = {
            border : '1px solid #E0E0E0',
            padding : '10px',
            color : '#03A9F4'
        }
        if(this.state.data!=null){
            // console.log(this.state.data
            return <table style={tableStyle}>
                <thead>
                    <th style={commonStyle}>id</th>
                    <th style={commonStyle}>Party Name</th>
                    <th style={commonStyle}>Bill No</th>
                    <th style={commonStyle}>Date</th>
                    <th style={commonStyle}>Bill Value</th>
                </thead>
                <tbody>{this.state.data.map((row)=>{
                return <DataRow data={row} key={row['id']} />})}</tbody></table>
        }
        return <p> Loading... </p>
    }
}

export default AllPurchases;