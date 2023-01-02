import React, { useState, useEffect } from "react";
import "./chat.scss";

import { motion } from "framer-motion";
import { Grid, Card, TextField, InputAdornment } from "@mui/material";
import { A1, A2, A3, A4, A5, A6, A7, A8, A9 } from "../../files";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { IoSearch } from "react-icons/io5";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";

import ChatUIList from "./ChatUI";
import * as constants from 'constants.js';

const ChatUI = () => {
  const [sideBar, setSideBar] = useState(true);
  const [selected, setSelected] = useState({});
  const [search, setSearch] = useState("");
  const [selectedUser, setSelectedUser] = useState(0);

  const theme = useTheme();
  const sm = useMediaQuery(theme.breakpoints.down("lg"));

  // const initialChats = [
  //   {
  //     id: 1,
  //     name: "Ousman Seid",
  //     status: 1,
  //     profile: A1,
  //   },
  //   {
  //     id: 2,
  //     name: "Faysal Ali",
  //     status: 0,
  //     profile: A6,
  //   },
  //   {
  //     id: 3,
  //     name: "Khadar Baxar",
  //     status: 1,
  //     profile: A3,
  //   },
  //   {
  //     id: 4,
  //     name: "Samatar Osman",
  //     status: 0,
  //     profile: A5,
  //   },
  // ];
  const [initialChts, setInitialChts] = useState([])
  const [chats, setChats] = useState([]);

  useEffect(() => {
    if (sm) {
      setSideBar(false);
    } else {
      setSideBar(true);
    }
  }, [sm]);

  useEffect(() => {
    let chts = initialChts.filter((ch) =>
      ch.name.toLowerCase().startsWith(search.toLowerCase())
    );
    setChats(chts);
  }, [search]);

  const fetchUsers = async () => {
      // axios.get(`${constants.url}/chat/userslist/show`,{withCredentials: true}).then((resp)=>{
      //     //console.log(resp.data)
      // }).catch(error=>console.log(error));

      fetch(`${constants.url}/chat/userslist/show`, {credentials:'include',})
      .then((res) => res.json())
      .then((resp) => {
          let users = [];
          resp.map((val)=>{
            users.push({id: val.id, name:val.name, status: 0, profile: A1, avatar: val.image})
          });
          setInitialChts(ic => users);
          setChats(ch => users);
      });
  }
  useEffect(()=>{
    fetchUsers();
  },[]);
  return (
    <>
      {sm && (
        <motion.div
          initial={{
            width: 0,
            margin: 0,
          }}
          animate={sideBar ? { width: 350 } : { width: 0 }}
          className="sidebar position"
        >
          <Card
            className="drop-shadow-xl border-l-2 border-green-400 border-solid dark:bg-gray-700 dark:border-transparent"
            style={{
              minHeight: "100vh",
              //borderLeft: "8px solid green",
              borderRadius: 0,
            }}
          >
            {sm &&<IoIosArrowDropleftCircle
              onClick={() => {
                setSideBar(false);
              }}
              className="hover:cursor-pointer "
              style={{
                fontSize: 30,
                marginLeft: -16,
                color: "darkcyan",
                //left: sm ? 345 : '',
                float:'right'
              }}
            /> }
            <Grid container>
              <TextField
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                style={{
                  width: "100%",
                  padding: 10,
                  marginTop: 20,
                  marginBottom: 10,
                  marginTop: 0,
                  borderBottom: "1px solid rgba(0,0,0,.1)",
                }}
                size="small"
                placeholder="Search"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IoSearch className="searchIcon" />
                    </InputAdornment>
                  ),
                }}
              />
              {chats.map((chat) => {
                const label = "chat" + chat.id;
                //if (chat.id === userId) return;
                return (
                  <motion.div
                    className="hover:cursor-pointer"
                    onClick={() => {
                      setSelectedUser((su) => chat.id);
                      setSideBar((sBar)=>false);
                      setSelected({ [label]: true });
                    }}
                    style={{
                      borderRight:
                        selected[label] ?? false ? "5px solid orange" : "",
                      width: "100%",
                      marginRight: 5,
                      borderRadius: 10,
                      background:
                        selected[label] ?? false ? "rgba(0,0,0,.06)" : "",
                    }}
                  >
                    <Grid item xs={12} className="item-container border-b">
                      <Grid container spacing={0} alignItems="center">
                        <Grid item style={{ width: 50, marginRight: 10 }}>
                          <img src={chat.avatar} className="img" />
                        </Grid>
                        <Grid item style={{ width: 150 }}>
                          <p className="name">{chat.name}</p>
                          <div
                            style={{ display: "flex", alignItems: "center" }}
                          >
                            <p
                              className="dot"
                              style={{
                                backgroundColor:
                                  chat.status === 1 ? "rgba(0,255,0,.9)" : "",
                              }}
                            ></p>
                            <p className="status">
                              {chat.status === 1 ? "online" : "offline"}
                            </p>
                          </div>
                        </Grid>
                      </Grid>
                    </Grid>
                  </motion.div>
                );
              })}
            </Grid>
          </Card>
        </motion.div>
      )}
      <div style={{ display: "flex"}} className="dark:bg-gray-700 mt-5">
        {!sm && (
          <motion.div
            initial={{
              width: 0,
              margin: 0,
            }}
            animate={sideBar ? { width: 350 } : { width: 0 }}
            className="sidebar"
          >
            <Card
              className="drop-shadow-xl bg-white border-l-2 border-green-400 border-solid dark:bg-gray-700 dark:border-transparent"
              style={{
                minHeight: "100vh",
                //borderLeft: "2px solid green",
                borderRadius: 0,
              }}

            >
              <Grid container>
                <TextField
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  style={{
                    width: "100%",
                    padding: 10,
                    marginTop: 25,
                    marginBottom: 10,
                    borderBottom: "1px solid rgba(0,0,0,.1)",
                  }}
                  size="small"
                  placeholder="Search"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IoSearch className="searchIcon" />
                      </InputAdornment>
                    ),
                  }}
                />
                {chats.map((chat) => {
                  const label = "chat" + chat.id;
                  //if (chat.id === userId) return;
                  return (
                    <motion.div
                      className="hover:cursor-pointer"
                      onClick={() => {
                        setSelectedUser((su) => chat.id);
                        setSelected({ [label]: true });
                      }}
                      style={{
                        borderLeft:
                          selected[label] ?? false ? "5px solid orange" : "",
                        width: "100%",
                        marginRight: 5,
                        borderRadius: 10,
                        background:
                          selected[label] ?? false ? "rgba(0,0,0,.06)" : "",
                      }}
                    >
                      <Grid item xs={12} className="item-container border-b dark:bg-gray-800">
                        <Grid container spacing={0} alignItems="center">
                          <Grid item style={{ width: 50, marginRight: 10 }}>
                            <img src={chat.avatar} className="img" />
                          </Grid>
                          <Grid item style={{ width: 150 }}>
                            <p className="name dark:text-gray-100">{chat.name}</p>
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              <p
                                className="dot"
                                style={{
                                  backgroundColor:
                                    chat.status === 1 ? "rgba(0,255,0,.9)" : "",
                                }}
                              ></p>
                              <p className="status dark:text-gray-300">
                                {chat.status === 1 ? "online" : "offline"}
                              </p>
                            </div>
                          </Grid>
                        </Grid>
                      </Grid>
                    </motion.div>
                  );
                })}
              </Grid>
            </Card>
          </motion.div>
        )}
        <motion.div style={{ width: "100%" }}>
          {sideBar ? (
            !sm && <IoIosArrowDropleftCircle
              onClick={() => {
                setSideBar(false);
              }}
              className="hover:cursor-pointer "
              style={{
                fontSize: 30,
                marginLeft: -16,
                color: "darkcyan",
                position: "absolute",
                //left: sm ? 345 : '',
              }}
            /> 
          ) : (
            <IoIosArrowDroprightCircle
              onClick={() => {
                setSideBar(true);
              }}
              className="hover:cursor-pointer"
              style={{
                fontSize: 30,
                marginLeft: 16,
                marginTop: 10,
                color: "darkcyan",
                position: "absolute",
              }}
            />
          )}

          <div style={{ padding: 40 }}>
            <Grid container>
              <Grid item xs={12}>
                {selectedUser=== 0 ? (
                  <div className="no-user">
                    <p>Select user to chat!</p>
                  </div>
                ) : (
                  <ChatUIList to={selectedUser} />
                )}
              </Grid>
            </Grid>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default ChatUI;
