import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import React from "react";
import { useForm } from "react-hook-form";
import { tags } from "../ProjectList/ProjectList";
import { CaretSortIcon, Cross1Icon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "@/Redux/Project/Action";
import { zodResolver } from "@hookform/resolvers/zod";
import { array, object, string } from "zod";

const formSchema = object({
    name: string().min(1),
    description: string().min(1),
    category: string().min(1),
    tags: array(string()),
});

const CreateProjectForm = () => {
    const dispatch = useDispatch();
    const {auth,subscription} = useSelector(store=>store);

    const handleTagsChange = (newValue) => {
        const currentTags = form.getValues("tags");
        const updatedTags = currentTags.includes(newValue)?currentTags.filter(tag=>tag!==newValue):[...currentTags,newValue];

        form.setValue("tags",updatedTags);
    }

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name: "",
            description:"",
            category: "fullstack",
            tags: ["javascript","react"],
        },
    });

    const onSubmit = (data) => {
        dispatch(createProject(data));
        console.log(data);
    }

    return(

        <Form {...form}>

            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                <FormField control={form.control} 
                    name="name"
                    render={({field}) => <FormItem>
                        <FormControl>
                            <Input {...field}
                            type="text"
                            className="border w-full border-gray-700 py-5 px-5"
                            placeholder="Project Name" />   
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
                            placeholder="Project Description" />   
                        </FormControl>
                        <FormMessage/>
                    </FormItem>}
                />
                <FormField control={form.control} 
                    name="category"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Select 
                                defaultValue="fullstack"
                                value={field.value}
                                onValueChange={(value)=>{
                                    field.onChange(value)
                                }}
                                >
                                    <SelectTrigger className="w-full border border-gray-700 py-2 px-2 rounded-md text-gray-400 font-normal text-sm pl-5 flex justify-between items-center">
                                        <SelectValue placeholder="Category"/>
                                        <CaretSortIcon/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="fullstack">Full Stack</SelectItem>
                                        <SelectItem value="frontend">Frontend</SelectItem>
                                        <SelectItem value="backend">Backend</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField control={form.control} 
                    name="tags"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Select 
                                    // value={field.value}
                                    onValueChange={(value)=>{
                                        handleTagsChange(value)
                                    }}
                                    multiple
                                >
                                    <SelectTrigger className="w-full border border-gray-700 py-2 px-2 rounded-md text-gray-400 font-normal text-sm pl-5 flex justify-between items-center">
                                        <SelectValue placeholder="Tags"/>
                                        <CaretSortIcon/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {tags.map((item) => (
                                            <SelectItem key={item} value={item}>{item}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <div className="flex gap-1 flex-wrap">

                                { field.value.map((item) => 
                                    <div key={item} onClick={() => handleTagsChange(item)} className="cursor-pointer flex rounded-full items-center border gap-2 py-2 px-4">
                                        <span className="text-sm">{item}</span>
                                        <Cross1Icon className="h-3 w-3" />
                                    </div>
                                )}
                            </div>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <DialogClose className="w-full flex justify-center">
                    {(subscription.userSubscription?.planType === "FREE" &&
                        auth.projectSize >=3)
                    ? (<div><p>Upgrade your plan to create more projects.</p></div>):
                    (<Button variant="secondary" type="submit" className="w-full mt-5 max-w-36">Create Project</Button>)}
                </DialogClose>
            </form>
            
        </Form>

    )
}

export default CreateProjectForm