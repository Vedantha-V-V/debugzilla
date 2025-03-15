import React, { useState } from 'react';
import Section from './Section';
import { editor } from '../constants';
import { robot, heroBackground } from '../assets';

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCode(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const handleSendCode = async () => {
    try {
      setLoading(true);
      setResponse('');
      const res = await fetch('http://localhost:8001/api/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code }),
      });

      if (!res.ok) throw new Error('Failed to send code');
      
      const data = await res.json();
      setResponse(data?.reply?.replace(/\*/g, '').replace(/\n/g, '\n\n') || 'No response received');
    } catch (error) {
      console.error('Error:', error);
      setResponse('Error! Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section>
      <div className="relative max-w-5xl mx-auto xl:mb-24 bg-cover bg-center p-6 rounded-2xl" style={{ backgroundImage: `url(${robot})` }}> 
        <div className="relative z-10 p-6 bg-n-8 bg-opacity-80 rounded-lg"> 
          {/* Input Box and Buttons */}
          <div className="p-6 flex flex-col items-center"> 
            <textarea
              className="relative w-full h-[300px] p-4 border border-gray-300 rounded-lg bg-n-5 text-lg"
              placeholder="Enter your code here"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <div className="flex mt-4"> 
              {editor.map((item) => (
                <button
                  key={item.id}
                  className="m-2 flex items-center justify-center w-14 h-14 bg-n-7 rounded-md transition-colors hover:bg-n-6"
                  onClick={() => {
                    if (item.title === 'Upload') {
                      document.getElementById("fileInput").click();
                    } else if (item.title === 'Send') {
                      handleSendCode();
                    }
                  }}
                >
                  <img src={item.iconUrl} width={32} height={32} alt={item.title} /> 
                </button>
              ))}
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              id="fileInput"
              accept=".txt,.js,.py,.java,.cpp,.html,.css"
              className="hidden"
              onChange={handleFileUpload}
            />
          </div>
        </div>
      </div>

      {/* Loading Spinner */}
      {loading && <div className="text-center p-3 font-semibold">⏳ Processing...</div>}

      {/* Response Display */}
      {response && (
        <div className="mt-6 p-6 border border-gray-300 rounded-lg bg-n-6 text-lg leading-relaxed max-w-5xl mx-auto"> 
          <h3 className="font-bold text-xl mb-2">Response:</h3>
          <pre className="whitespace-pre-wrap font-mono text-gray-100">{response}</pre>
        </div>
      )}
    </Section>
  );
};

export default CodeEditor;
