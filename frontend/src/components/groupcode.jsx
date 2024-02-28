import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "./ui/card"

  
export function GroupCode( {group} ) {
    return (
      <Card className="mx-4 my-4 w-80 h-full">
        <CardHeader>
          <CardTitle>Group Code</CardTitle>
          <CardDescription>
            Invite your loved ones to join and make commitments together.
            
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6">
          <div className="flex items-center justify-between space-x-4">
          <CardDescription>
                Copy the code below to invite them.
            
                <div className="flex items-center space-x-4 my-4">
                    {group?.code}
                </div>
                </CardDescription>
            </div>
        </CardContent>
      </Card>
    )
  }