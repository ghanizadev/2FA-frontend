import React from "react";
import Background from "../../components/Background";

import { useDispatch, useSelector } from "react-redux";
import { State } from "../../redux/types/State";
import { User } from "../../redux/types/User";
import Content from "../../components/Content";
import Avatar from "../../components/Avatar";
import TextInput from "../../components/TextInput";
import ProfileForm from "../../components/ProfileForm";
import Button from "../../components/Button";
import { useRouter } from "next/router";
import { actions } from "../../redux/store";

const Profile = () => {
  const user = useSelector<State, User>((state) => state.user);
  const logged = useSelector<State, boolean>((state) => state.isLogged);

  const dispatch = useDispatch();

  const router = useRouter();

  const handleLogout = () => {
    dispatch(actions.logout())
  }

  React.useEffect(() => {
    if(!logged) router.replace("/");
  }, [logged])

  return (
    <Background>
      <Content>
        <ProfileForm>
          <Avatar src={user.avatar} />
          <h1>
            Hello <span>{user.name}</span>!
          </h1>
          <TextInput defaultValue={user.name} placeholder="Name"/>
          <TextInput defaultValue={user.email} placeholder="Email"/>
          <Button
          onClick={handleLogout}
          >LOGOUT</Button>
        </ProfileForm>
      </Content>
    </Background>
  );
};

export default Profile;
