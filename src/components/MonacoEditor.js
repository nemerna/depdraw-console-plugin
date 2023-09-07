import React from 'react';
import MonacoEditor from 'react-monaco-editor';

class CodeEditor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '// type your code here...'
    };
  }

  onChange = (newValue, e) => {
    this.setState({ code: newValue });
  }

  render() {
    const options = {
      selectOnLineNumbers: true,
      roundedSelection: false,
      readOnly: false,
      cursorStyle: 'line',
      automaticLayout: false,
    };

    return (
      <MonacoEditor
        width="800"
        height="600"
        language="yaml"
        theme="vs-dark"
        value={this.state.code}
        options={options}
        onChange={this.onChange}
      />
    );
  }
}

export default CodeEditor;
