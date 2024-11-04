import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import React, { useEffect } from "react";
import IssueCard from "./IssueCard";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import CreateIssueForm from "./CreateIssueForm";
import { useDispatch, useSelector } from "react-redux";
import { fetchIssues } from "@/Redux/Issue/Action";
import { useParams } from "react-router-dom";

const IssueList = ({title,status}) => {

    const dispatch = useDispatch();
    const {id} = useParams();
    const {issue} = useSelector(store=>store);

    useEffect(()=>{
        dispatch(fetchIssues(id))
    },[id]);

    return(
        <div>
            <Dialog>
                <Card className="pr-10 w-full border-0">
                    <CardHeader className="flex flex-row justify-between items-center">
                        <CardTitle className="text-slate-300 text-md">Issues | {title}</CardTitle>
                        <DialogTrigger className="max-w-[150px]">
                            <Button variant="secondary" className="w-full flex items-center gap-2"><PlusIcon/> Create Issue</Button>
                        </DialogTrigger>
                    </CardHeader>
                    <CardContent className="px-2">
                        <div className="space-y-2">

                            {issue.issues.filter((issue) => issue.status==status).map((item) => <IssueCard item={item} key={item.id} />)}

                        </div>
                    </CardContent>
                    {/* <CardFooter>
                        
                    </CardFooter> */}
                </Card>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Create New Issue</DialogTitle>
                    </DialogHeader>
                    <CreateIssueForm status={status} />
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default IssueList;