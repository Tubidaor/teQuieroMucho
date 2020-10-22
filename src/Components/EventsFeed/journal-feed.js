import React, { Component } from 'react'

export default class JournalFeed extends Component {

  handleOpenJournal = (container) => {
    const x = document.getElementById(container)
    if (x.style.display === "none") {
      x.style.display = "block"
    } else {
      x.style.display = "none"
    }
  }
  
  render() {
    const { journals } = this.props
    const style = {
      border: '2px solid black',
      height: '80vh',
      width: '80vw',
      maxWidth: "500px",
      zIndex: '1',
      top: '100px',
      position: 'absolute',
      display: 'none',
      left: '0px',
      right: '0px',
      marginLeft: 'auto',
      marginRight: 'auto',
      backgroundColor: 'rgba(0, 0, 0, .85)',
      color: 'rgba(210, 217, 220, 1)'
    }


    const displayJournalFeed = journals.map(journal =>
      <li key={journals.indexOf(journal)} className="jFeedLi">
        <div>
          <p>
            <span>
              Date: 
            </span>
            {new Date(journal.date_created).toLocaleDateString()}
          </p>
          <div className="jFeedIntroCon">
            <p><span>Intro: </span>{journal.text.slice(0,25) + "..."}</p>
            <button
              className="jFeedBtn"
              onClick={e =>
                this.handleOpenJournal(`jShow${journals.indexOf(journal)}`)
              }
            >
              View
            </button>
          </div>
          <div
            className="jHidden"
            id={`jShow${journals.indexOf(journal)}`}
            style={style}
          >
            <div
              className="jClose"
              onClick={e =>
                this.handleOpenJournal(`jShow${journals.indexOf(journal)}`)
              }
            >
              <div className="xBar1">
              </div>
              <div className="xBar2">
              </div>
            </div>
            <p>{journal.text}</p>
          </div>
        </div>
      </li>
    )
    
    return (
      <div className="jFeedCon">
        <ul className="jFeedUl">
          {displayJournalFeed}
        </ul>
      </div>
    )
  }
}