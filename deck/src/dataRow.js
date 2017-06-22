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
                <td style={commonStyle}>{this.props.data['sales145']}</td>
                <td style={commonStyle}>{this.props.data['sales125']}</td>
                <td style={commonStyle}>{this.props.data['sat2']}</td>
                <td style={commonStyle}>{this.props.data['sales5']}</td>
                <td style={commonStyle}>{this.props.data['vat4']}</td>
                <td style={commonStyle}>{this.props.data['sat1']}</td>
                <td style={commonStyle}>{this.props.data['roff']}</td>
            </tr>
        );
    }
}