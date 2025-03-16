import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSubmissionById } from '../redux/slices/submissionSlice';
import { executeCode, reset } from '../redux/slices/aiSlice';
import ReactMarkdown from 'react-markdown';
import Section from './Section';
import Button from './Button';

const SubmissionDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [input, setInput] = useState('');
  const [showExecute, setShowExecute] = useState(false);
  
  const { submission } = useSelector((state) => state.submissions);
  const { executionResult, isLoading } = useSelector((state) => state.ai);

  // Initial load of submission data
  useEffect(() => {
    dispatch(getSubmissionById(id));
    return () => {
      dispatch(reset());
    };
  }, [dispatch, id]);

  const handleExecuteCode = () => {
    dispatch(executeCode({ 
      language: submission.language, 
      code: submission.code,
      input: input 
    }));
  };

  if (!submission) {
    return (
      <Section>
        <div className="container">
          <p>Loading...</p>
        </div>
      </Section>
    );
  }

  return (
    <Section>
      <div className="container">
        <div className="max-w-4xl mx-auto">
          <h1 className="h2 mb-6">{submission.title}</h1>
          <p className="mb-4 text-n-3">{submission.description}</p>
          
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              <h3 className="h5">Code</h3>
              <div className="px-3 py-1 rounded-full bg-n-7 text-xs">{submission.language}</div>
            </div>
            <div className="bg-n-7 p-4 rounded-lg overflow-auto max-h-[400px]">
              <pre className="text-n-1 font-code">
                <code>{submission.code}</code>
              </pre>
            </div>
          </div>

          {/* Status indicator */}
          {submission.processingStatus !== "completed" && (
            <div className="mb-8 p-5 bg-n-6 border border-color-2 rounded-lg text-center">
              <h4 className="font-bold text-lg mb-2">Review Status</h4>
              <div className="inline-block px-6 py-3 rounded-full bg-n-8 text-xl">
                <span className="animate-pulse">{submission.processingStatus === "in review" ? "Review in progress..." : "Waiting for review..."}</span>
              </div>
              <p className="mt-4 text-n-3">Refresh this page periodically to see the results</p>
            </div>
          )}

          {submission.feedback && (
            <div className="mb-8">
              <h3 className="h5 mb-4">AI Code Review Results</h3>
              
              {/* Grade Display - Shown at the top */}
              <div className="mb-4 p-5 bg-n-6 border border-color-1 rounded-lg text-center">
                <h4 className="font-bold text-lg mb-2">Code Grade</h4>
                <div className="inline-block px-6 py-3 rounded-full bg-n-8 text-4xl text-color-1 font-bold">
                  {submission.feedback.grade}<span className="text-lg">/10</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                {/* Complexity Box */}
                <div className="p-4 bg-n-6 border border-color-2 rounded-lg">
                  <h4 className="font-bold text-color-2 mb-2">Complexity Analysis</h4>
                  <div className="mt-2 space-y-1">
                    <div className="flex items-center">
                      <span className="text-n-3 w-24">Time:</span> 
                      <span className="font-mono bg-n-7 px-2 py-1 rounded">{submission.complexity?.time || 'Not analyzed'}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-n-3 w-24">Space:</span> 
                      <span className="font-mono bg-n-7 px-2 py-1 rounded">{submission.complexity?.space || 'Not analyzed'}</span>
                    </div>
                  </div>
                </div>

                {/* Security Issues Box */}
                <div className="p-4 bg-n-6 border border-color-3 rounded-lg">
                  <h4 className="font-bold text-color-3 mb-2">Security Analysis</h4>
                  {submission.securityReview ? (
                    <div className="mt-2 bg-n-7 p-3 rounded prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown>{submission.securityReview}</ReactMarkdown>
                    </div>
                  ) : (
                    <div className="text-n-3 italic">No security issues found</div>
                  )}
                </div>
              </div>

              {/* Static Analysis Box */}
              <div className="mb-4 p-4 bg-n-6 border border-color-4 rounded-lg">
                <h4 className="font-bold text-color-4 mb-2">Static Analysis</h4>
                <div className="mt-2 bg-n-7 p-3 rounded prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>
                    {submission.feedback.staticAnalysisResults || 'No issues found'}
                  </ReactMarkdown>
                </div>
              </div>

              {/* Feedback Box - Full width at the bottom */}
              <div className="p-4 bg-n-6 border border-color-5 rounded-lg">
                <h4 className="font-bold text-color-5 mb-2">Detailed Feedback</h4>
                <div className="mt-2 bg-n-7 p-3 rounded prose prose-invert prose-sm max-w-none">
                  <ReactMarkdown>{submission.feedback.aiReview}</ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Section>
  );
};

export default SubmissionDetails;