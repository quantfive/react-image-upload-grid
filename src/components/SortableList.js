// NPM
import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import {StyleSheet, css} from 'aphrodite';
import arrayMove from 'array-move';

// Component
import SortableItem from './SortableItem';

const SortableList = SortableContainer(({ images, handleDrop, removeFile}) => {
  return (
    <ul className={css(styles.DropZoneGrid)} onDrop={handleDrop}>
      {images.length && images.map((image, i) => {
      let { lastModified } = image;
      let src = window.URL.createObjectURL(image);
      let many = images.length > 2 ? true : false;
      return <SortableItem 
        index={i}
        image={image}
        id={lastModified}
        key={lastModified} 
        src={src}
        handleDrop={handleDrop}
        removeFile={removeFile}
        many={many}
        />
    })}
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

export default SortableList;