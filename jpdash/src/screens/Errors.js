import React, { Component } from 'react';
import Axios from 'axios';
import { Row, Col, Button, Icon } from 'antd';
import ErrorCard from '../components/ErrorCard';


const DATA_URL = 'http://localhost:5000/errors'
export default class ErrorPage extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: [],
            total:0,
            selected:0,
            notSelected:0,
            selections: [],
            uploading: false,
        }
    }
    async componentWillMount(){
        const resp = await Axios.get(DATA_URL);
        // console.log(resp);
        this.setState({ data: resp.data, total: resp.data.length, selected:0, notSelected:resp.data.length })
        // console.log(this.state);

    }

    handleSubmit = async ()=>{
        this.setState({uploading: true});
        try{
            console.log(this.state.selections);
            const resp = await Axios.post( DATA_URL,{ data: this.state.selections });

        }catch(err){
            console.log(err);
        }
        this.setState({uploading: false})
    }

    handleRadioChange = (name, custid)=>{
        const newMapping = {  name,  custid };
        const mappingindex = this.state.selections.findIndex((obj=>obj.name===name))
        const selections = this.state.selections;
        var selected,notSelected;
        if(mappingindex<0){
            selections.push(newMapping);
            selected = this.state.selected + 1;
            notSelected = this.state.notSelected-1;
        }else{
            selections[mappingindex].custid = custid;
            selected = this.state.selected;
            notSelected = this.state.notSelected;
        }
        this.setState({ selections, selected, notSelected });
        // console.log(selections);
    }
    render() {
        return (
            <div style={styles.wrapper} className='error-wrapper'>
                {this.state.data.map((err,index)=>(
                    <Row type='flex' justify='space-around' >
                        <Col span={24}>
                            <ErrorCard changeHandler={this.handleRadioChange} key={index} errorData = {err} />
                        </Col>
                    </Row>
                ))}
                <div style={styles.errorWrapper} className='error-submit-wrapper'>
                    <Row align='mid'>
                        <Col span={3}>
                            Total: {this.state.total}
                        </Col>
                        <Col span={3}>
                            Selected: {this.state.selected}
                        </Col>
                        <Col span={3}>
                            Not Selected: {this.state.notSelected}
                        </Col>
                        <Col span={15}>
                            <Button style={{float:'right'}} loading={this.state.uploading} onClick={this.handleSubmit}>
                                <Icon type='upload'/>
                                Submit
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

const styles = {
    wrapper : {
        width : '100%',
        margin: '20px',
    },
    errorWrapper : {
        position: 'fixed',
        bottom: 0,
        left:0,
        width: '100%',
        backgroundColor: '#772EEE',
        height : 60,
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.50)',
        color: 'white',
        padding: 10,
    }
}