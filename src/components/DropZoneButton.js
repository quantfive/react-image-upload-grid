import React from 'react';

import {StyleSheet, css} from 'aphrodite';

export default class DropZoneButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      switch: true
    }
  }

  handleDrop = (e) => {
    let files = e.dataTransfer.files;
    this.props.appendFile(files);
  }

  promptImageUpload = (e) => {
    let input = document.getElementById('input');
    input.click();
  }

  handleInputChange = (e) => {
    let fileList = e.target.files;
    this.props.appendFile(fileList);
  }

  render() {
    return (
      <div 
        className={css(styles.buttonWrapper)} 
        onClick={this.promptImageUpload} 
        onDrop={this.handleDrop}
        >
        <input className={css(styles.input)} id="input" type="file" multiple accept="image/*" onChange={this.handleInputChange}/>
          <div className={css(styles.button)}>
            <p className={css(styles.plus)}>{this.state.switch ? "+" : "-"}</p>
          </div>
      </div>
    )
  }
}

let styles = StyleSheet.create({
  buttonWrapper: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 90,
    width: 90,
    borderRadius: "50%",
    color: "black",
    cursor: "pointer",
    userSelect: "none",
    lineHeight: 1.5,
    float: "left",
    marginLeft: 15,
    marginRight: 15,
    boxShadow: 'rgba(129,148,167,0.39) 0px 3px 10px 0px',
    ":hover": {
      transform: "scale(1.04)",
    }
  },
  input: {
    display: "none"
  },
  plus: {
    float: "left",
    margin: "0",
    fontSize: 40
  }
});