import { Breadcrumb } from 'antd';
import React from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import { HomeOutlined } from '@ant-design/icons';
import { Location } from 'history';

const capitalize = (str: string): string => `${str.charAt(0).toUpperCase()}${str.slice(1)}`

type Crumb = {
  path: string;
  label: JSX.Element | string;
}

const pathToCrumbs = ({ pathname, search }: Location): Crumb[] => {
  const crumbs = [];

  if (pathname.match(/^\//)) {
    crumbs.push({
      path: '/',
      label: <HomeOutlined />
    });
  }
  if (pathname.match(/\/characters/)) {
    crumbs.push({
      path: '/characters',
      label: 'Characters'
    });
  }
  if (pathname.match(/\/characters\/new/)) {
    const character: string = `${pathname}${search}`.match(/\/characters\/new\?type=(.+)/)[1];
    crumbs.push({
      path: `${pathname}${search}`,
      label: `New ${capitalize(character)}`
    })
  } else if (pathname.match(/\/characters\/.+/)) {
    crumbs.push({
      path: pathname,
      label: 'Character details'
    });
  }

  return crumbs;
}

export default withRouter(({ location }) => {
  const crumbs = pathToCrumbs(location);

  return (
    <Breadcrumb style={{ margin: '16px 0' }}>
      {crumbs.map(({ path, label }, key) => (
        <Breadcrumb.Item key={key}>
          <Link to={path}>{label}</Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  )
});
