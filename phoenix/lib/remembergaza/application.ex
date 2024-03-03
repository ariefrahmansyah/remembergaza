defmodule Remembergaza.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  require Logger

  use Application
  use HTTPoison.Base

  @impl true
  def start(_type, _args) do
    children = [
      RemembergazaWeb.Telemetry,
      {DNSCluster, query: Application.get_env(:remembergaza, :dns_cluster_query) || :ignore},
      {Phoenix.PubSub, name: Remembergaza.PubSub},
      # Start a worker by calling: Remembergaza.Worker.start_link(arg)
      # {Remembergaza.Worker, arg},
      # Start to serve requests, typically the last entry
      RemembergazaWeb.Endpoint
    ]

    get_identified_victims()
    get_summary()
    get_current_date_time()

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: Remembergaza.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    RemembergazaWeb.Endpoint.config_change(changed, removed)
    :ok
  end

  def get_identified_victims() do
    Logger.info("Getting identified victims")
    url = "https://data.techforpalestine.org/api/v2/killed-in-gaza.min.json"
    headers = []

    case HTTPoison.get(url, headers) do
      {:ok, %{body: raw_body, status_code: 200}} ->
        # Successfully fetched data
        data = Poison.decode!(raw_body)
        Application.put_env(:remembergaza, :identified_victims, data)
        {:ok, data}

      {:ok, %{status_code: code}} ->
        # Server responded with an error status code
        {:error, "HTTP request failed with status code #{code}"}

      {:error, %{reason: reason}} ->
        # Error occurred during HTTP request
        {:error, reason}
    end
  end

  def get_summary() do
    Logger.info("Getting summary")
    url = "https://data.techforpalestine.org/api/v3/summary.min.json"
    headers = []

    case HTTPoison.get(url, headers) do
      {:ok, %{body: raw_body, status_code: 200}} ->
        # Successfully fetched data
        data = Poison.decode!(raw_body)
        Application.put_env(:remembergaza, :summary, data)
        {:ok, data}

      {:ok, %{status_code: code}} ->
        # Server responded with an error status code
        {:error, "HTTP request failed with status code #{code}"}

      {:error, %{reason: reason}} ->
        # Error occurred during HTTP request
        {:error, reason}
    end
  end

  def get_current_date_time() do
    datetime = DateTime.utc_now()
    Application.put_env(:remembergaza, :date_time, datetime)
  end
end
