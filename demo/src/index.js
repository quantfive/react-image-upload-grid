import React, {Component} from 'react'
import {render} from 'react-dom'
import {StyleSheet, css} from 'aphrodite'
import DragNDrop from '../../src'
import arrayMove from 'array-move';

class App extends Component {
  state = {
    images: [],
  }

  /**
   * After the image is added, set it into state
   */
  imageAddedCallback = (files) => {
    let images = [...this.state.images, ...files];
    this.setState({
      images,
    })
  }

  onSortEnd = (images) => {
    this.setState({
      images,
    })
  }

  render() {
    return (
      <div className={css(styles.container)}>
        <DragNDrop
          images={this.state.images}
          imageAddedCallback={this.imageAddedCallback}
          onSortEnd={this.onSortEnd}
        />
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