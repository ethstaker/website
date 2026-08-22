{%- comment -%}
// https://michalsnik.github.io/aos/
// - Initializes library
// - Dynamically add fade in animations to content
//   this is done dynamically so the content will
//   still show if the user has javascript disabled

// Usage:
// <img src="" class="fade-up"/>
{%- endcomment -%}

// Elements to fade up
const aosSelectors = [
  ".aos-up",
  "body > header",
  "body > section",
  "body > footer",
  "main > header",
  "main > section",
  // "table",
  // ".markdown-aos > h1",
  // ".markdown-aos > h2",
  // ".markdown-aos > h3",
  // ".markdown-aos > h4",
  // ".markdown-aos > h5",
  // ".markdown-aos > h6",
  // ".markdown-aos > p",
  // ".markdown-aos > div",
  ".markdown > .container",
  ".markdown-aos > img",
]
for (let i in aosSelectors) {
  document.querySelectorAll(aosSelectors[i])
  .forEach( x=> x.setAttribute("data-aos","fade-up"));
}
document.querySelectorAll(".aos-right")
  .forEach( x=> {
    x.classList.add("aos-animate");
    x.classList.add("aos-init");
    x.setAttribute("data-aos","fade-right");
  });
document.querySelectorAll(".aos-left")
  .forEach( x=> {
    x.classList.add("aos-animate");
    x.classList.add("aos-init");
    x.setAttribute("data-aos","fade-left");
  });

AOS.init({
  // Global settings:
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 120, // offset (in px) from the original trigger point
  delay: 50, // values from 0 to 3000, with step 50ms
  duration: 500, // values from 0 to 3000, with step 50ms
  easing: 'ease', // default easing for AOS animations
  once: false, // whether animation should happen only once - while scrolling down
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-bottom', // defines which position of the element regarding to window should trigger the animation
});
