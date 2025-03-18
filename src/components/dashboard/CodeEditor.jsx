import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import python from 'react-syntax-highlighter/dist/esm/languages/hljs/python';
import java from 'react-syntax-highlighter/dist/esm/languages/hljs/java';
import './CodeEditor.scss';

// Register languages
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('python', python);
SyntaxHighlighter.registerLanguage('java', java);

const CodeEditor = ({ file, content, onGenerateDocs, isProcessing }) => {
  const getLanguage = () => {
    if (!file) return 'javascript';
    
    const extension = file.name.split('.').pop().toLowerCase();
    const langMap = {
      js: 'javascript',
      jsx: 'javascript',
      ts: 'javascript', // Usando JS highlight para TS por simplicidade
      tsx: 'javascript',
      py: 'python',
      java: 'java',
    };
    
    return langMap[extension] || 'javascript';
  };
  
  return (
    <div className="code-editor">
      <div className="code-editor-header">
        <div className="file-info">
          {file ? (
            <h2>{file.name}</h2>
          ) : (
            <h2>Código</h2>
          )}
        </div>
        
        <button 
          className={`btn ${isProcessing ? 'btn-processing' : 'btn-primary'}`}
          onClick={onGenerateDocs}
          disabled={!file || isProcessing}
        >
          {isProcessing ? 'Analisando...' : 'Gerar Documentação'}
        </button>
      </div>
      
      <div className="code-content">
        {file ? (
          <SyntaxHighlighter 
            language={getLanguage()} 
            style={docco}
            showLineNumbers={true}
            customStyle={{ height: '100%', margin: 0, borderRadius: 0 }}
          >
            {content || ''}
          </SyntaxHighlighter>
        ) : (
          <div className="no-file-message">
            <p>Selecione um arquivo para visualizar seu conteúdo.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeEditor;