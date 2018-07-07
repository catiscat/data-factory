import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table, Input } from 'antd'
import { setKeys } from '../../utils/tableDataTool';
import SearchGroup from '../Common/SearchGroup';


const propTypes = {
  onFetchSchema: PropTypes.func,
  schema: PropTypes.object,
}

const defaultProps = {}

class Schema extends Component {
  constructor(props) {
    super(props)
    const { schema = {} } = this.props;
    this.state = { dataSource: setKeys((schema && schema.TableList)) }
  }

  componentDidMount() {
    const { onFetchSchema } = this.props;
    onFetchSchema();

  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.schema) {
      const { schema = {} } = nextProps;
      this.setState({ dataSource: setKeys((schema && schema.TableList)) })
    }
  }


  handleSearch = (event) => {
    const { schema = {} } = this.props;
    const filetred = (schema.TableList || []).filter((record) => (record.tableName
      + record.databaseName
      + record.owner
      + record.location
      + record.inputFormat
      + record.showCreateTable
      || '').search(event.target.value) > -1)
    this.setState({ dataSource: setKeys(filetred) });
  }

  handleExpand = (expanded, record) => {
    // this.setState({ expandedRowRender: !expanded ? expandedRowRender : undefined });
  }


  expandedRowRender = (record) => {
    const columns = [
      {
        title: '表类型',
        dataIndex: 'tableType',
        key: 'tableType',
        width: 150
      }, {
        title: '表参数',
        dataIndex: 'tableParameters',
        key: 'tableParameters',
        width: 150
      }, {
        title: '最后访问时间',
        dataIndex: 'transientLastDdlTime',
        key: 'transientLastDdlTime',
        width: 150
      }, {
        title: '最后更新人',
        dataIndex: 'lastModifiedBy',
        key: 'lastModifiedBy',
        width: 150
      }, {
        title: '最后修改时间',
        dataIndex: 'lastModifiedTime',
        key: 'lastModifiedTime',
        width: 150
      }, {
        title: 'serDeLibrary',
        dataIndex: 'serDeLibrary',
        key: 'serDeLibrary',
        width: 150
      }, {
        title: '输入格式',
        dataIndex: 'inputFormat',
        key: 'inputFormat',
        width: 150
      }, {
        title: '输出格式',
        dataIndex: 'outputFormat',
        key: 'outputFormat',
        width: 150
      }, {
        title: '压缩',
        dataIndex: 'compressed',
        key: 'compressed',
        width: 150
      }, {
        title: '分桶数量',
        dataIndex: 'numBuckets',
        key: 'numBuckets',
        width: 150
      }, {
        title: 'bucketColumns',
        dataIndex: 'bucketColumns',
        key: 'bucketColumns',
        width: 150
      }, {
        title: 'sortColumns',
        dataIndex: 'sortColumns',
        key: 'sortColumns',
        width: 150
      }, {
        title: 'storageDescParams',
        dataIndex: 'storageDescParams',
        key: 'storageDescParams',
        width: 150
      }, {
        title: '创表语句',
        dataIndex: 'showCreateTable',
        key: 'showCreateTable',
        width: 1000,
      }
    ];
    return (
      <Table
        columns={columns}
        dataSource={[record]}
        pagination={false}
      />
    );
  }

  getColumns() {
    const columns = [{
      title: '库',
      dataIndex: 'databaseName',
      key: 'databaseName',
      width: 100,
    }, {
      title: '表',
      dataIndex: 'tableName',
      key: 'tableName',
      width: 200,

    }, {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 150
    }, {
      title: '所有者',
      dataIndex: 'owner',
      key: 'owner',
      width: 150
    }, {
      title: '最后修改时间',
      dataIndex: 'lastAccessTime',
      key: 'lastAccessTime',
      width: 150
    }, {
      title: '保护模式',
      dataIndex: 'protectMode',
      key: 'protectMode',
      width: 150
    }, {
      title: 'retention',
      dataIndex: 'retention',
      key: 'retention',
      width: 150
    }, {
      title: '存储位置',
      dataIndex: 'location',
      key: 'location',
      width: 400,
    }
    ];
    return columns;
  }
  render() {
    const { schema } = this.props;
    return (
      <div>
        <h3>表元数据</h3>
        <SearchGroup onSearch={this.handleSearch} />
        <Table
          className="components-table-demo-nested"
          dataSource={this.state.dataSource}
          expandedRowRender={this.expandedRowRender}
          columns={this.getColumns()}
          scroll={{ x: 1500, y: 300 }}
          expandRowByClick={false}
          onExpand={this.handleExpand}
        />
        <div>
        </div>
      </div>


    )
  }
}

Schema.propTypes = propTypes;
Schema.defaultProps = defaultProps;

export default Schema;
