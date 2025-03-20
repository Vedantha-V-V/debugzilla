import React, { useState, useEffect } from 'react'
import Section from './Section'
import { profile, pencil } from '../assets'
import { useSelector, useDispatch } from 'react-redux'
import { updateProfile } from '../redux/slices/authSlice'
import SubmissionsList from './SubmissionsList'

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.auth)
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [userData, setUserData] = useState({
    bio: user?.bio || "",
    location: user?.location || "",
    github: user?.github || ""
  });

  useEffect(() => {
    setUserData({
      bio: user?.bio || "",
      location: user?.location || "",
      github: user?.github || ""
    });
  }, [user]);

  const handleEditClick = (field, value) => {
    setEditingField(field);
    setTempValue(value);
  };

  const handleChange = (e) => {
    setTempValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const updateData = { [editingField]: tempValue };
      
      setEditingField("loading");
      
      if (editingField === "github") {
        const trimmedValue = tempValue.trim();
        
        if (trimmedValue === "") {
          const updatedData = { 
            github: "",
            profilePicture: `https://avatars.githubusercontent.com/u/1503559?v=4`
          };
          
          dispatch(updateProfile(updatedData))
            .unwrap()
            .then(() => {
              setEditingField(null);
            })
            .catch((error) => {
              setEditingField(editingField);
              alert("Failed to update profile: " + error);
            });
        } else {
          let githubUsername = trimmedValue;
          
          if (githubUsername.includes('github.com/')) {
            try {
              const url = new URL(githubUsername);
              githubUsername = url.pathname.split('/').filter(Boolean)[0];
            } catch (e) {
              const matches = githubUsername.match(/github\.com\/([^\/]+)/);
              if (matches && matches[1]) {
                githubUsername = matches[1];
              }
            }
          }
          
          fetch(`https://api.github.com/users/${githubUsername}`)
            .then(response => {
              if (!response.ok) throw new Error('GitHub user not found');
              return response.json();
            })
            .then(data => {
              const updatedData = { 
                ...updateData, 
                github: trimmedValue,
                profilePicture: data.avatar_url 
              };
              
              return dispatch(updateProfile(updatedData));
            })
            .then(() => {
              setEditingField(null);
            })
            .catch((error) => {
              setEditingField(editingField);
              alert("Failed to update profile: " + error);
            });
        }
      } else {
        dispatch(updateProfile(updateData))
          .unwrap()
          .then(() => {
            setEditingField(null);
          })
          .catch((error) => {
            setEditingField(editingField);
            alert("Failed to update profile: " + error);
          });
      }
    }
  };

  return (
    <Section>
      <div className="container">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Card */}
            <div className="w-full md:w-1/3 bg-no-repeat bg-[length:100%_100%] shadow-lg p-6" style={{ backgroundImage: "url(../src/assets/benefits/card-4.svg)" }}>
              <div className="flex flex-col items-center">
                {editingField === "loading" ? (
                  <div className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md flex items-center justify-center bg-n-7">
                    <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-color-1"></div>
                  </div>
                ) : (
                  <img
                    src={user?.profilePicture || profile}
                    alt="Profile"
                    className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md object-cover"
                  />
                )}
                <h1 className="text-2xl font-semibold mt-4">{user?.name}</h1>
                <h1 className="text-l text-gray-400">@{user?.username}</h1>
                <p className="text-gray-400">{user?.email}</p>
              </div>

              <div className="mt-6 border-t border-gray-700 pt-4">
                <h2 className="text-lg font-semibold mb-2">Profile Details</h2>
                <div className="space-y-2">
                  {/* Bio field */}
                  <div className="mt-2 text-center flex justify-between gap-2">
                    {editingField === "bio" ? (
                      <input
                        type="text"
                        value={tempValue}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="bg-n-7 text-white px-2 py-1 rounded-md outline-none w-full text-center"
                        autoFocus
                      />
                    ) : (
                      <p><span className="font-semibold text-neutral-600">Bio</span> {userData.bio}</p>
                    )}
                    <img src={pencil} width={25} height={25} alt="Edit" className="cursor-pointer text-gray-400 hover:text-gray-200"
                      onClick={() => handleEditClick("bio", userData.bio)}/>
                  </div>
                  
                  {/* Location field */}
                  <div className="mt-2 text-center flex justify-between gap-2">
                    {editingField === "location" ? (
                      <input
                        type="text"
                        value={tempValue}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="bg-n-7 text-white px-2 py-1 rounded-md outline-none w-full text-center"
                        autoFocus
                      />
                    ) : (
                      <p><span className="font-semibold text-neutral-600">Location</span> {userData.location}</p>
                    )}
                    <img src={pencil} width={25} height={25} alt="Edit" className="cursor-pointer text-gray-400 hover:text-gray-200"
                      onClick={() => handleEditClick("location", userData.location)}/>
                  </div>
                  
                  {/* GitHub field */}
                  <div className="mt-2 text-center flex justify-between gap-2">
                    {editingField === "github" ? (
                      <input
                        type="text"
                        value={tempValue}
                        onChange={handleChange}
                        onKeyPress={handleKeyPress}
                        className="bg-n-7 text-white px-2 py-1 rounded-md outline-none w-full text-center"
                        autoFocus
                      />
                    ) : (
                      <p><span className="font-semibold text-neutral-600">Github</span> {userData.github}</p>
                    )}
                    <img src={pencil} width={25} height={25} alt="Edit" className="cursor-pointer text-gray-400 hover:text-gray-200"
                      onClick={() => handleEditClick("github", userData.github)}/>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Submissions List */}
            <div className="w-full md:w-2/3">
              <SubmissionsList />
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

export default ProfilePage