import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getSubmissions } from '../redux/slices/submissionSlice';

const SubmissionsList = () => {
  const dispatch = useDispatch();
  const { submissions, isLoading } = useSelector((state) => state.submissions);

  useEffect(() => {
    dispatch(getSubmissions());
  }, [dispatch]);

  if (isLoading) {
    return <div className="text-center p-3">Loading submissions...</div>;
  }

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Your Submissions</h2>
      
      {submissions?.length === 0 ? (
        <p className="text-center text-n-3">You haven't submitted any code yet.</p>
      ) : (
        <div className="space-y-4">
          {submissions?.map((submission) => (
            <Link 
              key={submission._id} 
              to={`/submission/${submission._id}`}
              className="block p-4 rounded-lg bg-n-7 hover:bg-n-6 transition duration-200"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{submission.title}</h3>
                <span className="px-2 py-1 text-xs rounded-full bg-n-9">
                  {submission.language}
                </span>
              </div>
              
              <div className="mt-2 flex justify-between items-center text-sm text-n-3">
                <div>
                  {new Date(submission.timestamp).toLocaleDateString()}
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    submission.processingStatus === 'completed' 
                      ? 'bg-color-4/20 text-color-4' 
                      : submission.processingStatus === 'in review'
                      ? 'bg-color-2/20 text-color-2'
                      : 'bg-color-5/20 text-color-5'
                  }`}>
                    {submission.processingStatus}
                  </span>
                  
                  {submission.feedback?.grade && (
                    <span className="px-2 py-0.5 rounded-full bg-color-1/20 text-color-1 text-xs">
                      Grade: {submission.feedback.grade}/10
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmissionsList;