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
      blobs: {},
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
        let file = files[i];
        let uid = file.name + file.lastModified;
        if (!cache[uid]) {
          cache[uid] = true;
          newImages.push(file);
          imagePushed = true;
        } else {
          this.props.cacheCallback && this.props.cacheCallback();
        }
      }
    }

    if (imagePushed) {
      this.props.imageAddedCallback && this.props.imageAddedCallback(files)
    }

    this.setState({ cache })
  }

  /**
   * Saves the blob to the state so we can access it later
   * @param { Object } uid -- the UID of the blob we want to save
   * @param { Object } blob -- the blob we wish to save to state
   */
  saveBlob = ({uid, blob}) => {
    let blobs = {...this.state.blobs};
    blobs[uid] = blob;
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
    cache[uid] = false;
    this.props.removeImageCallback && this.props.removeImageCallback(index);
    this.setState({ cache });
  }

  /**
   * Needed to allow react-sortable-hoc's dragndrop feature to work
   */
  onSortEnd = ({oldIndex, newIndex}) => {
    this.props.onSortEnd({oldIndex, newIndex})
  }

  render() {
    let { images } = this.props;

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