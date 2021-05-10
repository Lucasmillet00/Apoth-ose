/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';

import './profileDescription.scss';

const ProfileDescription = ({ biography }) => (

  <div className="profileDescription card">
    <div className="card__title">A propos de moi </div>
    <div className="card__text"> {biography} </div>
  </div>

);

ProfileDescription.propTypes = {
  biography: PropTypes.string.isRequired,
};

export default ProfileDescription;