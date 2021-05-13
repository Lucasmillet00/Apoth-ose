// == Import npm
import React, { useEffect } from 'react';
import { Route, Switch, Redirect, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import jwt_decode from 'jwt-decode';

// == Import style
//import 'semantic-ui-css/semantic.min.css';

// == Import Locaux
import Footer from 'src/components/Footer';
import Header from 'src/components/Header';
import HomePageHeader from 'src/components/HomePageHeader';
import SearchBar from 'src/components/SearchBar';
import HomePageFonctionnalities from 'src/components/HomePageFonctionnalities';
import HomePageMap from 'src/components/HomePageMap';
import UsersReviews from 'src/components/UsersReviews';
import ProfilesResults from 'src/components/ProfilesResults';
import MapResults from 'src/containers/MapResults';
import Page404 from 'src/components/Page404';
import Page403 from 'src/components/Page403';
import TestSearchBar from 'src/containers/TestSearchBar';
import Profile from 'src/containers/Profile';
import UsersCards from 'src/containers/UsersCards';
import ModifyProfile from 'src/components/ModifyProfile';
import LegalsMentions from 'src/components/LegalsMentions';
import SiteMap from 'src/components/SiteMap';
import AboutUs from 'src/components/AboutUs';

import SignIn from 'src/containers/SignIn';
import LogIn from 'src/containers/LogIn';

// == Import Data
import DataFile from 'src/data/ProfileList';
import DataProfile from 'src/data/DataProfile';
import DataHobbies from 'src/data/DataHobbies';
import DataServices from 'src/data/DataServices';
import users from 'src/data/users';
import DataTeam from 'src/data/DataTeam';

// == Import Style
import './styles.css';

// == Composant
const App = ({ saveConnectedUserData, isConnected }) => {

  const pathName = useLocation().pathname;
  console.log(pathName);
  const userToken = localStorage.getItem('token');

  useEffect(() => {
    if (userToken != null) {
      const decodedToken = jwt_decode(userToken);
      console.log(decodedToken);
      const dateNow = Math.round(Date.now() / 1000);
      console.log(dateNow);

      if (decodedToken.exp - 600 > dateNow) {
        saveConnectedUserData(decodedToken);
        console.log('je suis déjà connecté');
      }
      else {
        console.log('Token expiré');
        localStorage.removeItem('token');
      }
    }
    else {
      console.log('je ne suis pas encore connecté');
    }
  }, []);


  return (
    <div className="app">
      <Header />
      <LogIn />
      <SignIn />
      <Switch>
        <Route path="/" exact>
          <HomePageHeader />
          <HomePageFonctionnalities />
          <HomePageMap />
          <UsersReviews users={users} />
          <LogIn />
          <Footer />
        </Route>
        <Route path="/resultats" exact>
          <SearchBar />
          <div className="app__ResultDesktop">
            <MapResults />
            <ProfilesResults data={DataFile} />
            <Footer />
          </div>
        </Route>
        <Route path="/notre-reseau" exact>
          <SearchBar />
          <UsersCards networkProfiles={DataProfile} />
        </Route>
        <Route path="/notre-reseau/utilisateur/:id" exact>
          {isConnected ? <Profile isMyProfile={false} /> : <Redirect to="/403" />}
          <Footer />
        </Route>
        <Route path="/mon-profil" exact>
          {isConnected ? <Profile isMyProfile /> : <Redirect to="/403" />}
          <Footer />
        </Route>
        <Route path="/mon-profil/modifier" exact>
          {isConnected ? <ModifyProfile dataHobbies={DataHobbies} dataServices={DataServices} /> : <Redirect to="/403" />}
          <Footer />
        </Route>
        <Route path="/search" exact>
          <TestSearchBar />
          <Footer />
        </Route>
        <Route path="/plan-du-site">
          <SiteMap />
          <Footer />
        </Route>
        <Route path="/mentions-legales">
          <LegalsMentions />
          <Footer />
        </Route>
        <Route path="/a-propos">
          <AboutUs dataTeam={DataTeam}/>
          <Footer />
        </Route>
        <Route path="/403">
          <Page403 />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>

    </div>
  );
};

App.propTypes = {
  saveConnectedUserData: PropTypes.func.isRequired,
  isConnected: PropTypes.bool.isRequired,
};

// == Export
export default App;
