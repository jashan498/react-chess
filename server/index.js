var express = require("express");
var socket = require("socket.io");
const cors = require("cors");

// App setup
var app = express();
app.use(cors());

var port = process.env.PORT || 8080;
var server = app.listen(port, function() {
  console.log("listening for requests on port", port);
});

app.get("/testing", (req, res) => {
  // console.log("Backend called");
  res.send("Server is online.");
});

// Players playing the game
var rooms = {};
var users = {};
var opponent = {};

// Socket setup & pass server
var io = socket(server);
io.on("connection", socket => {
  console.log("made socket connection", socket.id);

  //Store nickname
  //   socket.on("sendName", function(name) {
  //     rooms[name] = socket.id;
  //     console.log(rooms);

  socket.on("disconnect", function() {
    // console.log("disconnect rooms: ", rooms);
    // console.log("disconnect users: ", users);
    // console.log("disconnect users: ", socket.id);
    const room = users[socket.id];
    if (room) {
      //   socket.emit("loser", rooms[room][socket.id]);
      //   let k = socket.id;
      //   for (var key in rooms[room]) {
      //     if (key !== socket.id) {
      //       k = key;
      //     }
      //   }
      io.to(opponent[socket.id]).emit("loser", rooms[room][socket.id]);

      for (var key in rooms[room]) {
        delete users[key];
        delete opponent[key];
      }
      delete rooms[room];
      // console.log(rooms[roo]);
      console.log(users);
      console.log("delete ", rooms);
    }
  });

  socket.on("joinRoom", function(name) {
    // console.log(!rooms.name || (rooms.name && rooms.name.length < 2));
    if (!rooms[name] || (rooms[name] && Object.keys(rooms[name]).length < 2)) {
      if (!rooms[name]) {
        rooms[name] = {};
        rooms[name][socket.id] = 1;
        users[socket.id] = name;
        io.to(socket.id).emit("roomJoined", 1);
        // io.to(socket.id).emit("startLoading");
      } else {
        console.log(rooms[name]);
        // console.log("in rooms ", rooms);
        rooms[name][socket.id] = 2;
        users[socket.id] = name;
        io.to(socket.id).emit("roomJoined", 2);

        // setting opponents
        const roomUsers = Object.keys(rooms[name]);
        opponent[roomUsers[0]] = roomUsers[1];
        opponent[roomUsers[1]] = roomUsers[0];

        io.to(opponent[socket.id]).emit("stopLoading"); // Stop loading screen of the first player
        io.to(socket.id).emit("stopLoading"); // Stop loading screen of the second player

        // console.log("opponenets: ", opponent);
      }
    } else {
      io.to(socket.id).emit("roomFull", "Room already full, create another");
    }

    // console.log(Object.keys(rooms.jsraw));
    // console.log(Object.keys(rooms.jsraw).find(key => rooms.jsraw[key] === 2));   to find key of a value
    console.log("rooms: ", rooms);
    // console.log("users: ", users);
  });

  socket.on("stateChanged", function(data) {
    io.to(opponent[socket.id]).emit("stateChanged", data);
  });

  socket.on("rematch", () => {
    // console.log(rooms[users[socket.id]]);
    if (!rooms[users[socket.id]]) {
      io.to(socket.id).emit("oppDisconnected");
    } else {
      io.to(opponent[socket.id]).emit("rematch");
    }
  });
});

///////////////////////////////////////////////////model work//////////////////////////////////////////

modelKeras = {
  modelTopology: {
    keras_version: "2.1.6-tf",
    backend: "tensorflow",
    model_config: {
      class_name: "Sequential",
      config: {
        name: "sequential",
        layers: [
          {
            class_name: "Conv2D",
            config: {
              name: "conv2d",
              trainable: true,
              batch_input_shape: [null, 28, 28, 1],
              dtype: "float32",
              filters: 16,
              kernel_size: [3, 3],
              strides: [1, 1],
              padding: "same",
              data_format: "channels_last",
              dilation_rate: [1, 1],
              activation: "relu",
              use_bias: true,
              kernel_initializer: {
                class_name: "GlorotUniform",
                config: { seed: null, dtype: "float32" }
              },
              bias_initializer: {
                class_name: "Zeros",
                config: { dtype: "float32" }
              },
              kernel_regularizer: null,
              bias_regularizer: null,
              activity_regularizer: null,
              kernel_constraint: null,
              bias_constraint: null
            }
          },
          {
            class_name: "MaxPooling2D",
            config: {
              name: "max_pooling2d",
              trainable: true,
              dtype: "float32",
              pool_size: [2, 2],
              padding: "valid",
              strides: [2, 2],
              data_format: "channels_last"
            }
          },
          {
            class_name: "Conv2D",
            config: {
              name: "conv2d_1",
              trainable: true,
              dtype: "float32",
              filters: 32,
              kernel_size: [3, 3],
              strides: [1, 1],
              padding: "same",
              data_format: "channels_last",
              dilation_rate: [1, 1],
              activation: "relu",
              use_bias: true,
              kernel_initializer: {
                class_name: "GlorotUniform",
                config: { seed: null, dtype: "float32" }
              },
              bias_initializer: {
                class_name: "Zeros",
                config: { dtype: "float32" }
              },
              kernel_regularizer: null,
              bias_regularizer: null,
              activity_regularizer: null,
              kernel_constraint: null,
              bias_constraint: null
            }
          },
          {
            class_name: "MaxPooling2D",
            config: {
              name: "max_pooling2d_1",
              trainable: true,
              dtype: "float32",
              pool_size: [2, 2],
              padding: "valid",
              strides: [2, 2],
              data_format: "channels_last"
            }
          },
          {
            class_name: "Conv2D",
            config: {
              name: "conv2d_2",
              trainable: true,
              dtype: "float32",
              filters: 64,
              kernel_size: [3, 3],
              strides: [1, 1],
              padding: "same",
              data_format: "channels_last",
              dilation_rate: [1, 1],
              activation: "relu",
              use_bias: true,
              kernel_initializer: {
                class_name: "GlorotUniform",
                config: { seed: null, dtype: "float32" }
              },
              bias_initializer: {
                class_name: "Zeros",
                config: { dtype: "float32" }
              },
              kernel_regularizer: null,
              bias_regularizer: null,
              activity_regularizer: null,
              kernel_constraint: null,
              bias_constraint: null
            }
          },
          {
            class_name: "MaxPooling2D",
            config: {
              name: "max_pooling2d_2",
              trainable: true,
              dtype: "float32",
              pool_size: [2, 2],
              padding: "valid",
              strides: [2, 2],
              data_format: "channels_last"
            }
          },
          {
            class_name: "Flatten",
            config: {
              name: "flatten",
              trainable: true,
              dtype: "float32",
              data_format: "channels_last"
            }
          },
          {
            class_name: "Dense",
            config: {
              name: "dense",
              trainable: true,
              dtype: "float32",
              units: 128,
              activation: "relu",
              use_bias: true,
              kernel_initializer: {
                class_name: "GlorotUniform",
                config: { seed: null, dtype: "float32" }
              },
              bias_initializer: {
                class_name: "Zeros",
                config: { dtype: "float32" }
              },
              kernel_regularizer: null,
              bias_regularizer: null,
              activity_regularizer: null,
              kernel_constraint: null,
              bias_constraint: null
            }
          },
          {
            class_name: "Dense",
            config: {
              name: "dense_1",
              trainable: true,
              dtype: "float32",
              units: 16,
              activation: "softmax",
              use_bias: true,
              kernel_initializer: {
                class_name: "GlorotUniform",
                config: { seed: null, dtype: "float32" }
              },
              bias_initializer: {
                class_name: "Zeros",
                config: { dtype: "float32" }
              },
              kernel_regularizer: null,
              bias_regularizer: null,
              activity_regularizer: null,
              kernel_constraint: null,
              bias_constraint: null
            }
          }
        ]
      }
    },
    training_config: {
      optimizer_config: {
        class_name: "Adam",
        config: {
          lr: 0.0010000000474974513,
          beta_1: 0.8999999761581421,
          beta_2: 0.9990000128746033,
          decay: 0.0,
          epsilon: 1e-7,
          amsgrad: false
        }
      },
      loss: "categorical_crossentropy",
      metrics: ["top_k_categorical_accuracy"],
      weighted_metrics: null,
      sample_weight_mode: null,
      loss_weights: null
    }
  },
  weightsManifest: [
    {
      paths: ["group1-shard1of1"],
      weights: [
        { name: "conv2d/kernel", shape: [3, 3, 1, 16], dtype: "float32" },
        { name: "conv2d/bias", shape: [16], dtype: "float32" },
        { name: "conv2d_1/kernel", shape: [3, 3, 16, 32], dtype: "float32" },
        { name: "conv2d_1/bias", shape: [32], dtype: "float32" },
        { name: "conv2d_2/kernel", shape: [3, 3, 32, 64], dtype: "float32" },
        { name: "conv2d_2/bias", shape: [64], dtype: "float32" },
        { name: "dense/kernel", shape: [576, 128], dtype: "float32" },
        { name: "dense/bias", shape: [128], dtype: "float32" },
        { name: "dense_1/kernel", shape: [128, 16], dtype: "float32" },
        { name: "dense_1/bias", shape: [16], dtype: "float32" }
      ]
    }
  ]
};
app.get("/model", (req, res) => {
  console.log("Backend called");
  res.json(modelKeras);
});
