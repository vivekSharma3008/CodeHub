import { createComment } from "@/Redux/Comment/Action";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar } from "@radix-ui/react-avatar";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";

const formSchema = z.object({
    content: z.string().min(2,{
        message: "Issue name must be alteast 2 characters long",
    }),
});

const CreateCommentForm = ({issueId}) => {

    const {auth} = useSelector(store=>store);
    const dispatch = useDispatch();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            content: "",
        },
    });

    const onSubmit = (data) => {
        dispatch(createComment({content:data.content,issueId}))
        console.log("Comment data", data);
    }

    return(
        <div>

            <Form {...form}>

                <form className="flex gap-2" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control} 
                        name="content"
                        render={({field}) => 
                        <FormItem>
                            <div className="flex gap-2">
                                <div className="w-9 h-9">
                                    <Avatar>
                                        <AvatarImage src={"https://avatar.iran.liara.run/username?username="+auth.user.fullName.toUpperCase()} />
                                        <AvatarFallback>{auth.user.fullName[0].toUpperCase()}</AvatarFallback>
                                    </Avatar>
                                </div>
                                <FormControl>
                                    <Input {...field}
                                    type="text"
                                    className="w-[20rem]"
                                    placeholder="Add comment" />   
                                </FormControl>
                            </div>
                            <FormMessage/>
                        </FormItem>}
                    />

                    <Button type="submit" variant="secondary" className="bg-blue-900">
                        Save
                    </Button>
                </form>

            </Form>

        </div>
    )
}

export default CreateCommentForm;