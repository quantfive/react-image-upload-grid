// NPM
import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import { StyleSheet, css } from 'aphrodite';

// Component
import SortableItem from './SortableItem';
import DropZoneHero from './DropZoneHero';

const SortableList = SortableContainer((props) => {
  const { images, handleDrop, removeFile, blobs, imageClassName, imageContainerClassName } = props;
  return (
    <div className={css(styles.DropZoneGrid)}>
      {images.length && images.map((image, i) => {
        let { name, lastModified } = image; // uses this as a unique key and id
        let uid = name && lastModified ? name + lastModified : image.id;
        let src = blobs[uid] ? blobs[uid] : image.url; // creates src from image data 
        let many = images.length > 2 ? true : false; // determines the css (size) of dropzones
        return (
          <SortableItem 
            index={i}
            image={image}
            id={uid}
            key={uid}
            src={src}
            imageContainerClassName={imageContainerClassName}
            imageClassName={imageClassName}
            handleDrop={handleDrop}
            removeFile={removeFile}
            many={many}
          />
        )
      })}
      <DropZoneHero
        images={images}
        id={0}
        addImageClassName={props.addImageClassName}
        blobs={props.blobs}
        saveBlob={props.saveBlob}
        appendFile={props.appendFile}
        removeFile={props.removeFile} 
        onSortEnd={props.onSortEnd}
        handleDrop={props.handleDrop}
        addImageText={props.addImageText}
      />
    </div>
  )
})

let styles = StyleSheet.create({
  DropZoneGrid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
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