"use client";

import { Button } from "../components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faGoogle } from "@fortawesome/free-brands-svg-icons";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/userauth/signup/",
        {
          email: email,
        }
      );
      if (response.status === 200) {
        console.log("success");
        navigate('/register', { state: { email: email } });
      } else {
        console.error("Failed to create account");
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
    
  };

  return (
    <Card className="mx-96 my-36 p-10 h-auto w-1/3">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline">
            <FontAwesomeIcon icon={faGithub} className="mx-1" />
            Github
          </Button>
          <Button variant="outline">
            <FontAwesomeIcon icon={faGoogle} className="mx-1" />
            Google
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Loading..." : "Continue"}
        </Button>
      </CardFooter>
    </Card>
  );
};
export default Signup;

// import * as React from "react"

// import { cn } from "../lib/utils"
// import { Button } from "../components/ui/button"
// import { Input } from "../components/ui/input"
// import { Label } from "../components/ui/label"

// const UserAuthForm = ({ className, ...props }) =>{
//   const [isLoading, setIsLoading] = React.useState(false)

//   async function onSubmit(event) {
//     event.preventDefault()
//     setIsLoading(true)

//     setTimeout(() => {
//       setIsLoading(false)
//     }, 3000)
//   }

//   return (
//     <div className={cn("grid gap-6", className)} {...props}>
//       <form onSubmit={onSubmit}>
//         <div className="grid gap-2">
//           <div className="grid gap-1">
//             <Label className="sr-only" htmlFor="email">
//               Email
//             </Label>
//             <Input
//               id="email"
//               placeholder="name@example.com"
//               type="email"
//               autoCapitalize="none"
//               autoComplete="email"
//               autoCorrect="off"
//               disabled={isLoading}
//             />
//           </div>
//           <Button disabled={isLoading}>
//             {isLoading && (
//              " hi"
//             )}
//             Sign In with Email
//           </Button>
//         </div>
//       </form>
//       <div className="relative">
//         <div className="absolute inset-0 flex items-center">
//           <span className="w-full border-t" />
//         </div>
//         <div className="relative flex justify-center text-xs uppercase">
//           <span className="bg-background px-2 text-muted-foreground">
//             Or continue with
//           </span>
//         </div>
//       </div>
//       <Button variant="outline" type="button" disabled={isLoading}>
//         {isLoading ? (
//           "hello"
//         ) : (
//           "haha"
//         )}{" "}
//         GitHub
//       </Button>
//     </div>
//   )
// }

// export default UserAuthForm
