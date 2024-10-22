import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../../firebase";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  signOut
} from "../redux/userSlice";

function Profile() {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const fileRef = useRef(null);


  const handelSignOut =async ()=>{
    try {
      console.log("hi")
      await fetch('/api/signout')
      dispatch(signOut())
    } catch (err) {
        console.log(err)
    }
  }
  const handelChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  useEffect(() => {
    if (image) {
      handelImageUpload(image);
    }
  }, [image]);

  const handelFormSubmit = async (e) => {
    console.log("hi");
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const response = await fetch(`/api/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success === true) {
        dispatch(updateUserSuccess(data.data.user));
        setUpdateSuccess(true);
      } else {
        dispatch(updateUserFailure(false));
      }
    } catch (err) {
      console.log("Error:: " + err.message);
    }
  };

  const handelImageUpload = async (image) => {
    console.log(image);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData({ ...formData, profilePicture: downloadURL });
        });
      }
    );
  };

  const handelDeleteUser = async () => {
    
    try {
      dispatch(deleteUserStart())
      const response = await fetch(`/api/delete/${currentUser._id}`,{
        method:"DELETE"
      });
      const data = await response.json();
      if(data.success === true){
        dispatch(deleteUserSuccess())
      }else{
        dispatch(deleteUserFailure(false))
      }
    } catch (err) {
      console.log("Error:: " + err.message)
    }
  };
  return (
    <div className="flex w-full flex-col items-center">
      <h1>Profile</h1>
      <form
        onSubmit={handelFormSubmit}
        className="flex
       flex-col w-[600px] "
      >
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          ref={fileRef}
          hidden
          accept="image/*"
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.profilePicture || currentUser.profilePicture}
          className="w-[150px] self-center h-[150px] rounded-full cursor-pointer"
        />
        <p className="w-full flex justify-center">
          {imageError ? (
            <span className="self-center text-sm text-red-600">
              Error uploading image (Must be less than 2Mb)
            </span>
          ) : imagePercent > 0 && imagePercent < 100 ? (
            <span className="text-center text-slate-600 text-sm">{`uploading image ${imagePercent}%`}</span>
          ) : imagePercent === 100 ? (
            <span className="text-green-600 text-sm text-center">
              Image Uploaded successfully
            </span>
          ) : (
            ""
          )}
        </p>

        <input
          defaultValue={currentUser.username}
          type="text"
          id="username"
          placeholder="username"
          onChange={handelChange}
        />
        <input
          defaultValue={currentUser.email}
          type="email"
          id="email"
          placeholder="email"
          onChange={handelChange}
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          onChange={handelChange}
        />
        <button
          disabled={loading}
          type="submit"
          className="bg-slate-600 disabled:opacity-80 p-3 rounded-lg hover:opacity-95 font-semibold text-xl text-white"
        >
          {loading ? "Loading..." : "Update"}
        </button>
        <div className="flex w-full  justify-between items-center">
          <span
            onClick={handelDeleteUser}
            className="text-xl cursor-pointer text-red-500"
          >
            Delete Account
          </span>
          <span onClick={handelSignOut} className="text-xl cursor-pointer text-red-500">sign out</span>
        </div>
      </form>
      <p>
        {error && (
          <span className="text-sm text-red-500">something went wrong</span>
        )}
      </p>
      <p>
        {updateSuccess && (
          <span className="text-sm text-green-500">
            Profile updated successfully
          </span>
        )}
      </p>
    </div>
  );
}

export default Profile;
