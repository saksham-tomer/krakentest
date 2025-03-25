import ChatInterface from "./components/ChatInterface";
import SideBar from "./components/SideBar";

const Chatbot = () => {
  return (
    <div className="flex justify-between px-4 mx-auto">
      <SideBar />
      <ChatInterface />
    </div>
  );
};
export default Chatbot;
