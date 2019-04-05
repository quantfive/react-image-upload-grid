import React, {Component} from 'react'
import {render} from 'react-dom'
import {StyleSheet, css} from 'aphrodite'
import DragNDrop from '../../src'

class App extends Component {
  render() {
    return (
      <div className={css(styles.container)}>
        <DragNDrop/>
      </div>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    boxShadow: 'rgba(129,148,167,0.39) 0px 0px 2px 0px',
    padding: 16,
  }
})


render(<App/>, document.querySelector('#demo'))