import React from 'react';
import Codemirror from 'react-codemirror';
import io from 'socket.io-client';
import RTChart from './react-rt-chart';

const SOCKET_URI = 'http://localhost:5000';

const DUMMY_CODE = "\
      Builder, in building the little house,\n\
      In every way you may please yourself;\n\
      But please please me in the kitchen chimney:\n\
      Don't build me a chimney upon a shelf.\n\
      \n\
      However far you must go for bricks,\n\
      Whatever they cost a-piece or a pound,\n\
      But me enough for a full-length chimney,\n\
      And build the chimney clear from the ground.\n\
      \n\
      It's not that I'm greatly afraid of fire,\n\
      But I never heard of a house that throve\n\
      (And I know of one that didn't thrive)\n\
      Where the chimney started above the stove.\n\
      \n\
      And I dread the ominous stain of tar\n\
      That there always is on the papered walls,\n\
      And the smell of fire drowned in rain\n\
      That there always is when the chimney's false.\n\
      \n\
      A shelf's for a clock or vase or picture,\n\
      But I don't see why it should have to bear\n\
      A chimney that only would serve to remind me\n\
      Of castles I used to build in air.\n\
      \n\
      In every way you may please yourself;\n\
      But please please me in the kitchen chimney:\n\
      Don't build me a chimney upon a shelf.\n\
      \n\
      However far you must go for bricks,\n\
      Whatever they cost a-piece or a pound,\n\
      But me enough for a full-length chimney,\n\
      And build the chimney clear from the ground.\n\
      \n\
      It's not that I'm greatly afraid of fire,\n\
      But I never heard of a house that throve\n\
      (And I know of one that didn't thrive)\n\
      Where the chimney started above the stove.\n\
      \n\
      And I dread the ominous stain of tar\n\
      That there always is on the papered walls,\n\
      And the smell of fire drowned in rain\n\
      That there always is when the chimney's false.\n\
      \n\
      A shelf's for a clock or vase or picture,\n\
      But I don't see why it should have to bear\n\
      A chimney that only would serve to remind me\n\
      Of castles I used to build in air.\n\
      In every way you may please yourself;\n\
      But please please me in the kitchen chimney:\n\
      Don't build me a chimney upon a shelf.\n\
      \n\
      However far you must go for bricks,\n\
      Whatever they cost a-piece or a pound,\n\
      But me enough for a full-length chimney,\n\
      And build the chimney clear from the ground.\n\
      \n\
      It's not that I'm greatly afraid of fire,\n\
      But I never heard of a house that throve\n\
      (And I know of one that didn't thrive)\n\
      Where the chimney started above the stove.\n\
      \n\
      And I dread the ominous stain of tar\n\
      That there always is on the papered walls,\n\
      And the smell of fire drowned in rain\n\
      That there always is when the chimney's false.\n\
      \n\
      A shelf's for a clock or vase or picture,\n\
      But I don't see why it should have to bear\n\
      A chimney that only would serve to remind me\n\
      Of castles I used to build in air.\n\
      In every way you may please yourself;\n\
      But please please me in the kitchen chimney:\n\
      Don't build me a chimney upon a shelf.\n\
      \n\
      However far you must go for bricks,\n\
      Whatever they cost a-piece or a pound,\n\
      But me enough for a full-length chimney,\n\
      And build the chimney clear from the ground.\n\
      \n\
      It's not that I'm greatly afraid of fire,\n\
      But I never heard of a house that throve\n\
      (And I know of one that didn't thrive)\n\
      Where the chimney started above the stove.\n\
      \n\
      And I dread the ominous stain of tar\n\
      That there always is on the papered walls,\n\
      And the smell of fire drowned in rain\n\
      That there always is when the chimney's false.\n\
      \n\
      A shelf's for a clock or vase or picture,\n\
      But I don't see why it should have to bear\n\
      A chimney that only would serve to remind me\n\
      Of castles I used to build in air."

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: DUMMY_CODE,
      reportData: [
        {lineNo: '1',
        highlight: 'warning'},
        {lineNo: '2',
        highlight: 'bad'},
        {lineNo: '3',
        highlight: 'warning'},
        {lineNo: '4',
        highlight: 'warning'},
        {lineNo: '5',
        highlight: 'good'},
        {lineNo: '6',
        highlight: 'good'},
        {lineNo: '7',
        highlight: 'good'},
        {lineNo: '8',
        highlight: 'good'},
        {lineNo: '9',
        highlight: 'good'},
        {lineNo: '10',
        highlight: 'good'}, // TODO: replace with actual data
        {lineNo: '19',
        highlight: 'good'},
      ]
    };
  }
  updateCode(newCode) {
    this.setState({
      code: newCode
    });
  }
  highlightWord() {
    // TODO: use doc.markText(from: {line, ch}, to: {line, ch}, ?options: object) → TextMarker
    // to highlight text under eyeballs

  }
  highlightLine(_lineNumber, lineClass) {
    // Zero indexing
    const lineNumber = _lineNumber - 1;
    const cm = this.refs.codemirror.getCodeMirror();
    cm.addLineClass(lineNumber, 'background', lineClass);
  }
  unHighlightLine(_lineNumber, lineClass) {
    // Zero indexing
    const lineNumber = _lineNumber - 1;
    const cm = this.refs.codemirror.getCodeMirror();
    cm.removeLineClass(lineNumber, 'background', lineClass);
  }
  componentWillUpdate() {
    let that = this; 
    this.state.reportData.forEach(function(line, indx) {
      that.highlightLine(line.lineNo, 'line-' + line.highlight);
    });
  }
  render() {
    const options = {
      lineNumbers: true,
      viewportMargin: 0,
    };
    const chart = {
      axis: {
        y: { min: 0, max: 1}
      },
    };
    return (<div>
            <Codemirror className='viewer-report' ref="codemirror" value={this.state.code} onChange={this.updateCode.bind(this)} options={options} />
            </div>);
  }
}

export default Report;
