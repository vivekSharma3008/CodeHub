import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AvatarImage } from "@radix-ui/react-avatar";
import { DotsVerticalIcon, PersonIcon } from "@radix-ui/react-icons";
import UserList from "../User/UserList";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteIssue } from "@/Redux/Issue/Action";

const IssueCard = ({item}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();

    const handleIssueDelete = () => {
        dispatch(deleteIssue(item.id));
    }

    return(

        <Card className="rounded-xl py-2 pb-5 bg_def">
            
            <CardHeader className="py-0">

                <div className="flex justify-between items-center">

                    <CardTitle className="font-medium hov_blue cursor-pointer" onClick={() => navigate(`/project/${id}/issue/${item.id}`)}>{item.title}</CardTitle>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button className="rounded-full" size="icon" variant="ghost"><DotsVerticalIcon/></Button>
                        </DropdownMenuTrigger>

                        <DropdownMenuContent>
                            <DropdownMenuItem>In Progress</DropdownMenuItem>
                            <DropdownMenuItem>Done</DropdownMenuItem>
                            <DropdownMenuItem>Edit</DropdownMenuItem>
                            <DropdownMenuItem onClick={handleIssueDelete}>Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>

            </CardHeader>
            <CardContent className="py-0 px-6">
                <div className="flex items-center justify-between">

                    <p className="text-sm text-slate-300">{item.description}</p>
                    <DropdownMenu className="w-[30rem] border border-red-400">
                        <DropdownMenuTrigger>
                            <Button className="bg-gray-900 hover:text-black text-white rounded-full" size="icon">
                                <Avatar className="w-7 h-7">
                                    {/* <AvatarImage src="https://avatar.iran.liara.run/username?username=Vishesh+Garg" /> */}
                                    <AvatarFallback><PersonIcon/></AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <UserList issueDetails={item} />
                        </DropdownMenuContent>
                    </DropdownMenu>

                </div>
            </CardContent>

        </Card>

    )
}

export default IssueCard;