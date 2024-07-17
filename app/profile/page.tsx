"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { TextField } from "@mui/material";
import { db, storage } from "../../firebase"; // Import storage from your firebase config
import {
  setDoc,
  doc,
  getDocs,
  query,
  where,
  collection,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import ToDoButton from "../toDoList/components/ToDoButton";

async function getUserDocId(email) {
  try {
    const usersCollection = collection(db, "users");
    const q = query(usersCollection, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    let docId = null;

    querySnapshot.forEach((doc) => {
      docId = doc.id;
    });

    return docId;
  } catch (error) {
    console.error("Error in getUserDocId: ", error);
    return null;
  }
}

function Profile() {
  const [userData, setUserData] = useState({ name: "", image: "" });
  const [isEditing, setIsEditing] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedImage, setUpdatedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    const fetchUserData = async () => {
      if (session?.user?.email) {
        const users = collection(db, "users");
        const q = query(users, where("email", "==", session.user.email));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          setUserData({ name: data.name, image: data.image });
          setPreviewImage(data.image);
        });
      }
    };

    fetchUserData();
  }, [session]);

  const handleEditClick = () => {
    setIsEditing(true);
    setUpdatedName(userData.name); // Pre-fill the text field with the current name
  };

  const handleSaveClick = async () => {
    location.reload();
    try {
      const userDocId = await getUserDocId(session.user.email);
      if (userDocId) {
        const userDoc = doc(db, "users", userDocId);

        let newImageUrl = userData.image;
        if (updatedImage) {
          const imageRef = ref(storage, `profileImages/${userDocId}`);
          await uploadBytes(imageRef, updatedImage);
          newImageUrl = await getDownloadURL(imageRef);
        }

        await setDoc(
          userDoc,
          { name: updatedName, image: newImageUrl },
          { merge: true }
        );
        setUserData({ name: updatedName, image: newImageUrl });
        setIsEditing(false);
      } else {
        console.error("User document not found");
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
    }
  };

  const handleImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setUpdatedImage(file);

      // Create a FileReader to preview the image
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreviewImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      style={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3 className="text-center">My Profile</h3>

      <div style={{ width: "100px", height: "100px" }}>
        <img
          src={previewImage}
          alt="User profile"
          style={{
            width: "100px",
            height: "100px",
            borderRadius: "50%",
            objectFit: "cover",
            cursor: isEditing ? "pointer" : "default",
          }}
          onClick={() =>
            isEditing && document.getElementById("imageUpload").click()
          }
        />
        {isEditing && (
          <input
            type="file"
            id="imageUpload"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        )}
      </div>
      <br />
      <div className="mb-3 text-center">
        <h4>Name</h4>
        {isEditing ? (
          <div>
            <TextField
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
            />
            <ToDoButton text="Save" onClickAction={handleSaveClick} />
          </div>
        ) : (
          <div>
            <p>{userData.name}</p>
            <ToDoButton text="Edit" onClickAction={handleEditClick} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
