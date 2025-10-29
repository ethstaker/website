# This plugin returns Lido marketshare
# 
# Usage:
#   rounding_depth = how many decimals to round to; default = 0
#   {{"" | getmarketshare } => 24
#   {{"0" | getmarketshare } => 24
#   {{"1" | getmarketshare } => 24.1
#   {{"2" | getmarketshare } => 24.12

require 'net/http'
require 'uri'
require 'rainbow'

module Jekyll
  module GetMarketshare

    def getmarketshare(rounding_depth=0)
      puts Rainbow("Fetching data: getmarketshare()").green

      uri = URI('https://api.dune.com/api/v1/query/1933075/results')
      uri.query = URI.encode_www_form(limit: 1000)

      res = Net::HTTP.start(uri.host, uri.port, use_ssl: true) do |http|
        http.get(uri, { 'X-Dune-API-Key' => ENV['DUNE_KEY'] })
      end

      unless res.is_a?(Net::HTTPSuccess)
        abort("ERROR: Fetch failed: getmarketshare()")
      end

      data = JSON.parse(res.body)
      lido_percentage = data.dig("result", "rows", 0, "lido_percentage").round(rounding_depth.to_i)
      puts lido_percentage

      lido_percentage
    end

  end
end

Liquid::Template.register_filter(Jekyll::GetMarketshare)