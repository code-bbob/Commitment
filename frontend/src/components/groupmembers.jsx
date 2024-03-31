import { ChevronDownIcon } from "@radix-ui/react-icons"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "./ui/avatar"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover"
import { useNavigate } from "react-router-dom"
import { ScrollArea } from "../components/ui/scroll-area"

const GroupMembers = ({members}) => {
  const getInitials = (name) => {
    const initials = name.split(' ')
      .map(word => word.charAt(0))
      .join('');
    return initials.toUpperCase();
  }
  console.log(members);


  
  const navigate = useNavigate();
    return (
      
      <Card className="mx-4 my-4 w-80 h-auto ">
        <CardHeader>
          <CardTitle>Group Members</CardTitle>
          <CardDescription>
            Invite your team members to collaborate.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
        <ScrollArea className="h-auto max-h-[200px] overflow-hidden rounded-md border p-4">

        {members?.map((user) => (
          <div onClick = {()=>navigate(`/user/${user.uuid}`)} className="flex items-center space-x-4 py-2 hover:bg-gray-300">

                <>
                <Avatar>
                <AvatarImage src={`http://127.0.0.1:8000/${user?.dp}`} />
                <AvatarFallback>{getInitials(user?.name)}</AvatarFallback>
              </Avatar>
              <div>
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            </>
              
            </div>  
            )
            )}
           
            </ScrollArea>
        </CardContent>
      </Card>
    )
  }

  export default GroupMembers