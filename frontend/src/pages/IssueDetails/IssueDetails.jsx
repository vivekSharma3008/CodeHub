import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import CreateCommentForm from "../Comments/CreateCommentForm";
import CommentCard from "../Comments/CommentCard";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { SelectValue } from "@radix-ui/react-select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssueById, updateIssueStatus } from "@/Redux/Issue/Action";
import { fetchComments } from "@/Redux/Comment/Action";

const IssueDetails = () => {
    const {projectId,issueId} = useParams();
    const dispatch = useDispatch();
    const {issue,comment} = useSelector(store=>store);

    useEffect(()=>{
        dispatch(fetchIssueById(issueId));
        dispatch(fetchComments(issueId));
    },[]);

    const handleUpdateIssueStatus = (status) => {
        dispatch(updateIssueStatus({id:issueId,status:status}));
        console.log(status);
    };

    return(
        <div className="px-20 py-8 text-gray-400">
            <div className="flex justify-between border border-slate-900 p-10 rounded-lg">

                <div className="w-[60%]">
                    <h1 className="text-2xl font-semibold text-gray-200 underline">{issue.issueDetails?.title}</h1>

                    <div className="py-5">
                    
                        <h2 className="font-semibold text-gray-400">Description</h2>
                        <p className="text-gray-400 text-sm mt-3">{issue.issueDetails?.description}</p>
                    
                    </div>


                    <div className="mt-5 w-full" >
                        {/* <h1 className="pb-3">Activity</h1> */}

                        <Tabs defaultValue="comments" className="w-full"> 
                            <TabsList className="mb-5">
                                <TabsTrigger value="all">
                                    All
                                </TabsTrigger>
                                <TabsTrigger value="comments">
                                    Comments
                                </TabsTrigger>
                                <TabsTrigger value="history">
                                    History
                                </TabsTrigger>    
                            </TabsList>

                            <ScrollArea className="h-[60vh] w-[80%]">  
                                <TabsContent value="all">
                                    Make changes to your account here.
                                </TabsContent>
                                <TabsContent value="comments">
                                    
                                    <CreateCommentForm issueId={issueId}/>
                                    <div className="mt-8 space-y-6">
                                        {comment.comments.map((item,index) => <CommentCard item={item} key={index} />)}
                                    </div>

                                </TabsContent>
                                <TabsContent value="history">
                                    Change your password here.
                                </TabsContent>
                            </ScrollArea>
                        </Tabs>    

                    </div>      

                </div>

                <div className="w-[30%] space-y-2">   

                    <Select onValueChange={handleUpdateIssueStatus}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="To Do" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in_progress">In Progress</SelectItem>
                            <SelectItem value="done">Done</SelectItem>
                        </SelectContent>
                    </Select>

                    <div className="rounded-lg bg_grad">

                        <p className="border-b py-3 px-5 text-lg font-semibold text-gray-300">Details</p>

                        <div className="p-5">
                            <div className="space-y-7">
                                <div className="flex gap-10 items-center">

                                    <p className="w-[7rem] text-md font-semibold">Assignee:</p>

                                    {issue.issueDetails?.assignee ? <div className="flex items-center gap-3">
                                        <Avatar className="h-7 w-7 text-xs">
                                            <AvatarImage src={"https://avatar.iran.liara.run/username?username="+issue.issueDetails?.assignee?.fullName.toUpperCase()} />
                                            <AvatarFallback>{issue.issueDetails?.assignee?.fullName[0].toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <p className="text-gray-300 font-semibold">{issue.issueDetails?.assignee?.fullName}</p>
                                    </div>:<div>Unassigned</div>}

                                </div>
                                <div className="flex gap-10 items-center">

                                    <p className="w-[7rem] font-semibold">Labels:</p>
                                    <p className="text-gray-300 font-semibold">None</p>

                                </div>
                                <div className="flex gap-10 items-center">

                                    <p className="w-[7rem] font-semibold">Status:</p>
                                    <Badge className={"rounded-xl font-semibold "+`${issue.issueDetails?.status == "in_progress" ? "bg-orange-300":issue.issueDetails?.status == "done" ? "bg-green-500":""}`}>
                                        {issue.issueDetails?.status}
                                    </Badge>

                                </div>
                                <div className="flex gap-10 items-center">

                                    <p className="w-[7rem] font-semibold">Release Date:</p>
                                    <p className="text-gray-300 font-semibold">-</p>

                                </div>
                                <div className="flex gap-10 items-center">

                                    <p className="w-[7rem] font-semibold">Reporter:</p>
                                    {issue.issueDetails?.assignee ? (
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-7 w-7 text-xs">
                                                <AvatarImage src={"https://avatar.iran.liara.run/username?username="+issue.issueDetails?.assignee?.fullName.toUpperCase()} />
                                                <AvatarFallback>{issue.issueDetails?.assignee?.fullName[0].toUpperCase()}</AvatarFallback>
                                            </Avatar>
                                            <p className="text-gray-300 font-semibold">{issue.issueDetails?.assignee?.fullName}</p>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3">-</div>
                                    )}

                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default IssueDetails;