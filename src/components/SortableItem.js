//NPM
import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { StyleSheet, css } from 'aphrodite';
import Dropzone from 'react-dropzone'

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
   * @param { Event } e -- the onClick event
   * @param { String } uid -- unique id passed by IIFE triggered onClick
   */
  handleClick = (e, uid) => {
    e.stopPropagation();
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
      // <Dropzone onDrop={this.onDrop} className={css(styles.DropZoneGrid)}>
      //   {({getRootProps, getInputProps}) => {
      //     return (
      //       <li
      //         className={`DropZone ${css(styles.DropZone)}`}
      //         id={`dropzone${id}`}
      //         draggable="false" //prevents user from dragging, else messes up 'react-sortable-hoc' 
      //         onMouseEnter={this.handleMouseOver}
      //         onMouseLeave={this.handleMouseLeave}
      //         {...getRootProps()}
      //         >
      //         <input {...getInputProps()} />
      //         <img 
      //           draggable="false" //prevents user from dragging, else messes up 'react-sortable-hoc' 
      //           className={css(styles.preview)} 
      //           id={id}
      //           src={src} 
      //         />
      //       {(id === Number(this.state.focusID) && this.state.showDiv)
      //           ? (<span className={css(styles.CloseButton)} onClick={(e) => this.handleClick(e, id)}>
      //               <p className={css(styles.ButtonText)}>-</p>
      //             </span>)
      //           : null }
      //       </li>
      //     )
      //   }}
      // </Dropzone>
      <li
        className={`DropZone ${css(styles.DropZone)}`}
        id={`dropzone${id}`}
        onMouseEnter={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        >
        <img 
          draggable="false" //prevents user from dragging, else messes up 'react-sortable-hoc' 
          className={css(styles.preview)} 
          id={id}
          src={src} 
        />
      {(id === Number(this.state.focusID) && this.state.showDiv)
          ? (<span className={css(styles.CloseButton)} onClick={(e) => this.handleClick(e, id)}>
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
    width: 180,
    height: 180,
    overflow: "hidden",
    margin: 10,
    color: "black",
    lineHeight: 1.5,
    textAlign: "center",
    cursor: "pointer",
    borderRadius: 4,
    outline: 'none',
    cursor: 'pointer',
    border: '1px solid #ddd',
    // boxShadow: 'rgba(0,0,0,0.39) 0px 0px 2px 0px',
    ":hover": {
      transform: "scale(1.03)",
      boxShadow: 'rgba(129,148,167,0.39) 0px 3px 10px 0px',
    }
  },
  preview: {
    objectFit: "contain",
    width: "auto",
    height: "auto",
    minWidth: "100%",
    maxWidth: "100%",
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
    top: 6,
    right: 6,
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