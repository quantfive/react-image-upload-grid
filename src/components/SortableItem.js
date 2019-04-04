//NPM
import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { StyleSheet, css } from 'aphrodite';

const SortableItem = class SortableElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focusID: '',  //saves id from events to specify changes
      showDiv: false, //when true, shows button that allows user to remove image
    }
  }

  /**
   * Deletes image
   * @param { String } uid -- unique id passed by IIFE triggered onClick
   */
  handleClick = (uid) => {
    this.props.removeFile(uid)
  }

  /**
   * Reveals button that allows user to delete image
   * @param { Event} e -- event triggered by MouseOver
   */
  handleMouseOver = (e) => {
    this.setState({
      focusID: e.target.id,
      showDiv: true
    })
  }

  /**
   * Hides button that allows user to delete image
   * @param { Event} e -- event triggerd by MouseLeave
   */
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
      draggable="false" //prevents user from dragging, else messes up 'react-sortable-hoc' 
      onDrop={handleDrop}
      onMouseEnter={this.handleMouseOver}
      onMouseLeave={this.handleMouseLeave}
      >
        <img 
            draggable="false" //prevents user from dragging, else messes up 'react-sortable-hoc' 
            onMouseEnter={this.handleMouseOver}
            className={css(styles.preview)} 
            id={id} 
            src={src} 
        />
       {(id === Number(this.state.focusID) && this.state.showDiv)
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
    ":hover": {
      transform: "scale(1.03)",
      boxShadow: 'rgba(129,148,167,0.39) 0px 3px 20px 0px',
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
    top: 1.5,
    right: 1.5,
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