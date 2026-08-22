{%- comment -%}
// - Updates external links and files to open in a new tab
// - Adds an icon indicating the link opens in a new tab
{%- endcomment -%}

window.onload = updateLinkTargets();

function updateLinkTargets() {
  // open external links and pdfs in new tab
  const links = document.getElementsByTagName("a");
  {%- assign site_url = site.url | split: "//" | last -%}
  for (let link in links) {
    let href = links[link].href;
    // set all links to open in new tab
    if (/^(https?:)?\/\//.test(links[link].href)) {
      links[link].target = "_blank";
      links[link].classList.add("new-tab");
    }
    // if current domain, use same tab
    if (href != undefined && href.includes("{{site_url}}")) {
      links[link].target = "_self";
      links[link].classList.remove("new-tab");
    }
    if (href != undefined && !href.includes("https")) {
      links[link].target = "_self";
      links[link].classList.remove("new-tab");
    }
    // same-origin links are internal on any host (localhost, deploy previews)
    if (href != undefined && window.location.host != "" && href.includes("//" + window.location.host)) {
      links[link].target = "_self";
      links[link].classList.remove("new-tab");
    }
    // The above condition should catch this, but leaving it here in case it needs to be stated explicitely
    // if ( (href != undefined && href[0] == "#") || (href != undefined && href[0] == "/") ) {
    //   links[link].target = "_self";
    //   links[link].classList.remove("new-tab");
    // }
    // open all .pdf, .png, .jpg, .mp4 in new tab
    if (/(\.pdf$|\.png$|\.jpe*g$|\.mp4)/.test(href)) {
      links[link].target = "_blank";
      links[link].classList.add("new-tab");
    }
  }
}

document.querySelectorAll(".new-tab")
.forEach( x=> {
  x.innerHTML += `<span class="icon"> {{site.data.icons.new_tab}}</span>`;
});
