import "./rightBar.scss";



const RightBar = () => {
  const currentUser="Krishna";

  return (
    <div className="rightBar">
      <div className="container">
        <div className="item">
          <span>Suggestions For You</span>
          <div className="user">
            <div className="userInfo">
              
              <span>Jane Doe</span>
            </div>
            <div className="buttons">
              <button>follow</button>
              <button>dismiss</button>
            </div>
          </div>
        <div className="item">
          <span>Online Friends</span>
          <div className="user">
            <div className="userInfo">

              <div className="online" />
              <span>Jane Doe</span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
