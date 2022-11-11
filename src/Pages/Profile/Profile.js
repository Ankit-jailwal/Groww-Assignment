import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./Profile.css";
import { BsFillGrid1X2Fill } from "react-icons/bs";
import { FaThList } from "react-icons/fa";
import { IconContext } from "react-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUser,
  userNameChanged,
  removeError,
  removeUser,
} from "../../Service/Utils";
import { TileLayout } from "@progress/kendo-react-layout";
import ListView from "../../Components/ListView/ListView";
import GridView from "../../Components/GridView/GridView";

function Profile() {
  const state = useSelector((state) => state.feedData);
  const dispatch = useDispatch();
  const { userName } = useParams();
  const urlHistory = useNavigate();
  const [changeView, setView] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [noUserFound, setNoUserFound] = useState(false);
  const [searchingUser, setSearchingUser] = useState(false);

  useEffect(() => {
    setNoUserFound(false);
    setSearchingUser(false);

    // handle the empty image
    if (Number(state?.userDetail?.photos?.length) === 0) setEmpty(true);
    else setEmpty(false);

    // handle no useer with given username
    if (state?.userDetail?.username !== undefined) {
      dispatch(removeError());
    } else {
      setNoUserFound(true);
    }
  }, [state]);

  // handle changing url directly
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(userNameChanged(userName));
    fetchNewUser();
  }, [urlHistory]);

  // removed global error while closing component
  useEffect(() => {
    return () => dispatch(removeError());
  }, []);

  function fetchNewUser() {
    setNoUserFound(false);
    setSearchingUser(true);
    dispatch(removeUser());
    dispatch(fetchUser());
  }

  function changeLayoutView() {
    setView(!changeView);
  }


  return (
    <div className="profile flex flex_direction_column align_items_center">
      {noUserFound && !searchingUser && (
        <div className="user_profile">
          <div className="user_detail flex flex_wrap_wrap align_items_center justify_content_space_around">
            <div className="view_zero_post no_user">
              {state?.error?.errors}!!!
            </div>
          </div>
        </div>
      )}
      {!noUserFound && !searchingUser && (
        <div className="user_profile">
          <div className="user_detail flex flex_direction_row align_items_start">
            <img
              src={state?.userDetail?.profile_image?.large}
              alt="profile pic"
              className="profile_pic"
            />
            <div className="user_data text_align_start">
              <h4>{state?.userDetail?.name}</h4>
              <div className="flex flex_wrap_wrap justify_content_start">
                <p>{state?.userDetail?.bio}</p>
                <div className="user_data flex flex_wrap_wrap justify_content_space_between align_items_start">
                  <h4>
                    <p>{state?.userDetail?.followers_count} Followers </p>
                  </h4>
                  <h4>
                    <p>{state?.userDetail?.following_count} Following </p>
                  </h4>
                  <h4>
                    <p>{state?.userDetail?.photos?.length} Photos </p>
                  </h4>
                </div>
              </div>
            </div>
          </div>
          <div className="user_photos flex justify_content_center">
            {changeView && <ListView data={state?.userDetail?.photos} />}
            {!changeView && <GridView data={state?.userDetail?.photos} />}
            {empty && <div className="view_zero_post">No Post Yet!!!</div>}
          </div>
        </div>
      )}
      <div className="fab">
        <IconContext.Provider
          value={{ size: "1.5rem", className: "global-class-name" }}
        >
        {   changeView &&
            <BsFillGrid1X2Fill className="theme_icon" onClick = {changeLayoutView}/>
        }  
        {   !changeView &&
            <FaThList className="theme_icon" onClick = {changeLayoutView}/>
        }  
        </IconContext.Provider>
      </div>
    </div>
  );
}

export default Profile;
