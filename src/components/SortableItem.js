//NPM
import React from 'react';
import { SortableElement } from 'react-sortable-hoc';
import { StyleSheet, css } from 'aphrodite';

const SortableItem = class SortableElement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,  //saves id from events to specify changes
      showDiv: false, //when true, shows button that allows user to remove image
    }
  }

  /**
   * Deletes image
   * @param { Event } e -- the onClick event
   * @param { Integer } index -- index of the item we clicked on to remove
   * @param { String } id -- the id of the item we want to delete
   */
  handleClick = (e, index, id) => {
    e.stopPropagation();
    this.props.removeFile(index, id)
  }

  /**
   * Reveals button that allows user to delete image
   * @param { Event} e -- event triggered by MouseOver
   */
  handleMouseOver = (e) => {
    this.setState({
      hover: true,
      showDiv: true
    })
  }

  /**
   * Hides button that allows user to delete image
   * @param { Event} e -- event triggerd by MouseLeave
   */
  handleMouseLeave = (e) => {
    this.setState({
      hover: false,
      showDiv: false
    })
  }


  render() {
    let { src, id, index } = this.props;
    return (
      <div
        className={`DropZone ${css(styles.DropZone)} ${this.props.imageContainerClassName}`}
        id={`dropzone${id}`}
        onMouseEnter={this.handleMouseOver}
        onMouseLeave={this.handleMouseLeave}
        >
        <div className={css(styles.inner)}>
          <img
            draggable="false" //prevents user from dragging, else messes up 'react-sortable-hoc' 
            className={css(styles.preview)} 
            id={id}
            src={src} 
          />
          {this.state.hover
            ? (<span className={css(styles.CloseButton)} onClick={(e) => this.handleClick(e, index, id)}>
                <p className={css(styles.ButtonText)}>-</p>
              </span>)
            : null 
          }
        </div>
      </div>
    )
  }
};


let styles = StyleSheet.create({
  DropZone: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: 180,
    height: 180,
    margin: 10,
    boxSizing: 'border-box',
    lineHeight: 1.5,
    textAlign: "center",
    cursor: "pointer",
    borderRadius: 4,
    outline: 'none',
    backgroundColor: '#fff',
    border: '2px solid #ddd',
    ":hover": {
      boxShadow: 'rgba(129,148,167,0.39) 0px 3px 10px 0px',
    }
  },
  preview: {
    objectFit: "contain",
    width: "auto",
    height: "auto",
    minWidth: "100%",
    maxWidth: "100%",
    float: "left",
    overflow: "hidden"
  },
  inner: {
    position: 'relative',
    height: '100%',
    display: 'flex',
  },
  CloseButton: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100,
    top: 6,
    right: 6,
    height: 18,
    width: 18,
    borderRadius: "50%",
    color: "white",
    background: "rgba(255, 0, 0)",
    boxShadow: 'rgba(129,148,167,0.39) 0px 3px 20px 0px',
    transition: "all 0.2s ease-in-out",
    opacity: 0.8,
    ":hover": {
      opacity: 1
    }
  },
  ButtonText: {
    margin: 0,
    paddingBottom: 2
  }
});

export default SortableElement(SortableItem);