import { Message as MessageType } from "@/src/types/message";

type Prop = {
  message: MessageType;
};

export const Message = ({ message }: Prop) => {
  return (
    <div key={message.id} className="border border-gray-300 rounded-md p-2">
      <div className="flex gap-2 items-center">
        <p className="text-sm text-gray-500">
          By: {message.author?.email || "Unknown User"}
        </p>
        |
        <p className="text-sm text-gray-500">
          {message.createdAt?.toDate().toLocaleString()}
        </p>
      </div>

      <p>{message.content}</p>
    </div>
  );
};
