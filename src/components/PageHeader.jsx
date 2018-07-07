import React, { Component } from 'react'
import { Link } from 'react-router'
import { Layout } from 'antd'

const { Header } = Layout

const propTypes = {
};

const contextTypes = {
  // router: React.PropTypes.object.isRequired
};

class PageHeader extends Component {

  render() {
    return (
      <Link to={'data-source/data-tree'}>
        <Header className="header" style={{ paddingLeft: '20px' }}>
          <img className="logo" src="../../images/logo.png" style={{ width: '30px' }} />
          <span className="logo-description">数据监控系统</span>
        </Header>
      </Link>
    );
  }
}

PageHeader.propTypes = propTypes;
PageHeader.contextTypes = contextTypes;

export default PageHeader;
