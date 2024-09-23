const pool = require("./../config/db");

exports.getChats = async (req, res) => {
    // console.log("inside chat controller");
    try {
        const userId = req.user.id;
        const userRole = req.user.role;

        if (userRole == "doctor") {
            const chatsResult = await pool.query("SELECT * FROM chats WHERE doctor_id = $1", [userId]);
            const chats = chatsResult.rows; // Access the rows
            const messagesResult = await pool.query("SELECT * FROM messages");
            const messages = messagesResult.rows; // Access the rows
            res.status(200).json({ chats, messages }); // Return the chats and messages
        }
        else {
            const chatsResult = await pool.query("SELECT * FROM chats WHERE user_id = $1", [userId]);
            const chats = chatsResult.rows; // Access the rows
            const messagesResult = await pool.query("SELECT * FROM messages");
            const messages = messagesResult.rows; // Access the rows
            res.status(200).json({ chats, messages }); // Return the chats and messages
        }

    } catch (err) {
        console.log("Server Error (chat controller):", err);
        res.status(500).json({ error: "Server Error (chat controller)" });
    }
};

exports.addMessage = async (req, res) => {
    // console.log("inside addMessage controller");

    try {
        const { message } = req.body;


        const userId = req.user.id;
        const userRole = req.user.role;

        // console.log(message.text);
        // console.log(message.chatId);
        // console.log(userId);
        // console.log(userRole);

        const currentTime = new Date();
        const timeString = currentTime.toTimeString().split(' ')[0];

        if (userRole == "user") {
            const chatsResult = await pool.query(`INSERT INTO public.messages(  chat_id, text, sender, "time") VALUES ($1, $2, $3, $4) RETURNING *`,
                [message.chatId, message.text, "User", timeString]
            );
        }
        else {
            const chatsResult = await pool.query(`INSERT INTO public.messages(  chat_id, text, sender, "time") VALUES ($1, $2, $3, $4) RETURNING *`,
                [message.chatId, message.text, "Doctor", timeString]
            );
        }


        const updateLastMessage = await pool.query(`UPDATE chats SET last_message='${message.text}' , time_last_message='${timeString}' WHERE chat_id=${message.chatId} `,);


        res.status(200).json(""); // Return the chats and messages
    } catch (err) {
        console.log("Server Error (chat controller):", err);
        res.status(500).json({ error: "Server Error (chat controller)" });
    }
};

