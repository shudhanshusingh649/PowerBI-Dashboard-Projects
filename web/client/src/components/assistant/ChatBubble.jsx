export default function ChatBubble({ message, user }) {

  return (

    <div
      className={`flex ${
        user ? "justify-end" : "justify-start"
      }`}
    >

      <div
        className={`max-w-xl rounded-3xl px-5 py-4 shadow

        ${
          user
            ? "bg-blue-600 text-white"
            : "bg-white"
        }`}
      >

        {message}

      </div>

    </div>

  );

}