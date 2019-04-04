import React, { Component } from 'react';

//NPM
import {StyleSheet, css} from 'aphrodite';
import arrayMove from 'array-move';

//Component
import DropzoneButton from './components/DropZoneButton';
import DropZoneHero from './components/DropZoneHero';
import SortableList from './components/SortableList';
import FinishedScreen from './components/FinishedScreen';

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

    for (var i = 0; i < files.length; i++) {
      if (!cache[files[i].lastModified]) {
        cache[files[i].lastModified] = true;
        newImages.push(files[i])
      }
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
   * @param { String } uid-- unique identifier of image
   */
  removeFile = (uid) => {
    let cache = [ ...this.state.cache ];
    let images = [ ...this.state.images ];
    let removed = images.filter(file => {
      return file.lastModified === Number(uid)
    }) 
    cache[Number(uid)] = false;
    images.splice(images.indexOf(removed[0]), 1);
    this.setState({ images, cache })
  }

  /**
   * Needed to allow react-sortable-hoc's dragndrop feature to work
   */
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({images}) => ({
      images: arrayMove(images, oldIndex, newIndex),
    }));
  }

  /**
   * Submits Data through a post request and changes the app's submitted state
   * @param { Event } e -- event triggered by onClick
   */
  submitData = async (e) => {
    this.setState({ submitted: !this.state.submitted });

    await this.props.submitData && this.props.submitData();

    this.setState({
      submitted: true,
    });
  }

  render() {
    let { images, submitted } = this.state;

    return (
      <div className={css(styles.Body)}>
        <div className={css(styles.DropzoneContainer)} id="container">
          {/* {submitted 
          ? <FinishedScreen images={images} />
          : 
          } */}

          <SortableList 
            images={images}
            axis={"xy"}
            pressDelay={150}
            blobs={this.state.blobs}
            useDragHandle
            saveBlob={this.saveBlob}
            appendFile={this.appendFile}
            removeFile={this.removeFile} 
            onSortEnd={this.onSortEnd}
            handleDrop={this.handleDrop}
          />
          {/* <div className={css(styles.DropzoneButtons)} >
            <DropzoneButton appendFile={this.appendFile}/>
            <button className={css(styles.button)} onClick={this.submitData}>
              {submitted ? "Return" : "Finished"}
            </button>
          </div> */}
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
    justifyContent: "space-between",
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
    ":hover" : {
      transform: "scale(1.03)"
    }
  }
});