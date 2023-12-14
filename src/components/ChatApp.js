
import React, { useState, useEffect } from 'react';

const ChatApp = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'Ali' },
        { id: 2, name: 'Irfan' },
    ]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Load messages ffrom local storage
        const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
        setMessages(storedMessages);
    }, []);

    useEffect(() => {
        // Save messages to local storage
        localStorage.setItem('messages', JSON.stringify(messages));
    }, [messages]);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const sendMessage = () => {
        if (message.trim() === '' || !selectedUser) {
            return;
        }

        const newMessage = {
            id: messages.length + 1,
            sender: selectedUser.name,
            text: message,
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setMessage('');
    };

    return (
        <div className=" h-screen">
            <div className="flex ">
                {/* User list */}
                <div className="w-1/4 text-white bg-gray-900 p-4 border-r">
                    <h2 className="text-xl  font-bold mb-4">Users</h2>
                    <ul>
                        {users.map((user) => (
                            <li
                                key={user.id}
                                className={`cursor-pointer p-2 ${selectedUser && selectedUser.id === user.id ? 'bg-blue-300 text-black'  : ''
                                    }`}
                                onClick={() => handleUserClick(user)}
                            >
                                {user.name}
                            </li>
                        ))}
                    </ul>
                </div>

                {/*  Chat */}
                <div className="flex-1 p-4 bg-gray-300">
                    {selectedUser ? (
                        <>
                            <h2 className="text-xl font-bold mb-4">{selectedUser.name}</h2>
                            <div className="border rounded p-4 h-64 overflow-y-auto bg-white">
                                {messages.map((msg) => (
                                    <div key={msg.id} className="mb-2">
                                        <div className={`${msg.sender === selectedUser.name ? 'text-right' : 'text-left'}`}>
                                            <span
                                                className={`${msg.sender === selectedUser.name ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-800'
                                                    } py-2 px-4 rounded inline-block`}
                                            >
                                                {msg.text}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex mt-4">
                                <input
                                    type="text"
                                    placeholder="Type your message..."
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    className="flex-1 px-4 py-2 border rounded focus:outline-none focus:shadow-outline"
                                />
                                <button
                                    onClick={sendMessage}
                                    className="bg-blue-500 text-white px-4 py-2 rounded ml-2"
                                >
                                    Send
                                </button>
                            </div>
                        </>
                    ) : (
                        <p className="text-center text-gray-600">Select a user to start chatting</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatApp;
