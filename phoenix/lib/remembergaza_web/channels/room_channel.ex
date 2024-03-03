defmodule RemembergazaWeb.RoomChannel do
  use RemembergazaWeb, :channel

  require Logger

  @impl true
  def join("room:lobby", _payload, socket) do
    send(self(), :after_join)
    {:ok, socket}
  end

  @impl true
  def handle_info(:after_join, socket) do
    identified_victims = Application.get_env(:remembergaza, :identified_victims)

    Enum.map(identified_victims, fn value ->
      push(socket, "message", %{
        message: "#{value["name"]}<br />#{value["en_name"]}<br />"
      })

      :timer.sleep(1)
    end)

    {:noreply, socket}
  end
end
