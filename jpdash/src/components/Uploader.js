import React, { Component } from 'react';
import { Row,Col,Radio,Upload, Icon, Button, Alert } from 'antd';

const RadioGroup = Radio.Group;
const Dragger = Upload.Dragger;

export default class Uploader extends Component {

    state = {
        file: null,
        uploading: false,
        selection: '',
        completed: false,
        successCount : 0,
        errorCount : 0
    }
    handleSubmit = ()=>{
        const { file } = this.state;
        const formData = new FormData();
        formData.append('upload',file,file.name);
        this.setState({ uploading: true });
        this.setState({completed: false})
        const company = this.state.selection
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:5000/upload/'+company,true);
        xhr.onload = () =>{
            if(xhr.status === 200){
                 this.setState({ completed : true});
                 this.setState({uploading :false});
                 const resp = JSON.parse(xhr.response);
                 this.setState({ errorCount:resp.error, successCount:resp.success})
                 console.log(this.state);
            }else{
                 this.setState({completed : false});
            }
        }
        xhr.send(formData);

    }
    render() {
        return (
            <Col span={12} style={styles.uploader} className='uploader'>
                <Row>
                    <Col span={12} >
                        <h3>Upload purchases</h3>
                    </Col>
                </Row>
                <Row>
                    <p>Choose Company</p>
                </Row>
                <Row>
                    <RadioGroup onChange={(e)=>this.setState({ selection: e.target.value })}>
                        <Radio value='mar'>Marico</Radio>
                        <Radio value='col'>Colgate</Radio>
                        <Radio value='marg'>Marg</Radio>
                        <Radio value='god'>Godrej</Radio>
                        <Radio value='cad'>Cadbury</Radio>
                    </RadioGroup>
                </Row>
                <Row>
                    <h4 style={{marginTop: 10}}>Select xlsx file</h4>
                </Row>
                <Row>
                <Upload 
                 name='upload'
                 beforeUpload={(file)=>{
                     this.state.file = file;
                     return false;
                 }}
                 >
                <Button >
                    <Icon type="upload" />
                     Click to Upload
                </Button>
                </Upload>
                </Row>
                <Row type='flex' justify='space-around'>
                    <Button onClick={()=>this.handleSubmit()} loading={this.state.uploading}>
                        Submit
                        <Icon type="send" />
                    </Button>
                </Row>
                <Row style={{marginTop: 10}}>
                    <Alert message={`${this.state.successCount} correct insertions`} type='success'/>
                    <Alert message={`${this.state.errorCount} error while inserting`} type='error'/>
                </Row>
            </Col>
        );
    }
}

const styles = {
    uploader: {
        backgroundColor: '#FFFFFF',
        height: 350,
        borderRadius: 12,
        margin: 3,
        boxShadow: '0 2px 4px 0 rgba(0,0,0,0.50)',
        padding: 10,
    }
}
