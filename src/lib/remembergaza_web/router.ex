defmodule RemembergazaWeb.Router do
  use RemembergazaWeb, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_live_flash
    plug :put_root_layout, html: {RemembergazaWeb.Layouts, :root}
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  scope "/", RemembergazaWeb do
    pipe_through :browser

    live "/", HomeLive

    import Phoenix.LiveDashboard.Router
    live_dashboard "/dashboard", metrics: RemembergazaWeb.Telemetry
  end
end
