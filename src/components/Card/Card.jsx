import React from "react";
import PropTypes from "prop-types";
import "./Card.css";

const Card = ({ id, title, tag, user, logo }) => {
  return (
    <div className="card-container">
      <div className="card-left">
        <p className="card-id">ID: {id}</p>
        <h3 className="card-title">{title}</h3>
        <div className="card-tag-container">
          <img src={logo} alt="Tag Logo" className="card-logo" />
          <p className="card-tag">{tag}</p>
        </div>
      </div>
      <div className="card-right">
        <img src={user.profilePicture} alt={user.name} className="card-user-profile" />
        <p className="card-user-name">{user.name}</p>
      </div>
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    profilePicture: PropTypes.string.isRequired,
  }).isRequired,
  logo: PropTypes.string.isRequired,
};

Card.defaultProps = {
  id: "ID not available",
  title: "Untitled",
  tag: "No tag available",
  user: {
    name: "Unknown User",
    profilePicture: "https://via.placeholder.com/32",
  },
  logo: "https://via.placeholder.com/16",
};

export default Card;
