//NPM
import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

export default class DropZoneHero extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showImage: false,
      showButton: false
    }
  }

  /**
   * Allows user to add image that are dragged on top of button 
   * @param { Event } e -- allows data from image to be saved onDrop
   * @function { displayPreviw } -- allows the image preview to be shown on the component
   * @function { appendFile } -- function on parent that adds the file to cache and to image array
   */
  handleDrop = (e) => {
    e.preventDefault();
    e.persist();
    let files = e.dataTransfer.files;
    let src = window.URL.createObjectURL(files[0]);
    this.setState({ showImage: true }, () => {
      this.displayPreview(e, src);
      this.props.appendFile(files);
    })
  }

  displayPreview = (e, src) => {
    this.setState({ showImage: true}, () => {
      let img = document.getElementById(`image.${e.target.id}`);
      img.src = src;
    })
  }

  /**
   * Reveals button that allows user to delete image
   * @param { Event } e -- triggered by MouseOver event
   */
  handleMouseOver = (e) => {
    this.setState({
      showButton: true
    })
  }

  /**
   * Hides button that allows user to delete image
   * @param { Event } e -- triggered by MouseLeave event
   */
  handleMouseLeave = (e) => {
    this.setState({
      showButton: false
    })
  }

  /**
   * Allows user to delete image
   * @param { String } uid -- unique id passed by IIFE triggered onClick
   */
  handleClick = (uid) => {
    this.props.removeFile(uid)
  }

  render() {
    let { id, images } = this.props;

    let src = images.length ? window.URL.createObjectURL(images[0]) : null;

    return (
      <div className={css(styles.DropZoneGrid)} onDrop={this.handleDrop}>
        <div 
          className={css(styles.DropZoneHero)}
          id={id}
          draggable="true"
          onMouseOver={this.handleMouseOver}
          onMouseLeave={this.handleMouseLeave}
          onDrop={this.handleDrop}>
        {images.length
          ? <img 
              draggable="false" 
              className={css(styles.preview)} 
              id={`image.${id}`} 
              src={src} 
            />
          : 'Drag & drop to get started!'
        }
        {(this.state.showButton && images.length) 
          ? <span className={css(styles.CloseButton)} onClick={() => this.handleClick(id)}>
              <p className={css(styles.ButtonText)}>-</p>
            </span>
          : null }
        </div>
      </div>
    )
  }
}

let styles = StyleSheet.create({
  DropZoneHero: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: 300,
    height: 300,
    overflow: "hidden",
    margin: 10,
    fontFamily: "Helvetica",
    color: "black",
    lineHeight: 1.5,
    textAlign: "center",
    cursor: "pointer",
    boxShadow: 'rgba(129,148,167,0.39) 0px 3px 10px 0px',
    border: "2px dashed #ccc",
    ":hover": {
      transform: "scale(1.03)",
      border: "2px dashed black",
    },
  },
  preview: {
    objectFit: "cover",
    width: "auto",
    height: "auto",
    minWidth: "100%",
    maxWidth: "100%",
    minHeight: "100%",
    maxHeight: "100%",
    float: "left",
    overflow: "hidden"
  },
  DropZoneGrid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: "80%",
    height: 400,
    overflowY: "scroll",
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
    height: 25,
    width: 25,
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
})