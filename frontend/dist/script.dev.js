"use strict";

//  start from here
function signup() {
  var username, password, response;
  return regeneratorRuntime.async(function signup$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          username = document.getElementById("username").value;
          password = document.getElementById("password").value;
          _context.prev = 2;
          _context.next = 5;
          return regeneratorRuntime.awrap(axios.post("http://localhost:3000/api/auth/signup", {
            username: username,
            password: password
          }, {
            headers: {
              "Content-Type": "application/json"
            }
          }));

        case 5:
          response = _context.sent;
          console.log(response.data);

          if (response.status === 200) {
            alert("Signup successful");
          } else {
            alert("Signup failed");
          }

          _context.next = 14;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](2);
          console.error("Error:", _context.t0);
          alert("Signup failed");

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[2, 10]]);
}

function signin() {
  var username, password, response, token;
  return regeneratorRuntime.async(function signin$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          username = document.getElementById("username").value;
          password = document.getElementById("password").value;
          _context2.prev = 2;
          _context2.next = 5;
          return regeneratorRuntime.awrap(axios.post("http://localhost:3000/api/auth/signin", {
            username: username,
            password: password
          }, {
            headers: {
              "Content-Type": "application/json"
            }
          }));

        case 5:
          response = _context2.sent;
          console.log(response.data);
          token = response.data.token;
          localStorage.setItem('token', token); // Corrected this line

          if (response.status === 200) {
            alert("Signin successful");
          } else {
            alert("Signin failed");
          }

          _context2.next = 16;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](2);
          console.error("Error:", _context2.t0);
          alert("Signin failed: " + _context2.t0.response.data.message);

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[2, 12]]);
}

function logout() {}