const express = require("express");
const http = require("http");
// const enforce = require("express-sslify");
const app = express();
const server = http.createServer(app);
//const socket = require('socket.io', { rememberTransport: false, transports: ['WebSocket', 'Flash Socket', 'AJAX long-polling'] })
const socket = require("socket.io");
const io = socket(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "http://localhost:8000",
      "https://chatnplay.baraaelbaba.com/"
    ],
    methods: ["GET", "POST"],
    credentials: true
  }
});
const path = require("path");
const _ = require("lodash");


// app.use(enforce.HTTPS({ trustProtoHeader: true }));

app.use(express.static("./client/build"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});

let users = [];
let queue = [];

io.on("connection", (socket) => {
  let isBusy = false;
  if (!_.includes(users, socket.id)) {
    users.push(socket.id);
  }
  // Handle signaling events
  socket.on('offer', (offer) => {
    io.to(offer.id).emit("offer", offer)
  });

  socket.on('answer', (answer) => {
    io.to(answer.id).emit("answer", answer)
  });

  socket.on('candidate', (candidate) => {
    // Broadcast candidate to all other clients
    socket.broadcast.emit('candidate', candidate);
  });

  socket.on('disconnect', () => {
  });
  if (!_.includes(users, socket.id)) {
    users.push(socket.id);
  }
  socket.emit("yourID", socket.id);
  io.sockets.emit("allUsers", users);

  socket.on("disconnect", () => {
    _.pull(users, socket.id);

    const userInQueue = _.find(queue, u => u.id === socket.id);

    if (userInQueue) {
      _.remove(queue, { id: userInQueue.id });
    }
    isBusy = false;
  });

  socket.on("leaveQueue", () => {
    _.remove(queue, { id: socket.id });
    isBusy = false;
  });

  socket.on("sendMessage", (data) => {
    socket.emit("messageSent", {
      message: data.message,
    });

    io.to(data.peerId).emit("receiveMessage", {
      message: data.message,
    });
  });
  socket.on("sendChessMove", (data) => {
    io.to(data.peerId).emit("receiveChessMove", {
      message: data.message,
    });
  });
  socket.on("sendBoard", (data) => {

    io.to(data.peerId).emit("receiveBoard", {
      message: data.message,
    });
  });

  socket.on("endCall", (data) => {
    isBusy = false;
    _.remove(queue, { id: socket.id });
    io.to(data.peerId).emit("isCallEnded", {
      message: data.message,
    });
  })
  socket.on('sendFriendRequst', (data) => {
    io.to(data.peerId).emit("recivedFriendRequst", {
      message: data.message,
    });
  })
  socket.on('sendIsAceptedFriend', (data) => {
    console.log(data.peerId)
    io.to(data.peerId).emit("reciveIsAceptedFriend", {
      message: data.message,
    });
  })
  socket.on("sendIsInverted", (data) => {
    io.to(data.peerId).emit("isInverted", {
      message: data.message,
    });
  }
  );
  socket.on("findPartner", (data) => {
    // If this socket already has a stale queue entry (e.g. user changed game
    // while waiting), drop it so we can re-evaluate with the new params.
    // This also recovers from a stuck `isBusy=true` state where the user
    // would otherwise need to manually press stop+start to reconnect.
    const existingIdx = _.findIndex(queue, u => u.id === socket.id);
    if (existingIdx !== -1) {
      queue.splice(existingIdx, 1);
    }
    isBusy = false;

    let uAchievedThierAuthPrefrence
    let dataAchievedThierAuthPrefrence
    viablePartner = _.find(queue, u => {
      if (u.id !== socket.id && u.onlyChat === data.onlyChat) {
        function getAuthBool(userAuthPrefernceAurg, dataAuthType) {
          if (userAuthPrefernceAurg == 'allUsers') {
            return true //doesnt matter which auth type since all will be accepted
          } else if (userAuthPrefernceAurg == 'loginUsers' &&
            dataAuthType == 'anyLogin' || dataAuthType == 'phoneNumberLogin') {
            return true
          } else if (userAuthPrefernceAurg == 'phoneNumberLogin' && dataAuthType == 'phoneNumberLogin') {
            return true
          } else {
            return false
          }
        }
        console.log(data)
        uAchievedThierAuthPrefrence = getAuthBool(u.userAuthPrefernce, data.AuthType);
        console.log(uAchievedThierAuthPrefrence)
        console.log(u.userAuthPrefernce, data.AuthType)
        dataAchievedThierAuthPrefrence = getAuthBool(data.userAuthPrefernce, u.AuthType)
        console.log(dataAchievedThierAuthPrefrence)
        console.log(data.userAuthPrefernce, u.AuthType)

        if (uAchievedThierAuthPrefrence && dataAchievedThierAuthPrefrence && u.userGame == data.userGame) {
          return true
        }
      }


    });

    if (!viablePartner && !isBusy) {
      isBusy = true;
      const userInQueue = _.find(queue, u => u.id === socket.id);
      if (!userInQueue) {
        queue.push({
          id: socket.id, onlyChat: data.onlyChat, AuthType: data.AuthType,
          prevUser: data.prevUser, userGame: data.userGame,
          roomId: data.roomId,
          userAuthPrefernce: data.userAuthPrefernce, uid: data.uid,
        });
      }
    } else if (!isBusy) {
      isBusy = true;
      _.remove(queue, { id: viablePartner.id });
      io.to(viablePartner.id).emit("peer", {
        peerId: socket.id,
        initiator: true,
        AuthType: data.AuthType,

        roomId: data.roomId,
        uid: data.uid

      });

      socket.emit("peer", {
        peerId: viablePartner.id,
        initiator: false,

        AuthType: viablePartner.AuthType,
        roomId: viablePartner.roomId,
        uid: viablePartner.uid
      });
    }
  });
  socket.on("signal", (data) => {
    if (!data.peerId) {
      return;
    }

    isBusy = false;
    io.to(data.peerId).emit("signal", {
      signal: data.signal,
      peerId: socket.id,
    });
  });

  // socket.on("close", (data) => {
  //   io.to(data.peerId).emit("close");
  // });
});

const port = process.env.PORT || 8000;

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
