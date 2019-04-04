import React, { Component } from 'react';

//NPM
import {StyleSheet, css} from 'aphrodite';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
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
      images: []
    }
  }
  
  componentDidMount() {
    window.addEventListener('drag', this.handleDrag);
    window.addEventListener('dragstart', this.handleDragStart);
    window.addEventListener('dragend', this.handleDragEnd);
    window.addEventListener('dragover', this.handleDragOver);
    window.addEventListener('dragenter', this.handleDragEnter);
    window.addEventListener('dragleave', this.handleDragLeave);
    window.addEventListener('drop', this.handleDrop);
  }

  componentWillUnmount() {
    window.removeEventListener('drag', this.handleDrag);
    window.removeEventListener('dragstart', this.handleDragStart);
    window.removeEventListener('dragend', this.handleDragEnd);
    window.removeEventListener('dragover', this.handleDragOver);
    window.removeEventListener('dragenter', this.handleDragEnter);
    window.removeEventListener('dragleave', this.handleDragLeave);
    window.removeEventListener('drop', this.handleDrop);
  }
  
  handleDrag = () => {
    return false;
  }

  handleDrop = (e) => {
    e.preventDefault();
    let files = e.dataTransfer.files;
    this.appendFile(files);
  }

  handleDragStart = (e) => {
    // console.log("dragStart");
    // e.dataTransfer.setData("text/plain", e.target.id);
    // var img = new Image(); 
    // img.src = e.target.src; 
    // e.dataTransfer.setDragImage(img, 0, 0);

    // this.setState({dragged: Number(e.target.id)}, () => {
    //   console.log(this.state.dragged)
    // });
    // e.target.style.opacity = 0.5;
    return false;
  }

  handleDragEnd = (e) => {
    // e.target.style.opacity = 1;
    return false;
  }

  handleDragOver = (e) => {
    e.preventDefault();
    return false;
  }

  handleDragEnter = (e) => {
    // if (e.target.className === "DropZone") {
    //   e.target.style.opacity = 0.6;
    // }
    return false;
  }

  handleDragLeave = (e) => {
    // if (e.target.className === "DropZone") {
    //   ee.target.style.opacity = 1;
    // }
    return false;
  }
  

  addGrid = () => {
    this.setState({ grids:  [...this.state.grids, 1] }, () => {
      let menu = document.getElementById("menu");
      menu.scrollTop = menu.scrollHeight;
    })
  }

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


  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState(({images}) => ({
      images: arrayMove(images, oldIndex, newIndex),
    }));
  }

  submitData = (e) => {
    this.setState({ submitted: !this.state.submitted })
    // let path = 'EXAMPLE'
    // fetch(path, {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify(this.state.images),
    // })
    // .then(() => {
    //   this.setState({ submitted: true })
    // })
  }

  render() {
    let { images, submitted } = this.state;

    return (
      <div className={css(styles.Body)}>
        <h2>Drag and Drop Images</h2>
        <div className={css(styles.DropzoneContainer)} id="container">
          {submitted 
          ? <FinishedScreen images={images} />
          : (images.length > 1
            ? <SortableList images={images} axis={"xy"} pressDelay={150} onSortEnd={this.onSortEnd} removeFile={this.removeFile} handleDrop={this.handleDrop}/> 
            : <DropZoneHero images={images} id={0} appendFile={this.appendFile} removeFile={this.removeFile} /> )
          }
          <div className={css(styles.DropzoneButtons)} >
            <DropzoneButton addGrid={this.addGrid} appendFile={this.appendFile}/>
            <button className={css(styles.button)} onClick={this.submitData}>
              {submitted ? "Return" : "Finished"}
            </button>
          </div>
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
    width: "100%"
  },
  DropzoneContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    margin: "0",
    padding: "20px 0px 20px 20px",
    height: 400,
    width: 700,
    overflow: "hidden",
    boxShadow: 'rgba(129,148,167,0.39) 0px 3px 10px 0px',
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