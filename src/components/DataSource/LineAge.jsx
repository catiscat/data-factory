import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Spin, Slider, Switch, Select, Popover, Button, Icon } from 'antd';
import jsgraphs from 'js-graph-algorithms';
import DataSet from 'vis/lib/DataSet';
import Network from 'vis/lib/network/Network';
import SearchGroup from '../Common/SearchGroup';


const propTypes = {
  lineAge: PropTypes.array,
  onFetchLineAge: PropTypes.func,
  noData: false
}

class LineAge extends Component {
  state = {
    didMount: false,
    loading: true,
    lineAge: this.props.lineAge
  }
  componentWillMount() {
    const { onFetchLineAge } = this.props;
    onFetchLineAge && onFetchLineAge();
  }

  componentWillReceiveProps(nextProps) {
    const { lineAge } = nextProps;
    const { didMount } = this.state;
    if (lineAge && lineAge.LineAgeList) {
      didMount === true && this.handleSearch('sqkb_pingback', nextProps);
      this.setState({ lineAge })
    }
  }

  componentDidMount() {
    this.setState({ didMount: true });
  }

  filterLineAge(lineAgeList = [], query, level = 1) {
    console.log(query, lineAgeList, 'query');
    let res = [];
    res = res.concat(lineAgeList.filter((line) => {
      let from = `${line.fromDatabase}.${line.fromTable}`;
      let to = `${line.toDatabase}.${line.toTable}`;
      return from.search(query) >= 0 || to.search(query) >= 0;
    }));
    if (level > 1) {
      res.concat(this.filterWithLevel(res, level - 1));
    }
    return res;

  }

  filterWithLevel(lineAgeList, level = 1) {
    const { lineAge = {} } = this.state;
    console.log(lineAge, 'filterWithLevel');
    if (level > 0) {
      let res = [];
      level -= 1;
      lineAgeList.forEach((line) => {
        let outfrom = `${line.fromDatabase}.${line.fromTable}`;
        // let outto = `${line.toDatabase}.${line.toTable}`;
        res = res.concat((lineAge.lineAgeList || []).filter((subLine) => {
          let from = `${subLine.fromDatabase}.${subLine.fromTable}`;
          let to = `${subLine.toDatabase}.${subLine.toTable}`;
          return from.search(outfrom) >= 0 || to.search(outfrom) >= 0 || to.search(outfrom) >= 0 || to.search(outfrom) >= 0;
        }));
      })

      lineAgeList = lineAgeList.concat(this.filterWithLevel(res, level));
    }
    return lineAgeList;
  }

  handleSearch = (query, nextProps) => {
    this.setState({ loading: true });
    const { lineAge = {} } = nextProps || this.props;
    let filterData = this.filterLineAge(lineAge.LineAgeList, query, 2);
    if (filterData.length < 1) {
      this.setState({
        noData: true
      });
    }
    console.log(filterData, 'filterData');
    this.renderGraphs(filterData)
  }

  getConfigContent() {
    return (
      <div>
        levelSeparation:<Slider defaultValue={30} />
        nodeSpacing: <Slider defaultValue={30} />
        treeSpacing:<Slider defaultValue={30} />
        blockShifting:<Switch /><br />
        edgeMinimization:<Switch /><br />
        parentCentralization:<Switch /><br />
        direction:<Select /><br />
      </div>
    );
  }

  renderGraphs(lineAgeList) {
    let id2Map = new Map();
    let map2ID = new Map();
    let cnt = 0;
    lineAgeList.forEach((line) => {
      // let from = `${line.fromDatabase}`;
      // let to = `${line.toDatabase}`;

      let from = `${line.fromDatabase}\n${line.fromTable}`;
      let to = `${line.toDatabase}\n${line.toTable}`;

      console.log(map2ID.get(from), from, map2ID, 'map2ID get ');
      if (map2ID.get(from) === undefined) {
        id2Map.set(cnt, from);
        map2ID.set(from, cnt)
        cnt += 1;
      }

      if (map2ID.get(to) === undefined) {
        id2Map.set(cnt, to);
        map2ID.set(to, cnt)
        cnt += 1;
      }
    });

    let gLength = map2ID.size;

    let g = new jsgraphs.DiGraph(gLength); // 13 is the number vertices in the graph
    lineAgeList.forEach((line) => {
      // let from = `${line.fromDatabase}`;
      // let to = `${line.toDatabase}`;

      let from = `${line.fromDatabase}\n${line.fromTable}`;
      let to = `${line.toDatabase}\n${line.toTable}`;
      g.addEdge(map2ID.get(from), map2ID.get(to)); // add directed edge from 4 to 2
    })


    let g_nodes = [];
    let g_edges = [];
    for (let v = 0; v < g.V; ++v) {
      g.node(v).label = id2Map.get(v); // assigned 'Node {v}' as label for node v
      g_nodes.push({
        id: v,
        label: g.node(v).label
      });

      let adj_v = g.adj(v);
      for (let i = 0; i < adj_v.length; ++i) {
        let w = adj_v[i];
        g_edges.push({
          from: v,
          to: w,
          arrows: 'to'
        });
      }
    }

    const nodes = new DataSet(g_nodes);

    // create an array with edges
    const edges = new DataSet(g_edges);

    // create a network
    const container = document.getElementById('graphs');
    const data = {
      nodes,
      edges
    };
    console.log(data, 'data')
    // const options = {
    //   physics: {
    //     enabled: false,
    //     stabilization: {
    //       iterations: 500
    //     }
    //   }
    // }


    const options = {
      physics: {
        enabled: true,
      },
      layout: {
        hierarchical: {
          sortMethod: 'directed',
          // direction: 'LR',
          // levelSeparation: 560,
          // treeSpacing:560,
          // nodeSpacing: 560,
        }
      },
      edges: {
        smooth: true,
        arrows: { to: true }
      }
    }


    const network = new Network(container, data, options);
    this.setState({ loading: false });
  }

  renderConfig() {
    return (
      <Popover placement="bottomLeft" content={this.getConfigContent()} title="请配置">
        <Button type="primary">图配置</Button>
      </Popover>
    );
  }
  render() {
    const { loading, noData } = this.state;
    return (
      <div>
        <h3>LineAge</h3>
        <SearchGroup onSearch={this.handleSearch} items={[this.renderConfig()]} />
        {loading === true && <Spin style={{ marginLeft: '45%', marginTop: '15%' }} size="large" />}
        {noData === true && <div style={{ textAlign: 'center', marginTop: '6%' }}><Icon type="frown-o" style={{ marginRight: '5px' }} />No Data</div>}
        <div id="graphs" style={{ width: '100%', height: '60vh' }} />
        {}
      </div>
    )
  }
}

export default LineAge;
