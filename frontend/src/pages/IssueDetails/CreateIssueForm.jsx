import { createIssue } from "@/Redux/Issue/Action";
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
    issueName: z.string().min(2,{
        message: "Issue name must be atleast 2 characters long.",
    }),
    description: z.string().min(2,{
        message: "Description must be atleast 2 characters long.",
    }),
});

const CreateIssueForm = ({status}) => {

    const dispatch = useDispatch();
    const {id} = useParams();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            issueName: "",
            description: "",
        },
    });

    const onSubmit = (data) => {
        dispatch(createIssue({title:data.issueName,description:data.description,projectId:id,status}));
        console.log("Create Issue data",data);
    }

    return(
        <div>
             <Form {...form}>

                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control} 
                        name="issueName"
                        render={({field}) => <FormItem>
                            <FormControl>
                                <Input {...field}
                                type="text"
                                className="border w-full border-gray-700 py-5 px-5"
                                placeholder="Issue Name" />   
                            </FormControl>
                            <FormMessage/>
                        </FormItem>}
                    />
                    <FormField control={form.control} 
                        name="description"
                        render={({field}) => <FormItem>
                            <FormControl>
                                <Input {...field}
                                type="text"
                                className="border w-full border-gray-700 py-5 px-5"
                                placeholder="Describe your task" />   
                            </FormControl>
                            <FormMessage/>
                        </FormItem>}
                    />
                    <DialogClose className="w-full flex justify-center">
                        <Button variant="secondary" type="submit" className="w-full mt-5 max-w-32">Create Issue</Button>
                    </DialogClose>
                </form>

            </Form>
        </div>
    )
}

export default CreateIssueForm;