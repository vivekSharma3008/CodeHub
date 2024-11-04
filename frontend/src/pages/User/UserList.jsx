import { assignedUserToIssue } from "@/Redux/Issue/Action";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { AvatarFallback } from "@radix-ui/react-avatar";
import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const UserList = ({issueDetails}) => {
    const {id} = useParams();
    const {project,auth,issue} = useSelector(store=>store);
    const dispatch = useDispatch();

    const handleAssignIssueToUser = (userId) => {
        dispatch(assignedUserToIssue({issueId:issueDetails.id,userId}));
    };

    return(

        <Fragment>

            {!issue.loading?
            
            <div className="space-y-2">
            
                <div className="border rounded-md">

                    <p className="py-2 px-3">{ issueDetails.assignee?.fullName || "Unassigned"}</p>

                </div>
                {project.projectDetails?.team.map((item) => <div onClick={() => handleAssignIssueToUser(item.id)} key={item} className="py-2 group hover:bg-slate-800 cursor-pointer flex items-center space-x-4 rounded-md border px-4">
                    <Avatar className="cursor-pointer w-7 h-7">
                        <AvatarImage src={"https://avatar.iran.liara.run/username?username="+item.fullName.toUpperCase()} />
                        <AvatarFallback>{item.fullName[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <p className="text-sm font-medium leading-none">{item.fullName}</p>
                        <p className="text-sm font-medium text-muted-foreground">@{item.fullName?.toLowerCase().split(" ").join("_")}</p>
                    </div>
                </div>)}

            </div>:<div>

                <div className="p-1">
                    <Skeleton className="border rounded-md h-[2rem]"></Skeleton>

                    {project.projectDetails?.team.map((item) => (
                        <Skeleton key={item} className="w-full h-[2rem]">
                            <Skeleton className=""></Skeleton>
                            <Skeleton className="space-y-1">
                                <Skeleton className="text-sm font-medium leading-none"></Skeleton>
                                <Skeleton className="text-xs text-muted-foreground">

                                </Skeleton>
                            </Skeleton>
                        </Skeleton>
                    ))}
                </div>
            </div>
                    
            }

        </Fragment>

    );
};

export default UserList;