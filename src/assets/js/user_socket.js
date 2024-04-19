// NOTE: The contents of this file will only be executed if
// you uncomment its entry in "assets/js/app.js".

// Bring in Phoenix channels client library:
import { Socket } from "phoenix";

// And connect to the path in "lib/remembergaza_web/endpoint.ex". We pass the
// token for authentication. Read below how it should be used.
let socket = new Socket("/socket", { params: { token: window.userToken } });

// When you connect, you'll often need to authenticate the client.
// For example, imagine you have an authentication plug, `MyAuth`,
// which authenticates the session and assigns a `:current_user`.
// If the current user exists you can assign the user's token in
// the connection for use in the layout.
//
// In your "lib/remembergaza_web/router.ex":
//
//     pipeline :browser do
//       ...
//       plug MyAuth
//       plug :put_user_token
//     end
//
//     defp put_user_token(conn, _) do
//       if current_user = conn.assigns[:current_user] do
//         token = Phoenix.Token.sign(conn, "user socket", current_user.id)
//         assign(conn, :user_token, token)
//       else
//         conn
//       end
//     end
//
// Now you need to pass this token to JavaScript. You can do so
// inside a script tag in "lib/remembergaza_web/templates/layout/app.html.heex":
//
//     <script>window.userToken = "<%= assigns[:user_token] %>";</script>
//
// You will need to verify the user token in the "connect/3" function
// in "lib/remembergaza_web/channels/user_socket.ex":
//
//     def connect(%{"token" => token}, socket, _connect_info) do
//       # max_age: 1209600 is equivalent to two weeks in seconds
//       case Phoenix.Token.verify(socket, "user socket", token, max_age: 1_209_600) do
//         {:ok, user_id} ->
//           {:ok, assign(socket, :user, user_id)}
//
//         {:error, reason} ->
//           :error
//       end
//     end
//
// Finally, connect to the socket:
socket.connect();

let channel = socket.channel("room:lobby", {});
channel
  .join()
  .receive("ok", (resp) => {
    console.log("Connected successfully", resp);
  })
  .receive("error", (resp) => {
    console.log("Unable to connect", resp);
  });

let messagesContainer = document.querySelector("#victims");

channel.on("message", (payload) => {
  // Example data of `payload.victims[0]` passed from socket.
  // {
  //   age: 43,
  //   dob: "1981-01-06",
  //   en_name: "Ahmed Abdalrahamun Ahmed Shehab",
  //   id: "994024404",
  //   name: "أحمد عبدالرحمن أحمد شهاب",
  //   sex: "m",
  // };

  // Construct innerHTML using the data.
  const innerHTML = payload.victims
    .map((victim) => {
      return generateVictimInfoHtml(victim);
    })
    .join("");

  // Append the columnDiv to the messagesContainer.
  messagesContainer.innerHTML += innerHTML;
});

export default socket;

/**
 * HTML string to display a single victim information.
 */
function generateVictimInfoHtml({ age, dob, en_name, name, sex }) {
  return `
  <div>
    <h3>${name}</h3>
    <p>${en_name}</p>
    ${
      age == null || age === -1
        ? `<p class="text-sm text-slate-500">unknown age</p>`
        : `<p class="text-sm text-slate-500">${age} years old</p>`
    }
  </div>
  `;
}
