import React from 'react';
import { Layout, Typography } from 'antd';
import Breadcrumb from '../../shared/breadcrumb';
import { withRouter } from 'react-router';
import { Location } from 'history';
import citizenImage from './assets/citizen.png';
import citadelImage from './assets/citadel.png';
import rickImage from './assets/rick.png';
import mortyImage from './assets/morty.jpeg';

const { Header, Footer, Content } = Layout;
const { Title } = Typography;

const getBackgroundImage = ({ pathname, search }: Location) => {
    if (pathname.match(/^\/characters$/)) {
        return citizenImage;
    }
    if (pathname.match(/^\/$/)) {
        return citadelImage;
    }
    if (pathname.match(/\/characters\/new/)) {
        const character: string = `${pathname}${search}`.match(/\/characters\/new\?type=(.+)/)[1];
        switch (character) {
            case 'rick':
                return rickImage;
            case 'morty':
                return mortyImage;
        }
      }
    }

export default withRouter(({ children, location }) => {
    const backgroundImage = getBackgroundImage(location);
    return (
        <Layout>
            <Header>
                <Title style={{color: '#fff', margin: '0.2em 0 0'}}>My Citadel of Ricks!</Title>
            </Header>
            <Content style={{padding: '20px 50px', minHeight: 600, position: 'relative', backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover'}}>
                <Breadcrumb />
                {children}
            </Content>
            <Footer style={{textAlign: 'center'}}>Created by Loïc Giraudel</Footer>
        </Layout>
    )
});
