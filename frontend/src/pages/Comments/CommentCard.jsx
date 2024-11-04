import { deleteComment } from "@/Redux/Comment/Action";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "@radix-ui/react-icons";
import { useDispatch } from "react-redux";

const CommentCard = ({item}) => {

    const dispatch = useDispatch();

    const handleDeleteComment = () => {
        dispatch(deleteComment(item.id));
    }

    return(
        <div className="flex justify-between bg_def px-5 py-2 rounded-xl">
            
            <div className="flex items-center gap-4">
                <Avatar className="h-9 w-9">
                    <AvatarImage src={"https://avatar.iran.liara.run/username?username="+item.user.fullName.toUpperCase()} />
                    <AvatarFallback>{item.user.fullName[0].toUpperCase()}</AvatarFallback>
                </Avatar>

                <div className="space-y-1">
                    <p className="font-semibold text-gray-300">{item.user.fullName}</p>
                    <p className="text-sm">{item.content}</p>
                </div>

            </div>

            <Button onClick={handleDeleteComment} className="rounded-full" variant="ghost" size="icon">
                <TrashIcon className="h-4 w-4" />
            </Button>

        </div>
    )
}

export default CommentCard;