// NPM
import React from 'react';
import {StyleSheet, css} from 'aphrodite';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import arrayMove from 'array-move';

// Component
import DropZone from './FinishedScreenPreview';


const DropZoneGrid = ({ images, appendFile, removeFile, handleDragStart }) => {

  return (
    <div className={css(styles.DropZoneGrid)}>
      {images.length && images.map((image, i) => {
        let { lastModified } = image;
        let src = window.URL.createObjectURL(image);
        let many = images.length > 2 ? true : false;
        return <DropZone 
          image={image}
          id={lastModified}
          key={lastModified} 
          src={src}
          appendFile={appendFile}
          removeFile={removeFile}
          handleDragStart={handleDragStart}
          many={many}
         />
      })}
    </div>
  )
}

let styles = StyleSheet.create({
  DropZoneGrid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: "100%",
    maxWidth: 500,
    height: 400,
    background: "rbga(248,248,248,0.8)",
    overflowY: "scroll",
    ":-webkit-scrollbar": { 
      display: "none",
      width: 0
    }
  }
})

export default DropZoneGrid