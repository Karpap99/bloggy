'use client';

import { useAppDispatch } from "@/lib/hooks";
import { userSliceActions } from "@/lib/slices/user";
import { LogInUser, addUser } from "@/src/services/user/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const AuthForm = () => {
     const [AuthType, setAuthType] = useState<"login" | "register">("login");
    const dispatch = useAppDispatch();

    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const repeatPassword = formData.get("repeatPassword") as string;  

        if (AuthType === "login") {
            LogInUser({ email, password }).then((user) => {
                if (!user) {
                    alert("User not found");
                    return;
                }

                dispatch(userSliceActions.setUser(user));
                dispatch(userSliceActions.setAuthed(true));

                router.push("/");
            }).catch((err) => {
                alert("Error: " + err.message);
            });
        }
        else if (AuthType === "register") {
            if(!repeatPassword) {
                alert("Please repeat your password");
                return;
            }
            addUser({ email, password, repeatPassword }).then((user) => {
                dispatch(userSliceActions.setUser(user));
                dispatch(userSliceActions.setAuthed(true));
                router.push("/");   
            }).catch((err) => {
                alert("Error: " + err.message);
            });
        }
    }


    return (
        <>
         <form className="flex flex-col w-[300px] gap-4 border-[1px] rounded-md border-gray-300 p-4" onSubmit={handleSubmit}>
                <input type="text" name="email" placeholder="Email" className="p-2 border-[1px] rounded-md border-gray-300" />
                <input type="password" name="password" placeholder="Password" className="p-2 border-[1px] rounded-md border-gray-300" />
                {
                    AuthType === "register" && <input type="password" name="repeatPassword" placeholder="Repeat Password" className="p-2 border-[1px] rounded-md border-gray-300" />
                }
                <button type="submit" className="bg-blue-500 text-white p-2 rounded-md cursor-pointer">{
                    AuthType === "login" ? "Login" : "Register"
                }</button>
                    
        
                <p>
                    {AuthType === "login" ? "Don't have an account? " : "Already have an account? "}
                    <button type="button" onClick={() => setAuthType(AuthType === "login" ? "register" : "login")}>
                        {AuthType === "login" ? "Register" : "Login"}
                    </button>
                </p>
            </form>
        </>
    )
}