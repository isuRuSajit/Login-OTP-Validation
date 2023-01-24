import React, { useState } from "react";
import avatar from "../assets/profile.png";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { profileValidation } from "../helper/validate";
import convertToBase64 from "../helper/convert";

import styles from "../style/Username.module.css";
import extend from "../style/Profile.module.css";
function Profile() {
  const [file, setFile] = useState("");

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      address: "",
    },
    validate: profileValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      values = await Object.assign(values, { profile: file || "" });
      console.log(values);
    },
  });

  /** formik doensn't support file upload so we need to create this handler */
  const onUpload = async (e) => {
    const base64 = await convertToBase64(e.target.files[0]);
    setFile(base64);
  };

  return (
    <div className="container mx-auto py-5">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center ">
        <div
          className={`${styles.glass} ${extend.glass}`}
          style={{ width: "45%", paddingTop: "3em" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to join you!
            </span>
          </div>
          <form className="py-1" onSubmit={formik.handleSubmit}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img
                  src={file || avatar}
                  className={`${styles.profile_img} ${extend.profile_img}`}
                  alt="avatar"
                />
              </label>

              <input
                className={`${styles.textbox} ${extend.textbox}`}
                onChange={onUpload}
                type="file"
                id="profile"
                name="profile"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <div className="name flex w-3/4 gap-10">
                <input
                  className={`${styles.textbox} ${extend.textbox}`}
                  {...formik.getFieldProps("firstName")}
                  type="text"
                  placeholder="FirstName"
                />
                <input
                  className={`${styles.textbox} ${extend.textbox}`}
                  {...formik.getFieldProps("lastName")}
                  type="text"
                  placeholder="LastName"
                />
              </div>

              <div className="name flex w-3/4 gap-10">
                <input
                  className={`${styles.textbox} ${extend.textbox}`}
                  {...formik.getFieldProps("mobile")}
                  type="text"
                  placeholder="Mobile No."
                />
                <input
                  className={`${styles.textbox} ${extend.textbox}`}
                  {...formik.getFieldProps("email")}
                  type="text"
                  placeholder="Email*"
                />
              </div>

              <input
                className={`${styles.textbox} ${extend.textbox}`}
                {...formik.getFieldProps("address")}
                type="text"
                placeholder="Address"
              />
              <button className={styles.btn} type="submit">
                Update
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                come back later?{" "}
                <button className="text-red-500" to="/">
                  Logout
                </button>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
