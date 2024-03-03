import Config

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :remembergaza, RemembergazaWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "bIEAwQo/M9tnmIA3wBPGkUyNEthfeY4UEh5+hXBscnpGh1SQfRm5K5V9Ej+4rQrS",
  server: false

# Print only warnings and errors during test
config :logger, level: :warning

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
