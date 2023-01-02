import React, {useState, useEffect, useRef} from 'react'
import { A1, A2, A3, A4, A5, A6, A7, A8, A9 } from "../../files";
import './chat.scss';
import FromChat from './FromChat';

import * as constants from 'constants.js';

const ChatUIList = ({to}) => {

  let ref = useRef(null);

  const [msg, setMsg] = useState('');

  const [selectedUser, setSelectedUser] = useState({});
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchChats = async () => {

      fetch(`${constants.url}/chat/get/${to}`, {credentials:'include',})
      .then((res) => res.json())
      .then((resp) => {
        
          let chts = [];
          resp.map((val)=>{
            chts.push({id: val.id, message:val.message, type: val.type})
          });
          setChats(ch => chts);
      });
  }

  const fetchChatUsers = () => {
      fetch(`${constants.url}/chat/userslist/fetch/${to}`,
      {
        credentials:'include',
      }).then((res)=>res.json()).then((resp)=>{
          //setUsers((_) => resp)
          console.log("result = ",resp)
      })
  }


  useEffect(()=>{
    fetchChats();
    fetchChatUsers();
  },[to]);

  useEffect(()=>{
    // users.map((user)=>{
    //    if(user.id === to) {
    //         setSelectedUser(user);
    //    }
    // });
    ref.current?.scrollIntoView({ behavior: "smooth" });
  },[to, chats]);


  const sendMessage = (e) => {
   e.preventDefault();

    fetch(`${constants.url}/chat/send`, {
      method: 'POST',
      body: JSON.stringify({to: to, message: msg}),
      credentials:'include',
      headers: {'content-type':'application/json'}
    })
      .then((res) => res.json())
      .then((resp) => {
        let chts = [];
        resp.map((val)=>{
          chts.push({id: val.id, message:val.message, type: val.type})
        });
        setChats((_)=>chts)
      });

    setMsg((_)=>"");
  }
  
  return (
    <div>
        <div className="chat-with  dark:text-gray-100">Chat with {selectedUser?.name??''}</div>
        <div style={{overflowY:'auto', minHeight: 'calc(100vh - 300px)'}}>
        {
            chats.map((chat, index)=>{
                let isFrom = (chat.to === to) ? false : true;
                let avatar = '';
                // if((chat.from != from && chat.from != to) || (chat.to != from && chat.to != to)) {
                //     return;
                // }
                console.log("is from = ", isFrom)
                users.map((user)=>{
                   
                        avatar = user.image;
                    
                   
                   
                    console.log(user)
                });
                return (
                  <>
                        {isFrom && 
                          <FromChat avatar={avatar} chats={chats} setChats={setChats} chat={chat} url={constants.url} to={to} />
                        }
                        {!isFrom && 
                          <div className='chat-div'>
                            <div className='chatTo'>
                                <div className='message'><p>{chat.message}</p></div>
                            </div>
                            <img src={avatar} className="chat-ui-avatar-to" />
                          </div>
                        }
                        
                  </>
                );
            })
        }
        <div ref={ref}></div>
        </div>
       
        <form onSubmit={sendMessage} className="msg-div">
          {/* <div className='div-top'> */}
            <input type="text" className="msg-inp" value={msg} onChange={(e)=>{setMsg(e.target.value);}}  placeholder="Send message..."/>
            <button type="submit" className="msg-btn">Send</button>
          {/* </div> */}
        </form>
      
      
    </div>
  )
}

export default ChatUIList