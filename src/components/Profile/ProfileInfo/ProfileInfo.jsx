import React from 'react';
import s from './ProfileInfo.module.css';
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from './ProfileStatus';

const ProfileInfo = (props) => {
    // console.log(props)
    if (!props.profile) {
        return <Preloader />
    }
    return (
        <div>
            {/* <div>
                <img
                    src='https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg?auto=compress&cs=tinysrgb&h=350'/>
            </div> */}
            <div className={s.descriptionBlock}>
                {!props.profile.photos.large ? <h3>Картинки нет но вы держитесь</h3> : <img src={props.profile.photos.large} />}
                <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
            </div>
            <div>{ props.profile.aboutMe}</div>
        </div>
    )
}

export default ProfileInfo;