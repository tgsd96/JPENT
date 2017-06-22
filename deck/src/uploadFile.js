import React, {Component} from 'react';
import "./uF.css";

let thisStyle = {
    backgroundColor : "white",
    marginBottom : "30px",
    padding : "10px",
};

export default class UploadFile extends Component{
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
        this.upload = this.upload.bind(this)
        this.state = {
            completed : false,
            selection : "",
            loading : false,
        };
    }
    componentDidMount(){
        this.state = {
            completed : false,
            selection : "",
            loading : false,
        };
    }
    handleChange(evt){
        this.setState({selection : evt.target.value})
        console.log(this.state.selection);
    }
    upload(evt){
        evt.preventDefault();
        var files = document.getElementById('newFile').files[0];   
        var formData = new FormData();
        this.setState({loading : true});
        // formData.append()
        console.log(files);
        formData.append('upload', files, files.name);
        var xhr = new XMLHttpRequest();
        var company = this.state.selection;
        xhr.open('POST', 'http://localhost:5000/upload/'+company,true);
        xhr.onload = () =>{
            if(xhr.status === 200){
                 this.setState({ completed : true});
                 this.setState({loading :false});
            }else{
                 this.setState({completed : false});
            }
        }
        xhr.send(formData);
    }

    render(){
        let but = <h3></h3>
        const ifCompleted = this.state.completed;
        const ifLoading = this.state.loading;
        if(ifLoading){
            but = <h3>Uploading........</h3>
        }
        if(ifCompleted){
            but = <h3>Upload Finish</h3>
        }
        return(
            <form style={thisStyle} onSubmit={this.upload} className="uploadForm">
                <h1 className="Brand">J.P. ENTERPRISES</h1>
                <h3>Upload A new File</h3>
                {
                    this.props.company.map((val)=>{
                        return(
                            <div key={val}>
                            <input  type="radio" name="company" value={val} onChange={this.handleChange} />
                            <span>{val}</span>
                            </div>
                        )
                    })
                }
                <input type="file" name="file" ref="file" id="newFile" className="buttons"/>
                <input type="submit" name="submit" value ="Submit" className="buttons" />
                {but}
                </form>
        )
    }
} 