import React, { Component } from 'react';
import Uploader from './Uploader';
import ColSelect from './ColSelect';
import Result from './Results';
import Axios from 'axios';
const InitialState ={
    step : 1,
    formData: null,
    keys : null,
    company: null,
    filename : null,
    name:null,
    billvalue: null,
    date:null,

};
export default class Upload extends Component {
    state = {
        step : 1,
        formData: null,
        keys : null,
        company: null,
        filename : null,
        name:null,
        billvalue: null,
        date:null,

    }
    nextStep=()=>{
        this.setState({step: this.state.step+1});
    }

    previousStep = ()=>{
        this.setState({step: this.state.step-1});
    }

    uploadFormData=(filename,keys,company,date)=>{
        this.setState({filename, keys, company,date});
        console.log(this.state);
        this.nextStep();
    }
    selectCols = async (name,billvalue)=>{
        console.log(name);
        console.log(billvalue);
        await this.setState({name:name,billvalue:billvalue});
        console.log(this.state);
        const conf = {
            filename : this.state.filename,
            date : this.state.date,
            name : this.state.name,
            billvalue : this.state.billvalue,
            company: this.state.company
        }
        console.log(conf);
        const resp = await Axios.put('http://localhost:5000/upload/'+this.state.company,conf);
        console.log(resp.data);
        this.setState({ correct : resp.data.status[0], incorrect : resp.data.status[1]})
        this.nextStep();
        
    }

    reset = ()=>{
        this.setState(InitialState);
    }

    render() {
        
            switch(this.state.step){
                case 1:
                    return <Uploader update={this.uploadFormData}/>
                case 2:
                    return <ColSelect cols={this.state.keys} selectCols={this.selectCols}/>
                case 3:
                    return <Result successCount={this.state.correct} errorCount={this.state.incorrect} reset={this.reset}/>
            }
    }
}