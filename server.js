var express = require("express");
var app = express();
const PORT = 3000;
const bodyParser = require("body-parser");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

let users = [
  {
    nick: "111",
    email: "111@w.pl",
  },
  {
    nick: "222",
    email: "222@w.pl",
  },
  {
    nick: "333",
    email: "333@w.pl",
  },
];

var path = require("path");
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/static/addUser.html"));
});

app.get("/removeUserBySelect", function (req, res) {
  let select = "";
  for (let i = 0; i < users.length; i++) {
    select += `<option value="${users[i].email}">${users[i].email}</option>`;
  }
  let page = `
<form action="/deleteSelect" method="POST">
    <input type="submit" value="usuń" style="margin-top: 5px;">        
    <br>
    <select name="email">
    ${select}
    </select>
</form> 
`;
  res.send(page);
});
app.get("/removeUserByRadio", function (req, res) {
  let radio = "";
  for (let i = 0; i < users.length; i++) {
    radio += `<input type="radio" name="email" value="${users[i].email}"><label for="email">${users[i].email}</label><br>`;
  }
  let page = `
<form action="/deleteRadio" method="POST">
    <input type="submit" value="usuń" style="margin-top: 5px;">        
    <br>
    ${radio}
</form> 
`;
  res.send(page);
});
app.get("/removeUserByCheckbox", function (req, res) {
  let checkbox = "";
  for (let i = 0; i < users.length; i++) {
    checkbox += `<input type="checkbox" name="email" value="${users[i].email}"><label for="email">${users[i].email}</label><br>`;
  }
  let page = `
<form action="/deleteCheckbox" method="POST">
    <input type="submit" value="usuń" style="margin-top: 5px;">        
    <br>
    ${checkbox}
</form> 
`;
  res.send(page);
});

app.post("/handleForm", function (req, res) {
  let user = req.body;
  let email = user.email;
  let nick = user.nick;
  let flag = false;

  if (email != "" || nick != "") {
    for (let i = 0; i < users.length; i++) {
      if (users[i].email == email) {
        flag = true;
        res.send("podany adress email jest już w bazie");
        break;
      }
    }
    if (!flag) {
      users.push(user);
      res.send("adres został dodany do bazy");
    }
  } else {
    res.send("email i nick musi być podany");
  }
});

app.post("/deleteSelect", function (req, res) {
  let user = req.body;
  let email = user.email;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email) {
      users.splice(i, 1);
      break;
    }
  }
  res.sendFile(path.join(__dirname + "/static/addUser.html"));
});
app.post("/deleteRadio", function (req, res) {
  let user = req.body;
  let email = user.email;
  for (let i = 0; i < users.length; i++) {
    if (users[i].email == email) {
      users.splice(i, 1);
      break;
    }
  }
  res.sendFile(path.join(__dirname + "/static/addUser.html"));
});
app.post("/deleteCheckbox", function (req, res) {
  let emails = req.body.email;
  for (let i = 0; i < emails.length; i++) {
    for (let j = 0; j < users.length; j++) {
      if (users[j].email == emails[i]) {
        users.splice(j, 1);
        break;
      }
    }
  }
  res.sendFile(path.join(__dirname + "/static/addUser.html"));
});
app.listen(PORT, function () {
  console.log("start serwera na porcie " + PORT);
});
