defmodule RemembergazaWeb.RoomChannel do
  use RemembergazaWeb, :channel
  import RemembergazaWeb.Format, only: [format_number: 1]

  require Logger

  @impl true
  def join("room:lobby", _payload, socket) do
    send(self(), :after_join)
    {:ok, socket}
  end

  @impl true
  def handle_info(:after_join, socket) do
    identified_victims = Application.get_env(:remembergaza, :identified_victims)

    Enum.with_index(identified_victims, fn value, index ->
      push(socket, "message", %{
        message:
          "#{format_number(index + 1)}<br />#{value["name"]}<br />#{value["en_name"]}<br />"
      })

      :timer.sleep(1)
    end)

    {:noreply, socket}
  end
end
