import React from 'react';
import './FileExplorer.scss';

const FileExplorer = ({ files, activeFile, onFileSelect }) => {
  const getFileIcon = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    const iconMap = {
      js: '📄 JS',
      jsx: '📄 JSX',
      ts: '📄 TS',
      tsx: '📄 TSX',
      py: '📄 PY',
      java: '📄 JAVA',
      go: '📄 GO',
      rb: '📄 RB',
      php: '📄 PHP',
      c: '📄 C',
      cpp: '📄 C++',
      h: '📄 H',
      cs: '📄 C#',
      rs: '📄 RS',
      swift: '📄 SWIFT',
      kt: '📄 KT',
      html: '📄 HTML',
      css: '📄 CSS',
      json: '📄 JSON',
      md: '📄 MD',
    };
    
    return iconMap[extension] || '📄';
  };
  
  return (
    <div className="file-explorer">
      <div className="file-explorer-header">
        <h2>Arquivos</h2>
        <button className="upload-more-btn">+</button>
      </div>
      
      <div className="file-list">
        {files.length === 0 ? (
          <div className="empty-message">Nenhum arquivo carregado</div>
        ) : (
          <ul>
            {files.map(file => (
              <li 
                key={file.id} 
                className={`file-item ${activeFile && activeFile.id === file.id ? 'active' : ''}`}
                onClick={() => onFileSelect(file)}
              >
                <span className="file-icon">{getFileIcon(file.name)}</span>
                <span className="file-name">{file.name}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FileExplorer;