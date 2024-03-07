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


export function GroupMembers( {users} ) {
    return (
      <Card className="mx-4 my-4 w-80 h-auto">
        <CardHeader>
          <CardTitle>Group Members</CardTitle>
          <CardDescription>
            Invite your team members to collaborate.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
        {users?.map((user) => (
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-4">
              
                <>
                <Avatar>
                <AvatarImage src="/avatars/01.png" />
                <AvatarFallback>Bbob</AvatarFallback>
              </Avatar>
              <div>
              <p className="text-sm font-medium leading-none">{user?.name}</p>
              <p className="text-sm text-muted-foreground">{user?.email}</p>
            </div>
            </>
              
            </div>
            </div>
            )
            )}
        </CardContent>
      </Card>
    )
  }