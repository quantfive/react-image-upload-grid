// NPM
import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { StyleSheet, css } from 'aphrodite';
import arrayMove from 'array-move';

// Component
import SortableItem from './SortableItem';
import DropZoneHero from './DropZoneHero';

const SortableList = SortableContainer(({ images, handleDrop, removeFile, blobs, saveBlob, appendFile }) => {
  return (
    <ul className={css(styles.DropZoneGrid)} onDrop={handleDrop}>
      {images.length && images.map((image, i) => {
        let { lastModified } = image; // uses this as a unique key and id
        let src = blobs[i]; // creates src from image data 
        let many = images.length > 2 ? true : false; // determines the css (size) of dropzones
        return (
          <SortableItem 
            index={i}
            image={image}
            id={lastModified}
            key={lastModified} 
            src={src}
            handleDrop={handleDrop}
            removeFile={removeFile}
            many={many}
          />
        )
      })}

      <DropZoneHero 
        images={images}
        id={0}
        blobs={blobs}
        saveBlob={saveBlob}
        appendFile={appendFile}
        removeFile={removeFile} 
      />
    </ul>
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