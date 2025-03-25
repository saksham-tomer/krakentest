import { FaUserAstronaut } from "react-icons/fa";
import { VscGame } from "react-icons/vsc";

const ChatMessage = ({ message, type }) => (
  <div
    className={`flex items-center gap-4 mb-4  py-4 px-4  bg-black text-white rounded-lg   w-3/4 max-w-max ${
      type === "bot" ? "mr-auto" : "ml-auto"
    }`}
  >
    <div className="text-accent-lighter self-start text-3xl">
      {type === "bot" ? (
        <VscGame className="scale-in-center" />
      ) : (
        <FaUserAstronaut className="jello-horizontal t" />
      )}
    </div>
    <p className="font-semibold text-sm text-jacarta-100">{message}</p>
  </div>
);
export default ChatMessage;
