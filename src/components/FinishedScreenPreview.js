//NPM
import React, { Component } from 'react';
import { StyleSheet, css } from 'aphrodite';

const FinishedScreenPreview = ({ src }) => {

  return (
    <div className={css(styles.PreviewCard)}>
      <img className={css(styles.preview)} src={src} />
    </div>
  )
}
  
let styles = StyleSheet.create({
  PreviewCard: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    minWidth: 150,
    minHeight: 150,
    overflow: "hidden",
    margin: 10,
    color: "black",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: 'rgba(0,0,0,0.39) 0px 0px 2px 0px',
    ":hover": {
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

export default FinishedScreenPreview;