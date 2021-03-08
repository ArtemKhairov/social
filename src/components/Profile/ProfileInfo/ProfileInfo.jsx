import React, { useState } from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import ProfileDataReduxForm from "./ProfileDataForm";

const ProfileInfo = (props) => {
  let [editMode, setEditMode] = useState(false);


  const onProfilePhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0]);
    }
  };

  const onSubmit = (formData) => {
   props.saveProfile(formData).then(
        () => {
            setEditMode(false);
        }
    );
}
  
  // console.log(props)
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div>
      <div className={s.descriptionBlock}>
        {!props.profile.photos.large ? (
          <div>
            <img src="https://fanfics.me/images/fandoms_heroes/739-1494189830.jpg"  alt="Картиночка"/>
          </div>
        ) : (
          <img src={props.profile.photos.large} alt="фоточка" />
        )}
        <ProfileStatusWithHooks
          status={props.status}
          updateStatus={props.updateStatus}
        />
        {props.isOwner && (
          <input type={"file"} onChange={onProfilePhotoSelected} />
        )}
      </div>
      <div>{props.profile.aboutMe}</div>
      {!editMode ? (
        <ProfileData  goToEditMode={() => {setEditMode(true)} }  profile={props.profile} isOwner={props.isOwner} />
      ) : (
        <ProfileDataReduxForm
          initialValues={props.profile}
          profile={props.profile}
          onSubmit={onSubmit}
          onCancel={()=>setEditMode(false)}
        />
      )}
      <div />
    </div>
  );
};

const ProfileData = (props) => {
  // console.log(props);
  return (
    <div>
      {props.isOwner && <div><button onClick={props.goToEditMode}>edit</button></div>}
      <div>user id: {props.profile.userId}</div>
      <div>FullName: {props.profile.fullName}</div>
      <div>About me: {props.profile.aboutMe }</div>
      <div>
        Looking for a Job: {props.profile.lookingForAJob ? "yes" : "no"}
      </div>

      {props.profile.lookingForAJob && (
        <div>
          <b>Looking for a job description</b>:
          {props.profile.lookingForAJobDescription}
        </div>
      )}

      <div>
        Contacts:
        {Object.keys(props.profile.contacts).map((key) => {
          return (
            <Contact
              key={key}
              contactTitle={key}
              contactValue={props.profile.contacts[key]}
            />
          );
        })}
      </div>
    </div>
  );
};

const Contact = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b>{contactTitle}</b>:{contactValue}
    </div>
  );
};

export default ProfileInfo;
