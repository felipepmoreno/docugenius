import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import './FileUpload.scss';

const FileUpload = ({ onFilesUpload }) => {
  const onDrop = useCallback(acceptedFiles => {
    onFilesUpload(acceptedFiles);
  }, [onFilesUpload]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'text/javascript': ['.js', '.jsx', '.ts', '.tsx'],
      'text/x-python': ['.py'],
      'text/x-java': ['.java'],
      'text/plain': ['.go', '.rb', '.php', '.c', '.cpp', '.h', '.cs', '.rs', '.swift', '.kt', '.html', '.css', '.json', '.md']
    }
  });
  
  return (
    <div className="file-upload-container">
      <div className="upload-box" {...getRootProps()}>
        <input {...getInputProps()} />
        <div className={`upload-content ${isDragActive ? 'active' : ''}`}>
          <div className="upload-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>
          <h2>{isDragActive ? 'Solte os arquivos aqui' : 'Arraste e solte arquivos aqui'}</h2>
          <p>ou clique para selecionar arquivos</p>
          <p className="supported-formats">
            Formatos suportados: .js, .jsx, .ts, .tsx, .py, .java, .go, .rb, .php, .c, .cpp, .cs, .rs, .swift, .kt, entre outros
          </p>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;