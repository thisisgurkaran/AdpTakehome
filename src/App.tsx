import axios from "axios";
import React, { useState, useEffect } from "react";
import "./App.css";
import { userInfo } from "./Interfaces";
import UserInfo from "./UserInfo";

//todo - use Tailwind for design. I LOVE TAILWIND but since the project is small
//and light weight I decided to just go with vanilla css. Easy and minimal setup.

function App() {
  const [data, setData] = useState<userInfo[]>([]);
  const [search, setSearch] = useState<string>("");
  const [filteredData, setFilteredData] = useState<userInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const getUserData = async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users");
      if (res.status === 200) {
        setLoading(false);
        setData(res.data);
      } else {
        setLoading(true);
      }
    };
    getUserData();
  }, []);
  //Filtering will work on all properties of the user Object including name, address properties etc.
  useEffect(() => {
    setFilteredData(
      data.filter((user) =>
        JSON.stringify(user)
          .toLowerCase()
          .includes(search.toLowerCase())
      )
    );
  }, [search, data]);
  return (
    <div className="">
      <div className="title">ADP Users</div>
      <input
        className="input-search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        placeholder="Filter users..."
      />
      {loading && <div className="no-results">Loading....</div>}
      {!loading && filteredData.length === 0 && (
        <div className="no-results">No users found!</div>
      )}
      {!loading &&
        filteredData.map((user, i) => <UserInfo key={i} user={user} />)}
    </div>
  );
}

export default App;
