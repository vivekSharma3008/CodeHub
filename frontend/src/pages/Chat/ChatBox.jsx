import { fetchChatByProject, fetchChatMessage, sendMessage } from "@/Redux/Chat/Action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const ChatBox = () => {

    const [message,setMessage] = useState("");
    const dispatch = useDispatch(); 
    const {auth,chat} = useSelector(store=>store);
    const {id} = useParams();
    const chatContainerRef = useRef(null);

    useEffect(()=>{
        dispatch(fetchChatByProject(id));
    },[]);

    useEffect(()=>{
        if(chat.chat){
            dispatch(fetchChatMessage(chat.chat?.project.id));
        }
    },[chat.chat]);

    const handleSendMessage = () => {
        dispatch(
            sendMessage({
                message:{
                    senderId: auth.user?.id,
                    projectId: id,
                    content: message,
                },
                sendToServer: sendMessageToServer,
        }));
        setMessage("");
        dispatch(fetchChatByProject(id));
    };

    useEffect(() => {
        if(chatContainerRef.current){
            chatContainerRef.current.scrollIntoView({behaviour:"smooth"});
        }
    },[chat.messages]);

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    }

    const sendMessageToServer = (message) => {
        // console.log(message);
    }

    return(
        <div className="sticky">
            <div className="border rounded-lg">

                <h1 className="border-b p-5 bg_def text-lg text-gray-400 font-medium">Chat Box</h1>

                <ScrollArea className="h-[32rem] w-full p-5 flex gap-3 flex-col bg_grad">

                    {chat.messages?.map((item,index) => (
                        item.sender.id!==auth.user.id?<div ref={chatContainerRef} key={item} className="flex gap-2 mb-2 justify-start">
                            <Avatar className="w-7 h-7">
                                <AvatarImage src={"https://avatar.iran.liara.run/username?username="+item.sender?.fullName.toUpperCase()} />
                                <AvatarFallback>{item.sender?.fullName[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-2 py-2 px-5 border rounded-ss-2xl rounded-e-xl bg-blue-800">
                                <p className="text-sm font-medium">{item.sender?.fullName}</p>
                                <p className="text-gray-200 text-xs">{item.content}</p>
                            </div>
                        </div>:
                        <div ref={chatContainerRef} key={item} className="flex gap-2 mb-2 justify-end">
                            <div className="space-y-2 py-2 px-5 border rounded-se-2xl rounded-s-xl bg-blue-800">
                                <p className="text-sm font-medium">{item.sender?.fullName}</p>
                                <p className="text-gray-200 text-xs">{item.content}</p>
                            </div>
                            <Avatar className="w-7 h-7">
                                <AvatarImage src={"https://avatar.iran.liara.run/username?username="+item.sender?.fullName.toUpperCase()} />
                                <AvatarFallback>{item.sender?.fullName[0].toUpperCase()}</AvatarFallback>
                            </Avatar>
                        </div>

                    ))}

                </ScrollArea>
                <div className="relative p-0">
                    <Input value={message} onChange={handleMessageChange} placeholder="Type message..." className="py-7 border-t outline-none focus:outline-nine focus:ring-0 rounded-md border-b-0 border-x-0" />
                    <Button onClick={handleSendMessage} className="absolute right-2 top-3 rounded-full" size="icon" variant="ghost">
                        <PaperPlaneIcon/>
                    </Button>
                </div>

            </div>
        </div>
    )
}

export default ChatBox;