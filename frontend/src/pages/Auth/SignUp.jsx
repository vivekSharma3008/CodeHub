import { register } from "@/Redux/Auth/Action";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

const formSchema = z.object({
    fullName: z.string().nonempty("Full name is required"),
    email: z.string().email("Invalid email address").optional(),
    password: z
        .string()
        .min(8,"Password must be atleast 8 characters long")
        .optional(),
});

const SignUp = () => {
    
    const dispatch = useDispatch();

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues:{
            email:"",
            password:"",
            fullName:"",
        },
    });

    const onSubmit = (data) => {
        dispatch(register(data));
    }

    return(
        <div className="space-y-6">
            <h1 className="text-xl font-semibold">Register</h1>

            <Form {...form}>

                <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField control={form.control} 
                        name="fullName"
                        render={({field}) => <FormItem>
                            <FormControl>
                                <Input {...field}
                                type="text"
                                className="border w-full border-gray-700 py-5 px-5"
                                placeholder="Full Name" />   
                            </FormControl>
                            <FormMessage/>
                        </FormItem>}
                    />
                    <FormField control={form.control} 
                        name="email"
                        render={({field}) => <FormItem>
                            <FormControl>
                                <Input {...field}
                                type="text"
                                className="border w-full border-gray-700 py-5 px-5"
                                placeholder="Email" />   
                            </FormControl>
                            <FormMessage/>
                        </FormItem>}
                    />
                    <FormField control={form.control} 
                        name="password"
                        render={({field}) => <FormItem>
                            <FormControl>
                                <Input {...field}
                                type="text"
                                className="border w-full border-gray-700 py-5 px-5"
                                placeholder="Password" />   
                            </FormControl>
                            <FormMessage/>
                        </FormItem>}
                    />
                   <div className="w-full flex flex-row justify-center">
                        <Button variant="secondary" type="submit" className="mt-5 w-[10rem]">Register</Button>
                    </div>
                </form>

            </Form>

        </div>
    )
}

export default SignUp;