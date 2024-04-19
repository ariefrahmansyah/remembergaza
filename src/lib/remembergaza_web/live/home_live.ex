defmodule RemembergazaWeb.HomeLive do
  use RemembergazaWeb, :live_view
  import RemembergazaWeb.Format, only: [format_number: 1]

  def mount(_params, _session, socket) do
    identified_victims = Application.get_env(:remembergaza, :identified_victims)
    total_identified_victims = length(identified_victims)

    summary = Application.get_env(:remembergaza, :summary)
    total_victims = summary["gaza"]["killed"]["total"]
    unidentified_victims = total_victims - total_identified_victims

    last_retrieved = Application.get_env(:remembergaza, :date_time)

    description_content =
      "From #{format_number(total_victims)} killed in Gaza since October 7, 2023, #{format_number(total_identified_victims)} victims are identified. Here are their names."

    {:ok,
     socket
     |> assign(
       total_identified_victims: format_number(total_identified_victims),
       total_victims: format_number(total_victims),
       unidentified_victims: format_number(unidentified_victims),
       last_retrieved: last_retrieved,
       description: %{content: description_content},
       page: 1,
       per_page: 999
     )
     |> stream_configure(:victims, dom_id: &"victims-#{&1["id"]}")
     |> paginate_victims(1)}
  end

  defp paginate_victims(socket, new_page) when new_page >= 1 do
    %{per_page: per_page, page: cur_page} = socket.assigns

    victims =
      Application.get_env(:remembergaza, :identified_victims)
      |> Enum.slice((new_page - 1) * per_page * 3, per_page * 3)

    {victims, at, limit} =
      if new_page >= cur_page do
        {victims, -1, per_page * 3 * -1}
      else
        {Enum.reverse(victims), 0, per_page * 3}
      end

    socket
    |> Phoenix.Component.assign(:page, new_page)
    |> stream(:victims, victims, at: at, limit: limit)
  end

  def handle_event("next-page", _, socket) do
    {:noreply, paginate_victims(socket, socket.assigns.page + 1)}
  end

  def handle_event("prev-page", %{"_overran" => true}, socket) do
    {:noreply, paginate_victims(socket, 1)}
  end

  def handle_event("prev-page", _, socket) do
    if socket.assigns.page > 1 do
      {:noreply, paginate_victims(socket, socket.assigns.page - 1)}
    else
      {:noreply, socket}
    end
  end
end
