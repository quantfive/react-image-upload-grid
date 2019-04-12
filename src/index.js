import React, { Component } from 'react';

//NPM
import {StyleSheet, css} from 'aphrodite';
import arrayMove from 'array-move';

//Component
import DropZoneHero from './components/DropZoneHero';
import SortableList from './components/SortableList';

export default class DragNDrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false, 
      cache: {},
      images: [],
      blobs: [],
    }
  }

  /**
   * Handles localized image drops, function passed to children
   * @param { Event } e -- event triggered from onDrop on children
   */
  handleDrop = (e) => {
    e.preventDefault(); //prevents image from loading on the page
    let files = e.dataTransfer.files;
    this.appendFile(files);
  }

  /**
   * Checks to see if image added by user already exists.
   * If image already exists, nothing will change
   * If image doesn't exists, it will add the image's uid to the cache and add the image
   * @param { Array } fileList -- array that contains image object
   */
  appendFile = (fileList) => {
    let cache = { ...this.state.cache },
        newImages = [],
        files = Object.values(fileList);

    let imagePushed = false;
    if (this.props.noCache) {
      for (var i = 0; i < files.length; i++) {
        newImages.push(files[i]);
      }
      imagePushed = true;
    } else {
      for (var i = 0; i < files.length; i++) {
        if (!cache[files[i].lastModified]) {
          cache[files[i].lastModified] = true;
          newImages.push(files[i]);
          imagePushed = true;
        } else {
          this.props.cacheCallback && this.props.cacheCallback();
        }
      }
    }

    if (imagePushed) {
      this.props.imageAddedCallback && this.props.imageAddedCallback(files)
    }

    let images = this.state.images.length ? [...this.state.images, ...newImages ] : newImages;
    this.setState({ images, cache, submitted: false })
  }

  /**
   * Saves the blob to the state so we can access it later
   * @param { Object } blob -- the blob we wish to save to state
   */
  saveBlob = (blob) => {
    let blobs = [...this.state.blobs];
    blobs.push(blob);

    this.setState({
      blobs,
    })
  }
  
  /**
   * Removes the images and removes the image's uid from the cache
   * @param { String } index -- the index of the image we want to remove
   */
  removeFile = (index, uid) => {
    let cache = { ...this.state.cache };
    let images = [ ...this.state.images ];
    let blobs = [ ...this.state.blobs ];
    cache[uid] = false;
    images.splice(index, 1);
    blobs.splice(index, 1);
    this.props.removeImageCallback && this.props.removeImageCallback(index);
    this.setState({ images, cache, blobs });
  }

  /**
   * Needed to allow react-sortable-hoc's dragndrop feature to work
   */
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({images}) => ({
      images: arrayMove(images, oldIndex, newIndex),
    }));

    this.setState(({blobs}) => ({
      blobs: arrayMove(blobs, oldIndex, newIndex),
    }));
  }

  render() {
    let { images } = this.state;

    return (
      <div className={css(styles.Body)}>
        <div className={css(styles.DropzoneContainer)}>
          {images.length > 0 &&
            <SortableList 
              images={images}
              axis={"xy"}
              blobs={this.state.blobs}
              saveBlob={this.saveBlob}
              imageClassName={this.props.imageClassName}
              imageContainerClassName={this.props.imageContainerClassName}
              appendFile={this.appendFile}
              removeFile={this.removeFile} 
              onSortEnd={this.onSortEnd}
              handleDrop={this.handleDrop}
            />
          }
          <DropZoneHero 
            images={images}
            id={0}
            addImageClassName={this.props.addImageClassName}
            blobs={this.state.blobs}
            saveBlob={this.saveBlob}
            appendFile={this.appendFile}
            removeFile={this.removeFile} 
            onSortEnd={this.onSortEnd}
            handleDrop={this.handleDrop}
        />
        </div>
      </div>
    )
  }
}

let styles = StyleSheet.create({
  Body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  DropzoneContainer: {
    display: "flex",
    flexDirection: "row",
    width: '100%',
    height: '100%',
    // justifyContent: "space-between",
    flexWrap: "wrap",
    margin: "0",
    overflow: "hidden",
    "::-webkit-scrollbar": { 
      display: "none"
    }
  },
  DropzoneButtons: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeft: "1px solid rgba(129,148,167,0.39)"
  },
  button: {
    cursor: "pointer",
    width: "80%",
    padding: "5px 0px 5px",
    color: "white",
    border: "1px solid #4285f4",
    boxShadow: 'rgba(129,148,167,0.39) 0px 3px 10px 0px',
    backgroundColor: "#4285f4", 
    userSelect: "none",
  }
});