//NPM
import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import {StyleSheet, css} from 'aphrodite';


const SortableItem = class SortableElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusID: '',
      showDiv: false,
    }
  }

  handleClick = (uid) => {
    this.props.removeFile(uid)
  }

  handleDragStart = (e) => {
    this.setState({
      focusID: '',
      showDiv: false
    })
  }

  handleMouseOver = (e) => {
    this.setState({
      focusID: e.target.id,
      showDiv: true
    })
  }

  handleMouseLeave = (e) => {
    this.setState({
      focusId: '',
      showDiv: false
    })
  }


  render() {
    let { src, id, many, handleDrop } = this.props;
    return (
      <li
      className={many ? `DropZone ${css(styles.DropZone)}` : `DropZone ${css(styles.DropZonePairs)}`}
      id={`dropzone${id}`}
      draggable="true"
      onDragStart={this.handleDragStart}
      onDrop={handleDrop}
      onMouseEnter={this.handleMouseOver}
      onMouseLeave={this.handleMouseLeave}
      >
        <img 
            draggable="false" 
            onMouseEnter={this.handleMouseOver}
            className={css(styles.preview)} 
            id={id} 
            src={src} 
        />
       {id === Number(this.state.focusID) && this.state.showDiv
          ? (<span className={css(styles.CloseButton)} onClick={() => this.handleClick(id)}>
              <p className={css(styles.ButtonText)}>-</p>
            </span>)
          : null }
      </li>
    )
  }
};


let styles = StyleSheet.create({
  DropZone: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: 142,
    height: 180,
    overflow: "hidden",
    margin: 10,
    color: "black",
    lineHeight: 1.5,
    textAlign: "center",
    cursor: "pointer",
    boxShadow: 'rgba(0,0,0,0.39) 0px 0px 2px 0px',
    border: "1px dashed #ccc",
    ":hover": {
      transform: "scale(1.03)",
      boxShadow: 'rgba(129,148,167,0.39) 0px 3px 20px 0px',
      border: "1px dashed black",
    }
  },
  DropZonePairs: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: 200,
    height: 320,
    overflow: "hidden",
    margin: 10,
    color: "black",
    lineHeight: 1.5,
    textAlign: "center",
    cursor: "pointer",
    boxShadow: 'rgba(0,0,0,0.39) 0px 0px 2px 0px',
    border: "1px dashed #ccc",
    ":hover": {
      transform: "scale(1.03)",
      border: "1px dashed black",
    }
  },
  preview: {
    objectFit: "cover",
    width: "auto",
    height: "auto",
    minWidth: "100%",
    maxWidth: "100%",
    minHeight: "102%",
    maxHeight: "102%",
    float: "left",
    overflow: "hidden"
  },
  CloseButton: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    top: 1,
    right: 0.5,
    height: 18,
    width: 18,
    borderRadius: "50%",
    color: "white",
    background: "rgba(255, 0, 0)",
    boxShadow: 'rgba(129,148,167,0.39) 0px 3px 20px 0px',
    transition: "all 0.2s ease-in-out",
    opacity: 0.8,
    ":hover": {
      transform: "scale(1.04)",
      opacity: 1
    }
  },
  ButtonText: {
    margin: 0,
    paddingBottom: 2
  }
});

export default SortableElement(SortableItem);