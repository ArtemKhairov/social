import React from "react";
import s from "./ProfileInfo.module.css";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";

const ProfileInfo = (props) => {

  const onProfilePhotoSelected = (e) => {
    if (e.target.files.length) {
      props.savePhoto(e.target.files[0])
    }
  }

  // console.log(props)
  if (!props.profile) {
    return <Preloader />;
  }
  return (
    <div>
      <div className={s.descriptionBlock}>
        {!props.profile.photos.large ? ( <div><img src="https://fanfics.me/images/fandoms_heroes/739-1494189830.jpg"/></div>) : (<img src={props.profile.photos.large} alt="фоточка" />
        )}
        <ProfileStatusWithHooks
          status={props.status}
          updateStatus={props.updateStatus}
        />
        {props.isOwner && <input type={"file"} onChange={onProfilePhotoSelected }/>}
      </div>
      <div>{props.profile.aboutMe}</div>
    </div>
  );
};

export default ProfileInfo;

