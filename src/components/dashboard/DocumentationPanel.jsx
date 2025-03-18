import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import './DocumentationPanel.scss';

const DocumentationPanel = ({ file, documentation, isProcessing }) => {
  return (
    <div className="documentation-panel">
      <div className="documentation-header">
        <h2>Documentação</h2>
        
        {documentation && (
          <button className="btn btn-secondary">
            Exportar
          </button>
        )}
      </div>
      
      <div className="documentation-content">
        {isProcessing ? (
          <div className="processing-animation">
            <div className="spinner"></div>
            <p>Analisando código e gerando documentação...</p>
            <p className="ai-message">A IA está examinando a estrutura, padrões e dependências do código...</p>
          </div>
        ) : documentation ? (
          <SyntaxHighlighter
            language="javascript"
            style={docco}
            customStyle={{ height: '100%', margin: 0, borderRadius: 0 }}
          >
            {documentation}
          </SyntaxHighlighter>
        ) : file ? (
          <div className="empty-documentation">
            <p>Clique em "Gerar Documentação" para analisar o código.</p>
          </div>
        ) : (
          <div className="no-file-message">
            <p>Selecione um arquivo para gerar sua documentação.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentationPanel;