//NPM
import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import {useDropzone} from 'react-dropzone'

export default class DropZoneButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: true //leaving possibility for user to delete image when dropped
    }
  }

  /**
   * Allows user to add image that are dragged on top of button 
   * @param { Event } e -- allows data from image to be saved onDrop
   * @function { appendFile } -- function on parent that adds the file to cache and to image array
   */
  handleDrop = (e) => {
    let files = e.dataTransfer.files;
    this.props.appendFile(files);
  }

  /**
   * Allows user to access the file input
   * @param { Event } e -- triggers synthetic event onClick
   */
  promptImageUpload = (e) => {
    let input = document.getElementById('input');
    input.click();
  }

  /**
   * Allows images that selected in input window to be saved
   * @param { Event } e -- the file/files chosen by the user onChange
   * @function { appendFile } -- function on parent that adds the file to cache and to image array
   */
  handleInputChange = (e) => {
    let fileList = e.target.files;
    this.props.appendFile(fileList);
  }

  render() {
    const {getRootProps, getInputProps} = useDropzone()
    return (
      <div 
        className={css(styles.buttonWrapper)} 
        onClick={this.promptImageUpload} 
        {...getRootProps()}
        >
        <input className={css(styles.input)}
          type="file"
          multiple
          accept="image/*" 
          {...getInputProps()}
        />
        <div className={css(styles.button)}>
          <p className={css(styles.plus)}>+</p>
        </div>
      </div>
    )
  }
}

let styles = StyleSheet.create({
  buttonWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 90,
    width: 90,
    borderRadius: "50%",
    color: "black",
    cursor: "pointer",
    userSelect: "none",
    lineHeight: 1.5,
    float: "left",
    marginLeft: 15,
    marginRight: 15,
    boxShadow: 'rgba(129,148,167,0.39) 0px 3px 10px 0px',
    ":hover": {
      transform: "scale(1.04)",
    }
  },
  input: {
    display: "none"
  },
  plus: {
    float: "left",
    margin: "0",
    fontSize: 40
  }
});