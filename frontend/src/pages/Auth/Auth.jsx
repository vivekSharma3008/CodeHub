import React, { useState } from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import { Button } from "@/components/ui/button";

const Auth = () => {
    const [active,setActive] = useState(true);
    return(
        <div className="flex items-center justify-center h-[100vh]">
            <div className="box h-[25rem] w-[25rem] bg_grad rounded-2xl flex justify-center items-center">
                <div className="w-full px-10 space-x-5">

                    {active ? <SignUp/>:<Login/>}

                    <div className="w-full flex justify-center flex-row items-center mt-5 gap-1">
                        <span>Already have an account?</span>
                        <Button variant="ghost" className="max-w-[20rem] text-blue-500 underline" onClick={() => setActive(!active)}>{active?"Login":"SignUp"}</Button>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default Auth;