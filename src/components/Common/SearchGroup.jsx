import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input } from 'antd';

const Search = Input.Search;
const propTypes = {
  onSearch: PropTypes.func,
}

class SearchGroup extends Component {

  renderSearch() {
    const { onSearch } = this.props;
    return (
      <Search
        placeholder="请输入搜索内容"
        onSearch={onSearch}
        style={{ width: 300, float: 'right', margin: '10px' }}
      />
    );
  }
  render() {
    return (
      <div style={{ backgroundColor: '#f0f2f5', height: '50px' }}>
        {this.renderSearch()}
      </div>
    );
  }
}

export default SearchGroup;
