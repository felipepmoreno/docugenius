import React, { useState, useEffect, useRef } from 'react';
import Split from 'react-split';
import Header from '../components/dashboard/Header';
import FileExplorer from '../components/dashboard/FileExplorer';
import CodeEditor from '../components/dashboard/CodeEditor';
import DocumentationPanel from '../components/dashboard/DocumentationPanel';
import FileUpload from '../components/dashboard/FileUpload';
import './Dashboard.scss';

const Dashboard = () => {
  const [files, setFiles] = useState([]);
  const [activeFile, setActiveFile] = useState(null);
  const [fileContents, setFileContents] = useState({});
  const [documentation, setDocumentation] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [sizes, setSizes] = useState(['20%', '40%', '40%']);
  const [showUpload, setShowUpload] = useState(true);
  
  const handleFilesUpload = (uploadedFiles) => {
    // Convert File objects to our internal format
    const newFiles = [];
    const newFileContents = { ...fileContents };
    
    const processFile = (file, path = '') => {
      // Generate unique ID for file
      const id = `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const fullPath = path ? `${path}/${file.name}` : file.name;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        newFileContents[id] = e.target.result;
        setFileContents(prev => ({ ...prev, [id]: e.target.result }));
      };
      reader.readAsText(file);
      
      return {
        id,
        name: file.name,
        path: fullPath,
        type: 'file',
        size: file.size,
        lastModified: file.lastModified
      };
    };
    
    uploadedFiles.forEach(file => {
      newFiles.push(processFile(file));
    });
    
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    setShowUpload(false);
  };
  
  const generateDocumentation = () => {
    if (!activeFile) return;
    
    setIsProcessing(true);
    
    // Simulate AI processing delay
    setTimeout(() => {
      const content = fileContents[activeFile.id];
      const fileExtension = activeFile.name.split('.').pop().toLowerCase();
      
      // Generate documentation based on file type
      let generatedDocs = '';
      
      if (['js', 'jsx', 'ts', 'tsx'].includes(fileExtension)) {
        generatedDocs = generateJavaScriptDocs(content, activeFile.name);
      } else if (fileExtension === 'py') {
        generatedDocs = generatePythonDocs(content, activeFile.name);
      } else if (fileExtension === 'java') {
        generatedDocs = generateJavaDocs(content, activeFile.name);
      } else {
        generatedDocs = generateGenericDocs(content, fileExtension, activeFile.name);
      }
      
      setDocumentation(prev => ({ 
        ...prev, 
        [activeFile.id]: generatedDocs 
      }));
      
      setIsProcessing(false);
    }, 3000);
  };
  
  // Simple documentation generation functions (to be replaced with real AI)
  const generateJavaScriptDocs = (content, filename) => {
    return `/**
 * Arquivo: ${filename}
 * Linguagem: JavaScript
 * 
 * @description
 * Este arquivo contém código JavaScript que implementa funcionalidades relacionadas a
 * [análise de dados/interface de usuário/lógica de negócios].
 * 
 * Funções principais identificadas:
 * - ${content.includes('function') ? 'Funções declaradas usando a sintaxe function' : 'Funções de seta (arrow functions)'}
 * - ${content.includes('class') ? 'Componentes de classe' : 'Componentes funcionais'}
 * ${content.includes('useState') ? '- Utiliza hooks do React (useState)' : ''}
 * ${content.includes('useEffect') ? '- Gerencia efeitos colaterais com useEffect' : ''}
 * 
 * @exports
 * ${content.includes('export default') ? '- Exportação padrão' : '- Exportações nomeadas'}
 * 
 * @dependencies
 * ${content.includes('import') ? '- Módulos importados de bibliotecas externas' : '- Nenhuma dependência externa identificada'}
 */`;
  };
  
  const generatePythonDocs = (content, filename) => {
    return `"""
Arquivo: ${filename}
Linguagem: Python

Descrição:
-----------
Este arquivo Python implementa funcionalidades relacionadas a
[análise de dados/interface de usuário/lógica de negócios].

Componentes Principais:
-----------------------
- ${content.includes('class') ? 'Classes para modelagem de dados/comportamentos' : 'Funções e procedimentos'}
- ${content.includes('def __init__') ? 'Métodos de inicialização para objetos' : content.includes('def') ? 'Funções para processamento' : 'Procedimentos para execução sequencial'}

Dependências:
-------------
${content.includes('import') ? 'Módulos externos importados' : 'Nenhuma dependência externa identificada'}
"""`;
  };
  
  const generateJavaDocs = (content, filename) => {
    return `/**
 * Arquivo: ${filename}
 * Linguagem: Java
 * 
 * <p>
 * Este arquivo contém código Java que implementa funcionalidades relacionadas a
 * [análise de dados/interface de usuário/lógica de negócios].
 * </p>
 * 
 * <h2>Componentes Principais:</h2>
 * <ul>
 *   <li>${content.includes('class') ? 'Classes para modelagem de dados/comportamentos' : 'Métodos estáticos'}</li>
 *   <li>${content.includes('interface') ? 'Interfaces para definição de contratos' : 'Implementação concreta'}</li>
 * </ul>
 */`;
  };
  
  const generateGenericDocs = (content, extension, filename) => {
    return `/**
 * Arquivo: ${filename}
 * Linguagem: ${extension.toUpperCase()}
 * 
 * Descrição:
 * Este arquivo contém código que implementa funcionalidades relacionadas a
 * [análise de dados/interface de usuário/lógica de negócios].
 * 
 * Nota: Para uma documentação mais precisa, selecione uma linguagem específica.
 */`;
  };
  
  const handleFileSelect = (file) => {
    setActiveFile(file);
  };
  
  return (
    <div className="dashboard">
      <Header isProcessing={isProcessing} />
      
      {showUpload ? (
        <FileUpload onFilesUpload={handleFilesUpload} />
      ) : (
        <div className="dashboard-content">
          <Split
            className="split-container"
            sizes={[20, 40, 40]} 
            minSize={100}
            gutterSize={10}
            direction="horizontal"
            onDragEnd={(sizes) => console.log(sizes)}
            >
                <FileExplorer 
                    files={files} 
                    activeFile={activeFile} 
                    onFileSelect={handleFileSelect} 
                />
                <CodeEditor 
                    file={activeFile}
                    content={activeFile ? fileContents[activeFile.id] : ''}
                    onGenerateDocs={generateDocumentation}
                    isProcessing={isProcessing}
                />
                <DocumentationPanel 
                    file={activeFile}
                    documentation={activeFile ? documentation[activeFile.id] : ''}
                    isProcessing={isProcessing}
                />
            </Split>
        </div>
      )}
    </div>
  );
};

export default Dashboard;