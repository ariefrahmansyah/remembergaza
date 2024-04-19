defmodule RemembergazaWeb.PageController do
  use RemembergazaWeb, :controller

  def home(conn, _params) do
    render(conn, :home, layout: false)
  end
end
