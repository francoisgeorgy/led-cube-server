
interface ButtonProps {
    name: string;
    onClick: () => void;
    disabled?: boolean;
    // command: string;
    // sendMessage: (message: MessageToCube) => void;
}

export function Button({name, onClick, disabled=false}: ButtonProps) {

    // 11:08:47.051 Face.tsx:12 enter handleClick
    // 11:08:47.051 cube.ts:4 enter sendCommand
    // 11:08:47.051 cube.ts:6 send command
    // 11:08:47.052 Face.tsx:20 leave handleClick

/*
    const handleClick = async (cmd: string) => {
    //     Call the function to make the GET request
        console.log("enter handleClick");
        sendCommand(cmd)
            .then(result => {
                console.log("sendCommand success", result)
            })
            .catch(error => {
                console.log("sendCommand error", error)
            });
        console.log("leave handleClick");
    };
*/

    if (disabled) {
        return (
            <div className="face disabled">
                {name}
            </div>
        )
    } else {
        return (
            <div className="face" onClick={onClick}>
                {name}
            </div>
        )
    }

    // return (
    //     <div className="face" onClick={async () => {
    //         sendCommand("face", "U");
    //         console.log("onClick end")
    //     }}>
    //         {/*<div className="text-3xl font-bold">{name}</div>*/}
    //         {name}
    //     </div>
    // )
}
