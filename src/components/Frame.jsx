import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Layout, Breadcrumb } from 'antd'
import PageHeader from './PageHeader'
import PageSidebar from './PageSidebar'

const { Content, Footer } = Layout

const contextTypes = {
  router: PropTypes.object.isRequired,
};


class Frame extends Component {
  render() {
    const { children } = this.props;
    return (
      <Layout className="frame-layout">
        {<PageHeader />}
        <Layout>
          {<PageSidebar />}
          <Layout style={{ padding: '0 24px 24px' }}>
            <Breadcrumb style={{ margin: '16px 0' }}>
              <Breadcrumb.Item>省钱快报-元数据管理平台</Breadcrumb.Item>
              {/* <Breadcrumb.Item>List</Breadcrumb.Item>
              <Breadcrumb.Item>App</Breadcrumb.Item> */}
            </Breadcrumb>
            <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
              { children || 'Page.Content' }
            </Content>
            <Footer style={{ textAlign: 'center' }}>
              省钱快报数据管理系统 ©2018 Created by 省钱快报
            </Footer>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

Frame.contextTypes = contextTypes;
export default Frame;
