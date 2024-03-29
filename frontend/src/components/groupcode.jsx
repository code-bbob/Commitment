import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { FaCopy } from "react-icons/fa";
import { TiTick } from "react-icons/ti";

export function GroupCode( {group} ) {
    const [copied, setCopied] = useState(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(group?.code)
          .then(() => setCopied(true))
          .catch(() => setCopied(false));
    };

    return (
      <Card className="mx-4 my-4 w-80 h-auto">
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-bold">{group?.name}</CardTitle>
          <CardDescription>
            Invite your loved ones to join and make commitments together.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between space-x-4">
            <CardDescription >
              <p className="font-bold">
              Copy the code below to invite them.
              </p>
              <div className="flex items-center space-x-4 my-4">
                {group?.code}
                {copied ? <TiTick size = {25} className="ml-1 border border-black border-1 p-1"/> : <FaCopy size = {25} onClick={copyToClipboard} className="ml-1 rounded border border-black border-1 p-1" />}
                  

              </div>
            </CardDescription>
          </div>
        </CardContent>
      </Card>
    )
}
