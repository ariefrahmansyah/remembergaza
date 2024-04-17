defmodule RemembergazaWeb.PageController do
  use RemembergazaWeb, :controller
  import RemembergazaWeb.Format, only: [format_number: 1]

  def home(conn, _params) do
    identified_victims = Application.get_env(:remembergaza, :identified_victims)
    total_identified_victims = length(identified_victims)

    summary = Application.get_env(:remembergaza, :summary)
    total_victims = summary["gaza"]["killed"]["total"]
    unidentified_victims = total_victims - total_identified_victims

    last_retrieved = Application.get_env(:remembergaza, :date_time)

    description_content =
      "From #{format_number(total_victims)} killed in Gaza since October 7, 2023, #{format_number(total_identified_victims)} victims are identified. Here are their names."

    render(conn, :home,
      layout: false,
      total_identified_victims: format_number(total_identified_victims),
      total_victims: format_number(total_victims),
      unidentified_victims: format_number(unidentified_victims),
      last_retrieved: last_retrieved,
      description: %{content: description_content}
    )
  end
end
