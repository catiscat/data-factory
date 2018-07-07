import React, { Component } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  lineAge: PropTypes.array,
  onFetchLineAge: PropTypes.func,
}

class LineAge extends Component {
  state = {}
  componentDidMount() {
    const { onFetchLineAge } = this.props;
    onFetchLineAge && onFetchLineAge();

  }
  render() {
    return <h3>LineAge</h3>
  }
}

export default LineAge;
