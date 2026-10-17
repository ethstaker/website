# This plugin will call an RSS feed and convert the XML to YAML
# 
# Usage:
#   rss_feed_url = The URL of the RSS feed
#   {%- assign feed = "https://rhinoreview.substack.com/feed" | rss_feed_url -%}

require 'net/http'
require 'active_support'
require 'active_support/core_ext/hash/conversions'
require 'yaml'
require 'rainbow'

module Jekyll
  module GetRSS

    def getrss(rss_feed_url)
      res = Net::HTTP.get_response(URI.parse(rss_feed_url))
      if !res.kind_of? Net::HTTPSuccess
        abort("ERROR: Fetch failed: getres('#{rss_feed_url}')")
      end
      xml = res.body
      YAML.unsafe_load(Hash.from_xml(xml).to_yaml)
    end

  end
end

Liquid::Template.register_filter(Jekyll::GetRSS)