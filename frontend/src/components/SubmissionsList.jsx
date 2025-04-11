import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserSubmissions, deleteSubmission } from '../redux/slices/submissionSlice';

const SubmissionsList = () => {
  const dispatch = useDispatch();
  const { submissions, isLoading, isError } = useSelector((state) => state.submissions);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [submissionToDelete, setSubmissionToDelete] = useState(null);

  useEffect(() => {
    dispatch(getUserSubmissions());
  }, [dispatch]);

  const openDeleteModal = (e, submission) => {
    e.preventDefault();
    e.stopPropagation();
    setSubmissionToDelete(submission);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!submissionToDelete) return;
    
    setIsDeleting(true);
    setDeleteId(submissionToDelete._id);
    
    try {
      const result = await dispatch(deleteSubmission(submissionToDelete._id)).unwrap();
      console.log("Delete result:", result);
      
      await dispatch(getUserSubmissions());
    } catch (error) {
      console.error("Failed to delete submission:", error);
      alert(`Failed to delete submission: ${error.message || "Unknown error"}`);
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
      setShowDeleteModal(false);
      setSubmissionToDelete(null);
    }
  };

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
          {submissions
            ?.slice()
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map((submission) => (
            <div key={submission._id} className="relative">
              <Link 
                to={`/submission/${submission._id}`}
                className="block p-4 rounded-lg bg-n-7 hover:bg-n-6 transition duration-200"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium">{submission.title}</h3>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-n-9">
                      {submission.language}
                    </span>
                    <button
                      onClick={(e) => openDeleteModal(e, submission)}
                      disabled={isDeleting && deleteId === submission._id}
                      className="p-1.5 rounded bg-color-3/20 text-color-3 hover:bg-color-3/30 transition-colors"
                      title="Delete submission"
                    >
                      {isDeleting && deleteId === submission._id ? (
                        <span className="inline-block w-4 h-4 border-2 border-color-3 border-t-transparent rounded-full animate-spin"></span>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                      )}
                    </button>
                  </div>
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
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" 
               onClick={() => setShowDeleteModal(false)}>
          </div>
          
          <div className="relative bg-n-8 rounded-2xl p-6 w-full max-w-md mx-4 transform transition-all shadow-xl">
            <h3 className="text-xl font-medium mb-4">Delete Submission</h3>
            
            <p className="text-n-3 mb-6">
              Are you sure you want to delete "{submissionToDelete?.title}"? This action cannot be undone.
            </p>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded-lg bg-n-6 hover:bg-n-5 transition-colors"
              >
                Cancel
              </button>
              
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-lg bg-color-3/20 text-color-3 hover:bg-color-3/30 transition-colors flex items-center"
              >
                {isDeleting ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-color-3 border-t-transparent rounded-full animate-spin mr-2"></span>
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionsList;