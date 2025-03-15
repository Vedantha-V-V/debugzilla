import React from 'react'
import { useState,useEffect } from 'react'
import Section from './Section'
import { profile,pencil } from '../assets'
import { useAuth } from '../context/authContext'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'

const ProfilePage = () => {
  const { currentUser, logOut } = useAuth()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [user, setUser] = useState({
    bio: "",
    location: "Bengaluru, India",
    github:""
  });

  useEffect(() => {
      const fetchUsername = async () => {
        if (!currentUser) {
          setUsername("");
          return;
        }
  
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists() && userSnap.data().username) {
            setUsername(userSnap.data().username);
          } else {
            // Fallback if username not found in Firestore
            setUsername(currentUser.displayName || currentUser.email.split('@')[0]);
          }
        } catch (error) {
          console.error("Error fetching username:", error);
          setUsername(currentUser.displayName || currentUser.email.split('@')[0]);
        }
      };
      fetchUsername();
    }, [currentUser]);

    useEffect(() => {
      const fetchEmail = async () => {
        if (!currentUser) {
          setEmail("");
          return;
        }
  
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);
          
          if (userSnap.exists() && userSnap.data().email) {
            setEmail(userSnap.data().email);
          } else {
            // Fallback if username not found in Firestore
            setEmail(currentUser.email);
          }
        } catch (error) {
          console.error("Error fetching email:", error);
          setEmail(currentUser.email);
        }
      };
      
      fetchEmail();
    }, [currentUser]);

  const handleEditClick = (field, value) => {
    setEditingField(field);
    setTempValue(value);
  };

  const handleChange = (e) => {
    setTempValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      setUser({ ...user, [editingField]: tempValue });
      setEditingField(null);
    }
  };

  return (
    <Section>
      <div className="flex justify-center">
      <div className="w-full max-w-lg bg-no-repeat bg-[length:100%_100%] shadow-lg p-6" style={{ backgroundImage: "url(../src/assets/benefits/card-4.svg)" }}>
        <div className="flex flex-col items-center">
          <img
            src={profile}
            alt="Profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-md"
          />
          <h1 className="text-2xl font-semibold mt-4">{username}</h1>
          <p className="text-gray-400">{email}</p>
        </div>

        <div className="mt-6 border-t border-gray-700 pt-4">
          <h2 className="text-lg font-semibold mb-2">Profile Details</h2>
          <div className="space-y-2">
          <div className="mt-2 text-center flex justify-between gap-2">
            {editingField === "bio" ? (
              <input
                type="text"
                value={tempValue}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="bg-gray-700 text-white px-2 py-1 rounded-md outline-none w-full text-center"
                autoFocus
              />
            ) : (
              <p><span className="font-semibold text-neutral-600">Bio</span> {user.bio}</p>
            )}
            <img src={pencil} width={25} height={25} className="cursor-pointer text-gray-400 hover:text-gray-200"
              onClick={() => handleEditClick("bio", user.bio)}/>
          </div>
          <div className="mt-2 text-center flex justify-between gap-2">
            {editingField === "location" ? (
              <input
                type="text"
                value={tempValue}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="bg-gray-700 text-white px-2 py-1 rounded-md outline-none w-full text-center"
                autoFocus
              />
            ) : (
              <p><span className="font-semibold text-neutral-600">Location</span> {user.location}</p>
            )}
            <img src={pencil} width={25} height={25} className="cursor-pointer text-gray-400 hover:text-gray-200"
              onClick={() => handleEditClick("location", user.location)}/>
          </div>
          <div className="mt-2 text-center flex justify-between gap-2">
            {editingField === "github" ? (
              <input
                type="text"
                value={tempValue}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                className="bg-gray-700 text-white px-2 py-1 rounded-md outline-none w-full text-center"
                autoFocus
              />
            ) : (
              <p><span className="font-semibold text-neutral-600">Github</span> {user.github}</p>
            )}
            <img src={pencil} width={25} height={25} className="cursor-pointer text-gray-400 hover:text-gray-200"
              onClick={() => handleEditClick("github", user.github)}/>
          </div>
          </div>
        </div>
      </div>
    </div>
    </Section>
  )
}

export default ProfilePage