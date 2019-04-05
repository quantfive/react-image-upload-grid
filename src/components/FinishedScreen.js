//NPM
import React from 'react';
import { StyleSheet, css } from 'aphrodite';

//Component
import FinishedScreenPreview from './FinishedScreenPreview';

const FinishedScreen = ({ images }) => {
  return (
    <div className={css(styles.FinishedScreen)}>
      <h1 className={css(styles.Text)}>Successfully Submitted</h1>
      <div className={css(styles.ImageReview)}>
        {images.map((image, index) => {
          let src = window.URL.createObjectURL(image); //creates src from image object
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
    overflowX: "scroll",
    overflowY: "hidden",
    paddingBottom: 5
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
    overflowX: "scroll",
    overflowY: "hidden",
  }
})

export default FinishedScreen;