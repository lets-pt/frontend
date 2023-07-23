import React, { useCallback, useState } from 'react';

const PdfUpload = () => {
  const [pdfFile, setPdfFile] = useState(null);

  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    setPdfFile(file);
  }, []);

  const handleDragOver = useCallback((event) => {
    event.preventDefault();
  }, []);

  const handleFileChange = useCallback((event) => {
    const file = event.target.files[0];
    setPdfFile(file);
  }, []);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{
        width: '600px',
        height: '337.5px',
        border: '2px dashed gray',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {!pdfFile ? (
        <div>
          <p>PDF 파일을 드래그 앤 드롭하거나</p>
          <input type="file" accept=".pdf" onChange={handleFileChange} />
        </div>
      ) : (
        <embed src={URL.createObjectURL(pdfFile) + "#toolbar=0&scrollbar=0"} type="application/pdf" width="100%" height="100%" />
      )}
    </div>
  );
}

export default PdfUpload
