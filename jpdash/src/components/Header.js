import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';

export default class Header extends Component {
    render() {
        return (
            <nav style={styles.nav} className='main-nav'>
                <ul style={styles.navUl} className='main-nav-ul'>
                    <li>
                        <Link to="/">
                        <p style={styles.head1} className='head1'>
                            JP Enterprises
                        </p>
                        </Link>
                    </li>
                    <li>
                        <Link to="/errors">
                        <Icon type="exclamation-circle" />
                            Errors
                        </Link>
                    </li>
                    <li>
                        <Link to="/accounts">
                        <Icon type="user" />
                            Accounts
                        </Link>
                    </li>
                </ul>
            </nav>
        );
    }
}

const styles = {
    nav: {
        width: '100%',
        height: 100,
        backgroundColor: '#F4F5F7',
        marginBottom: '10px'
    },
    navUl: {
        display: 'inline',
        listStyle: 'none',
        color : '#FFFFFF',
        position:'relative',
        top: 20
    },
    head1: {
        fontFamily: 'Roboto',
        display: 'inline',
        color: '#000000',
        fontSize: 36,
    }
}