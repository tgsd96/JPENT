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
        width: '90%',
        height: '60',
    },
    navUl: {
        display: 'inline',
        listStyle: 'none',
        color : '#FFFFFF',
    },
    head1: {
        fontFamily: 'AvenirNext-Bold',
        display: 'inline',
        color: '#FFFFFF',
        fontSize: 36,
    }
}