import React, {Component} from 'react'
import {render} from 'react-dom'
import {StyleSheet, css} from 'aphrodite'
import DragNDrop from '../../src'

class App extends Component {
  render() {
    return <div>
      <DragNDrop/>
    </div>
  }
}


render(<App/>, document.querySelector('#demo'))