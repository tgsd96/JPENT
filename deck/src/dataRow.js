import React,{Component} from 'react';

export default class DataRow extends Component{
    constructor(props){
        super(props);

    }
    render(){
        let commonStyle = {
            padding : '10px',
            border : '1px solid #E0E0E0',   
            color : '#607D8B'
        }
        return(
            <tr style={commonStyle}>
                <td style={commonStyle}>{this.props.data['id']}</td>
                <td style={commonStyle}>{this.props.data['party']}</td>
                <td style={commonStyle}>{this.props.data['billno']}</td>
                <td style={commonStyle}>{this.props.data['date']}</td>
                <td style={commonStyle}>{this.props.data['billvalue']}</td>
            </tr>
        );
    }
}