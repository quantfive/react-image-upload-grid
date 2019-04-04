import React, { Component } from 'react';

//NPM
import {StyleSheet, css} from 'aphrodite';

export default class DropZone extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  // handleDrop = (e) => {
  //   e.preventDefault();
  //   let files = e.dataTransfer.files;
  //   let src = window.URL.createObjectURL(files[0]);
  //   this.displayPreview(e, src);
  //   this.props.appendFile(files);
  // }

  // displayPreview = (e, src) => {
  //   let img = document.getElementById(e.target.id);
  //   img.src = src;
  // }
  
  // handleClick = (e) => {
  //   this.props.removeFile(e.target.id)
  // }

  render() {
    let { src } = this.props;
    return (
      <div className={css(styles.PreviewCard)}>
        <img className={css(styles.preview)} src={src} />
      </div>
    )
  }
}

let styles = StyleSheet.create({
  PreviewCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: 150,
    minHeight: 170,
    overflow: "hidden",
    margin: 10,
    color: "black",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: 'rgba(0,0,0,0.39) 0px 0px 2px 0px',
    ":hover": {
      transform: "scale(1.03)",
      opacity: 0.6
    }
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
  }
});