import React, { Component } from 'react'


export default class JournalFeed extends Component {




  handleOpenJournal = (container) => {
    console.log(container)
    const id = `'${container}'`
    console.log(id)
    const x = document.getElementById(container);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }
  
  render() {
  const { journals } = this.props
  const style = {
    border: '2px solid black',
    height: '80vh',
    width: '80vw',
    zIndex: '1',
    backgroundColor: 'blue',
    top: '100px',
    position: 'absolute',
    display: 'none',
    left: '0px',
    right: '0px',
    marginLeft: 'auto',
    marginRight: 'auto'
  }


  // const displayJournalFeed = journals.map(journal => <JournalFeed key={journal.id} date={journal.date_created} journal={journal.text}/>)
  const displayJournalFeed = journals.map(journal =>
    <li className="jFeedLi">
      <div>
        <p><span>Date: </span>{new Date(journal.date_created).toLocaleDateString()}</p>
        <div className="jFeedIntroCon">
          <p><span>Intro: </span>{journal.text.slice(0,20)}</p>
          <button className="jFeedBtn" onClick={e => this.handleOpenJournal(`jShow${journals.indexOf(journal)}`)}>View</button>
        </div>
        <div className="jHidden" id={`jShow${journals.indexOf(journal)}`} style={style}>
          <div className="jClose" onClick={e => this.handleOpenJournal(`jShow${journals.indexOf(journal)}`)}>
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