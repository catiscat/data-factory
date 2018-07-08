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
        style={{ width: 300, float: 'right', marginRight: '10px', paddingBottom: '5px' }}
      />
    );
  }

  renderItems() {
    const { items = [] } = this.props;
    return items.map(item => (
      <div style={{ marginRight: '10px' }}>{item}</div>
    ))
  }
  render() {
    return (
      <div className={'search-group'} >
        {this.renderSearch()}
        {this.renderItems()}
      </div>
    );
  }
}

export default SearchGroup;
