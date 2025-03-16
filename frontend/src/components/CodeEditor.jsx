import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Section from './Section';
import { editor } from '../constants';
import { robot } from '../assets';
import { submitCode, reset } from '../redux/slices/submissionSlice';

const CodeEditor = () => {
  const [code, setCode] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { submission, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.submissions
  );

  useEffect(() => {
    if (isSuccess && submission) {
      // Redirect to the submission details page
      navigate(`/submission/${submission._id}`);
    }

    return () => {
      dispatch(reset());
    };
  }, [isSuccess, submission, navigate, dispatch]);

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

  const handleSendCode = () => {
    setIsSubmitting(true);
    dispatch(submitCode({
      title,
      description,
      language,
      code
    }));
  };

  return (
    <Section>
      <div className="relative max-w-5xl mx-auto xl:mb-24 bg-cover bg-center p-6 rounded-2xl" style={{ backgroundImage: `url(${robot})` }}> 
        <div className="relative z-10 p-6 bg-n-8 bg-opacity-80 rounded-lg"> 
          {/* Input fields */}
          <div className="mb-4">
            <input
              className="w-full p-2 mb-2 bg-n-5 rounded"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={isLoading || isSubmitting}
            />
            <input
              className="w-full p-2 mb-2 bg-n-5 rounded"
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading || isSubmitting}
            />
            <select 
              className="w-full p-2 bg-n-5 rounded"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              disabled={isLoading || isSubmitting}
            >
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          {/* Code textarea */}
          <div className="p-6 flex flex-col items-center"> 
            <textarea
              className="relative w-full h-[300px] p-4 border border-gray-300 rounded-lg bg-n-5 text-lg"
              placeholder="Enter your code here"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              disabled={isLoading || isSubmitting}
            />

            <div className="flex mt-4"> 
              <button
                className="m-2 flex items-center justify-center w-14 h-14 bg-n-7 rounded-md transition-colors hover:bg-n-6 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => {
                  document.getElementById("fileInput").click();
                }}
                disabled={isLoading || isSubmitting}
              >
                <img src={editor[1].iconUrl} width={32} height={32} alt="Upload" /> 
              </button>
              
              <button
                className="m-2 flex items-center justify-center w-14 h-14 bg-n-7 rounded-md transition-colors hover:bg-n-6 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={handleSendCode}
                disabled={isLoading || isSubmitting || !code.trim() || !title.trim()}
              >
                {isLoading || isSubmitting ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-color-1"></div>
                ) : (
                  <img src={editor[0].iconUrl} width={32} height={32} alt="Send" />
                )}
              </button>
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              id="fileInput"
              accept=".txt,.js,.py,.java,.cpp,.html,.css"
              className="hidden"
              onChange={handleFileUpload}
              disabled={isLoading || isSubmitting}
            />
          </div>
        </div>
      </div>

      {/* Loading Indicator */}
      {(isLoading || isSubmitting) && (
        <div className="text-center p-6 font-semibold">
          <div className="flex items-center justify-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-color-1"></div>
            <span className="text-lg">Submitting and analyzing your code...</span>
          </div>
          <p className="mt-2 text-n-3">This may take a few moments. You'll be redirected automatically when complete.</p>
        </div>
      )}

      {/* Error Display */}
      {isError && (
        <div className="mt-6 p-6 border border-red-500 rounded-lg bg-red-900/30 text-lg leading-relaxed max-w-5xl mx-auto">
          <h3 className="font-bold text-xl mb-2">Error:</h3>
          <pre className="whitespace-pre-wrap font-mono text-gray-100">{message}</pre>
        </div>
      )}
    </Section>
  );
};

export default CodeEditor;
