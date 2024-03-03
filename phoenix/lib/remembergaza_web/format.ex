defmodule RemembergazaWeb.Format do
  def format_number(number) do
    number
      |> Integer.to_charlist
      |> Enum.reverse
      |> Enum.chunk_every(3)
      |> Enum.join(",")
      |> String.reverse
  end
end
