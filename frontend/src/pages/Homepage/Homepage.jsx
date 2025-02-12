import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import TaskForm from "../../components/TaskForm/TaskForm";
import TaskList from "../../components/TaskList/TaskList";

const Homepage = () => {
  const { user, token, dispatch } = useContext(AuthContext);

  return (
    <div>
      {!token ? (
        <p style={{textAlign:"center", marginTop:"20px" , fontWeight:"bold"} }> Not LoggedIn</p>
      ) : (
        <div>
          <TaskForm />
          <TaskList />
        </div>
      )}{" "}
    </div>
  );
};

export default Homepage;
