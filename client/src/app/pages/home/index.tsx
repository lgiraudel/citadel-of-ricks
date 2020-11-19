import React from 'react';
import { Link } from 'react-router-dom';
import { Typography } from 'antd';

const { Title } = Typography;

function Home() {
    return (
        <>
            <Title style={{color: '#fff'}}>Populate your own Citadel of Ricks!</Title>
            <Link to="/characters">See all your citadel citizens</Link>
        </>
    );
}

export {
    Home as default,
};
