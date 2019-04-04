//NPM
import React from 'react';
import {StyleSheet, css} from 'aphrodite';

//Component
import FinishedScreenPreview from './FinishedScreenPreview';

const FinishedScreen = ({ images }) => {
  return (
    <div className={css(styles.FinishedScreen)}>
      <h1 className={css(styles.Text)}>Successfully Submitted</h1><br></br><br></br>
      <div className={css(styles.ImageReview)}>
        {images.map((image, index) => {
          let src = window.URL.createObjectURL(image);
          return <FinishedScreenPreview src={src} key={index} />
        })}
      </div>
    </div>
  )
}

let styles = StyleSheet.create({
  FinishedScreen: {
    height: "100%",
    width: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "center",
    overflowX: "scroll"
  },
  Text: {
    margin: "auto",
    fontWeight: 400
  },
  ImageReview: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    height: "70%",
    overflowX: "scroll"
  }
})

export default FinishedScreen;