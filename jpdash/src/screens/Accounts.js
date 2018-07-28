import React, { Component } from 'react';
import { Row } from 'antd'; 
import AccountSearch from '../components/AccountSearch';
import AccountDetail from '../components/AccountDetail';
import Axios from 'axios';

const ACCOUNT_URL = 'http://localhost:5000/accounts'
export default class Accounts extends Component {

    state = {
        accounts : [],
        selectedName: '',
        selectedID: '',
        selectedIC: '',
        selected : {},
        searchTerm :'',
    }
    componentWillMount(){
        this.retrieveAccounts('');
    }
    retrieveAccounts = async (name) =>{
        const resp = await Axios.get(ACCOUNT_URL+`?name=${name}`);
        this.setState({searchTerm:name})
        console.log(name);
        this.setState({ accounts: resp.data});
        // console.log(this.state.accounts);
    }

    updateID = async(orig,newID) =>{
        const resp = await Axios.put(ACCOUNT_URL+'/details',{ cust_id: orig, new_cust_id: newID })
        console.log(resp.data);
        this.retrieveAccounts(this.state.searchTerm);
        this.setState({ selected: {}});
        // this.forceUpdate()
    }

    getAccountDetails = async (name,cust_id,IC)=>{
        var resp;
        console.log('Calling server')
        try {
        resp = await Axios.get(ACCOUNT_URL+`/details?name=${name}&cust_id=${cust_id}&ic=${IC}`);
        }catch(err){
            console.log(err);
        }
        console.log(resp.data);
        this.setState({ selected: resp.data })
    }
    render() {
        return (
            <div style={styles.wrapper} className='accounts-wrapper'>
                <Row type='flex' justify='space-around' >
                <AccountSearch rowClick={this.getAccountDetails} accountHandler={this.retrieveAccounts} accounts={this.state.accounts}/>
                <AccountDetail updateID={this.updateID} account={this.state.selected} />
                </Row>
            </div>
        );
    }
}

const styles = {
    wrapper:{
        width : '100%',
        margin: 20,
    }
}