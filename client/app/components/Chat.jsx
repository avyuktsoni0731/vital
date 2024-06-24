import { useAuth } from "../utils/useAuth";
import Image from 'next/image';
import Logo from '../../app/components/icons/pulse-white.png';

const Chat = ({isUser, userPrompt='', message='',loading=false}) => {

    const {profilePicture} = useAuth();

      const createMarkup = (htmlString) => {
    
        return { __html: htmlString };
      };
    return(
        <>
        {isUser ? (
            <div  className="flex justify-end items-center gap-5">
            <span className="">
                {userPrompt}
            </span>
            <Image
                src={profilePicture}
                className="rounded-full m-4"
                alt="user-profile-image"
                width={35}
                height={35}
            />
            </div>
        ) : (
            <div
            
            className="flex items-start justify-start gap-5"
            >
                <Image src={Logo} alt="vital-logo" width={35} height={35}/>
                <div
                    className="flex flex-col items-start"
                    dangerouslySetInnerHTML={createMarkup(message)}
                ></div>
            </div>
        )}
        </>
    )
}

export default Chat;