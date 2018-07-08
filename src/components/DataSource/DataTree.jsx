import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { setKeys } from '../../utils/tableDataTool';
import SearchGroup from '../Common/SearchGroup';


const propTypes = {
  onFetchDataTree: PropTypes.func,
  dataTree: PropTypes.object,
}

const defaultProps = {}

class DataTree extends Component {
  constructor(props) {
    super(props)
    const { dataTree = {} } = this.props;
    this.state = { dataSource: setKeys(dataTree && dataTree.DataChangeRecords) }
  }

  componentDidMount() {
    const { onFetchDataTree } = this.props;
    onFetchDataTree();
  }

  componentWillReceiveProps(nextProps, nextState) {
    if (nextProps.dataTree) {
      const { dataTree = {} } = nextProps;
      this.setState({ dataSource: setKeys(dataTree && dataTree.DataChangeRecords) })
    }
  }


  handleSearch = (value) => {
    const { dataTree = {} } = this.props;
    const filetred = (dataTree.DataChangeRecords || []).filter(record => {
      var a = (b) => {
        if (b) {
          return 'yes'
        } else {
          return 'no'
        }
      }
      return (record.tableName
        + record.databaseName
        + record.ymd
        + record.partitionValue
        + record.numRows
        + record.uniqueNumRows
        + record.duplicate
        + record.duplicateRate
        + a(record.hasDuplicate)
        + a(record.hasRingThanGrow) || '').search(value) > -1
    })
    this.setState({ dataSource: setKeys(filetred) });
  }

  getColumns() {
    const columns = [{
      title: '库',
      dataIndex: 'databaseName',
      key: 'databaseName',
      width: 100,
      fixed: 'left'

    }, {
      title: '表',
      dataIndex: 'tableName',
      key: 'tableName',
      width: 200,
      fixed: 'left'
    }, {
      title: '时间',
      dataIndex: 'ymd',
      key: 'ymd',
      width: 100,
      render: (text, record, index) => {
        if (record.hasDuplicate || !record.hasRingThanGrow) {
          return (<div style={{ color: '#e6a23c' }} >
            {text}
          </div>)
        } else {
          return (<div>{text}</div>)
        }
      },
      sorter: (a, b) => {
        if (a.ymd > b.ymd) {
          return -1;
        } else {
          return 1;
        }
      },
      defaultSortOrder: 'descend',
    }, {
      title: '分区',
      dataIndex: 'partitionValue',
      key: 'partitionValue',
      width: 100,
    }, {
      title: '行数',
      dataIndex: 'numRows',
      key: 'numRows',
      width: 200,
    }, {
      title: '是否重复',
      dataIndex: 'hasDuplicate',
      key: 'hasDuplicate',
      width: 200,
      render: (text, record, index) => {
        if (record.hasDuplicate) {
          return (<div className={'warn-column'} style={{ backgroundColor: '#e6a23c' }} >
            {'yes'}
          </div>)
        } else {
          return (<div style={{}} >
            {'no'}
          </div>)
        }
      },
    }, {
      title: '是否增长',
      dataIndex: 'hasRingThanGrow',
      key: 'hasRingThanGrow',
      width: 150,
      render: (text, record, index) => {
        if (!record.hasRingThanGrow) {
          return (<div className={'warn-column'} style={{ backgroundColor: '#f56c6c' }} >
            {'no'}
          </div>)
        } else {
          return (<div style={{}} >
            {'yes'}
          </div>)
        }
      },
    }, {
      title: '去重后行数',
      dataIndex: 'uniqueNumRows',
      key: 'uniqueNumRows',
      width: 200,
    }, {
      title: '重复行数',
      dataIndex: 'duplicate',
      key: 'duplicate',
      width: 200,
    }, {
      title: '重复率',
      dataIndex: 'duplicateRate',
      key: 'duplicateRate',
      width: 200,
    }, {
      title: '环比增长行数',
      dataIndex: 'ringThanNumRows',
      key: 'ringThanNumRows',
      width: 250,
    }, {
      title: '同比增长行数',
      dataIndex: 'sameThanNumRows',
      key: 'sameThanNumRows',
      width: 250,
    }, {
      title: '环比',
      dataIndex: 'ringThanNumRowsRate',
      key: 'ringThanNumRowsRate',
      width: 100,
    }, {
      title: '同比',
      dataIndex: 'sameThanNumRowsRate',
      key: 'sameThanNumRowsRate',
      width: 100,
    }, {
      title: '重复行数环比',
      dataIndex: 'duplicateRingThanNumRowsRate',
      key: 'duplicateRingThanNumRowsRate',
      width: 250,
    }, {
      title: '重复行数同比',
      dataIndex: 'duplicateSameThanNumRowsRate',
      key: 'duplicateSameThanNumRowsRate',
      width: 250,
    }, {
      title: '同比日期',
      dataIndex: 'sameThanDate',
      key: 'sameThanDate',
      width: 150,
      fixed: 'right'
    }
    ];
    return columns;
  }

  render() {
    const { dataSource } = this.state;
    return (
      <div>
        <h3>数据量状况</h3>
        <SearchGroup onSearch={this.handleSearch} />
        <Table
          scroll={{ x: 1500, y: 300 }}
          dataSource={dataSource || []}
          columns={this.getColumns()}
          loading={!dataSource}
        />
      </div>
    )
  }
}

DataTree.propTypes = propTypes;
DataTree.defaultProps = defaultProps;

export default DataTree;
