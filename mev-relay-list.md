---
layout: markdown
title: MEV Relay List
permalink: /mev-relay-list

buttons:
- link: 'https://github.com/ethstaker/ethstaker-knowledgebase/blob/main/docs/guides/MEV-relay-list.md'
  text: Contribute {{site.data.icons.github}}
---


{%- assign markdown = "https://raw.githubusercontent.com/ethstaker/ethstaker-knowledgebase/refs/heads/main/docs/guides/MEV-relay-list.md" | getres | forceencode -%}



{%- assign callout_old_text = "" | append: markdown | split: '!!! info "Note"
' | last | split: "    

" | first -%}
{%- assign callout_old = '!!! info "Note"
' | append: callout_old_text -%}
<script>
console.log("{{callout_old_text | escape}}")
</script>
{%- assign callout_old_text = callout_old_text | replace: "    ", "" -%}

{%- capture callout_new -%}
{% include partials/components/callout.html
  type="info"
  title="Note"
  content=callout_old_text
%}
{%- endcapture -%}



{%- assign markdown = markdown | replace: callout_old, callout_new -%}



{{markdown}}

