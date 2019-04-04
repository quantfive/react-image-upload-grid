import React, { Component } from 'react';

// NPM Modules
import { StyleSheet, css } from 'aphrodite';
import Dropzone from 'react-dropzone'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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

  /**
   * When files are uploaded
   * @param { Object } acceptedFiles -- the files we've accepted
   */
  onDrop = (acceptedFiles) => {
    this.props.appendFile(acceptedFiles);

    acceptedFiles.forEach(file => {
      const reader = new FileReader()

      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = () => {
        // Do whatever you want with the file contents
        const blob = reader.result;
  
        this.props.saveBlob(blob);
      }
  
      reader.readAsDataURL(file)
    })
  }

  render() {
    let { id, images } = this.props;

    return (
      <Dropzone
        onDrop={this.onDrop}
        className={css(styles.DropZoneGrid)}>
        {({getRootProps, getInputProps}) => {
          return (
            <div 
              className={css(styles.DropZoneHero) + ' ' + this.props.dropzoneClassName}
              {...getRootProps()}
              >
              <input {...getInputProps()} />
              { this.props.addText ? this.props.addText : <FontAwesomeIcon icon={faPlus} size={'2x'} /> }
            </div>
          )
        }}
      </Dropzone>
    )
  }
}

let styles = StyleSheet.create({
  DropZoneHero: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: 180,
    height: 180,
    overflow: "hidden",
    margin: 10,
    outline: 'none',
    fontFamily: "Helvetica",
    color: "black",
    lineHeight: 1.5,
    textAlign: "center",
    alignItems: 'center',
    cursor: "pointer",
    // boxShadow: 'rgba(129,148,167,0.39) 0px 3px 10px 0px',
    border: "2px dashed #ccc",
    ":hover": {
      transform: "scale(1.03)",
      border: "2px dashed black",
    },
  },
  preview: {
    objectFit: "contain",
    width: "auto",
    height: "auto",
    float: "left",
    overflow: "hidden"
  },
  DropZoneGrid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
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