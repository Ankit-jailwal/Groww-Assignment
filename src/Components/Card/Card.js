import "./Card.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AiOutlineLike } from "react-icons/ai";
import { userNameChanged } from "../../Service/Utils";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Blurhash } from "react-blurhash";

function Card(props) {
  const dispatch = useDispatch();

  let data = [];
  let url = "";

  if (props.data) {
    data = props.data;
    url = `/profile/${data?.user?.username}`;
  }

  function changeUser() {
    dispatch(userNameChanged(data.user.username));
  }

  // store blur image for placeholder till the original image is loaded
  const blurImage = data?.blur_hash ? (
    <Blurhash
      className="card_image"
      hash={data?.blur_hash}
      width={"var(--cardImageWidth)"}
      height={"var(--cardImageHeight)"}
      punch={1}
    />
  ) : (
    <div />
  );

  return (
    <Link to={url}>
      <div key={data?.id} className="card flex flex_direction_column">
        <div>
          <div className="flex align_items_center">
            <img
              className="profile_small"
              src={data.user?.profile_image?.medium}
            />
            <span onClick={changeUser}>{data?.user?.username}</span>
          </div>
        </div>
        <LazyLoadImage
          className="card_image"
          placeholder={blurImage}
          src={data?.urls?.regular}
          alt={data?.alt_description}
        />
        {data && data.user && (
          <div className="flex card_description align_items_center justify_content_space_between">
            <div className="flex align_items_center">
              <AiOutlineLike className="user_icons" />
              <p>{data.likes}</p>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

export default Card;
