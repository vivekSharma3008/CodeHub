import { inviteToProject } from "@/Redux/Project/Action";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
    email: z.string().email("Invalid email address"),
});

const InviteUserForm = ({projectId})=> {
    const dispatch = useDispatch();
    // const {id} = useParams();
    
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    });

    const onSubmit = (data) => {
        data.projectId = projectId;
        dispatch(inviteToProject(data));
    };
    
    return (
        <div>
             <Form {...form}>

                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control} 
                        name="email"
                        render={({field}) => <FormItem>
                            <FormControl>
                                <Input {...field}
                                type="text"
                                className="border w-full border-gray-700 py-5 px-5"
                                placeholder="User Email" />   
                            </FormControl>
                            <FormMessage/>
                        </FormItem>}
                    />
                    <DialogClose className="w-full flex justify-center">
                        <Button variant="secondary" type="submit" className="w-full mt-5 max-w-32">Invite User</Button>
                    </DialogClose>
                </form>

                </Form>
        </div>
    )
}

export default InviteUserForm;