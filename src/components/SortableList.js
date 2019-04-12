// NPM
import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { StyleSheet, css } from 'aphrodite';

// Component
import SortableItem from './SortableItem';

const SortableList = SortableContainer(({ images, handleDrop, removeFile, blobs, imageClassName, imageContainerClassName }) => {
  return (
    <div className={css(styles.DropZoneGrid)}>
      {images.length && images.map((image, i) => {
        let { lastModified } = image; // uses this as a unique key and id
        let uid = image.name + image.lastModified;
        let src = blobs[uid]; // creates src from image data 
        let many = images.length > 2 ? true : false; // determines the css (size) of dropzones
        return (
          <SortableItem 
            index={i}
            image={image}
            id={uid}
            key={lastModified}
            src={src}
            imageContainerClassName={imageContainerClassName}
            imageClassName={imageClassName}
            handleDrop={handleDrop}
            removeFile={removeFile}
            many={many}
          />
        )
      })}
    </div>
  )
})

let styles = StyleSheet.create({
  DropZoneGrid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    background: "rbga(248,248,248,0.8)",
    overflowY: "scroll",
    ":-webkit-scrollbar": { 
      display: "none",
      width: 0
    }
  }
})

export default SortableList;