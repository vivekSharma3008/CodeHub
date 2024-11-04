import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { PlusIcon } from "@radix-ui/react-icons";
import React, { useEffect } from "react";
import InviteUserForm from "./InviteUserForm";
import IssueList from "../IssueDetails/IssueList";
import ChatBox from "../Chat/ChatBox";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useDispatch, useSelector } from "react-redux";
import { fetchProjectById, inviteToProject } from "@/Redux/Project/Action";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";

const ProjectDetails = () => {

    const dispatch = useDispatch();
    const {project,auth} = useSelector(store=>store);
    const {id} = useParams();
    // const handleProjectInvitation = () => {
    //     dispatch(inviteToProject({email:"",projectId:id}));
    // };

    useEffect(() => {
        dispatch(fetchProjectById(id))
    },[id])

    return(

        <>

        {!project.loading ? (

            <div className="m-5 lg:p-10">
            <div className="lg:flex gap-5 justify-between pb-5">
                <ScrollArea className="h-screen lg:w-[65%] pr-2">
                    <div className="text-gray-400 pb-10 w-full">
                        
                        <h1 className="text-slate-300 text-2xl font-semibold pb-5 pl-5">{project.projectDetails?.name}</h1>
                        <div className="space-y-5 pb-10 bg_grad pt-5 pl-5 rounded-2xl">
                         
                            <p className="w-full md:max-w-2xl lg:max-w-3xl">{project.projectDetails?.description}</p>
                            
                            <div className="flex">

                                <p className="w-40 text-sky-600">Project Lead :</p>
                                <p className="">{project.projectDetails?.owner?.fullName}</p>

                            </div>

                            <div className="flex">

                                <p className="w-40 text-sky-600">Team Members :</p>
                                <div className="flex items-center gap-2">
                                    {project.projectDetails?.team.map((item) => <Avatar key={item} className="cursor-pointer w-7 h-7">
                                        <AvatarImage src={"https://avatar.iran.liara.run/username?username="+item.fullName.toUpperCase()} />
                                        <AvatarFallback>{item.fullName[0].toUpperCase()}</AvatarFallback>
                                    </Avatar>)}
                                </div>
                                
                                {auth.user?.id===project.projectDetails?.owner.id && <Dialog>
                                    <DialogTrigger>
                                        <DialogClose>
                                            <Button size="sm" variant="outline" className="ml-2">
                                                <span>Invite</span>
                                                <PlusIcon className="w-3 h-3 ml-1"/>
                                            </Button>
                                        </DialogClose>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>Invite User</DialogHeader>
                                        <InviteUserForm projectId={id} />
                                    </DialogContent>
                                </Dialog>}

                            </div>
                            
                            <div className="flex">

                                <p className="w-40 text-sky-600">Category :</p>
                                <p className="">{project.projectDetails?.category}</p>

                            </div>

                            <div className="flex">

                                <p className="w-40 text-sky-600">Status :</p>
                                <Badge className="rounded-xl bg-green-500 font-semibold">In Progress</Badge>

                            </div>


                        </div>

                        <section className="mt-10">
                            {/* <p className="py-5 text-xl -tracking-wider font-semibold text-slate-400">Tasks</p>
                            <div className="lg:flex md:flex gap-3 justify-between py-5">

                                <IssueList status="pending" title="Todo List" />
                                <IssueList status="in_progress" title="In Progress" />
                                <IssueList status="done" title="Done" />

                            </div> */}
                            <div className="mt-5 max-w-[800px]">

                                <Tabs defaultValue="pending" className="w-[100%]">
                                    <TabsList className="grid w-full grid-cols-3">
                                        <TabsTrigger value="pending">Pending</TabsTrigger>
                                        <TabsTrigger value="in_progress">In Progress</TabsTrigger>
                                        <TabsTrigger value="done">Done</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="pending">
                                        <IssueList status="pending" title="Todo List" />
                                    </TabsContent>
                                    <TabsContent value="in_progress">
                                        <IssueList status="in_progress" title="In Progress" />
                                    </TabsContent>
                                    <TabsContent value="done">
                                        <IssueList status="done" title="Done" />
                                    </TabsContent>
                                </Tabs>

                            </div>
                        </section>
                    
                    </div>
                </ScrollArea>

                <div className="lg:w-[30%] rounded-md sticky right-5 top-10">
                    <ChatBox/>
                </div>
            </div>
        </div>

        ) : (
            <div><Loader/></div>
        )}

        </>
        
    );
};

export default ProjectDetails