const firstKeywords = [
  " replied ",
  " liked ",
  " commented on this.",
  " commented on a post from ",
  " reacted "
];
const secondKeywords = [
  " likes ",
  " is going to an event.",
  " is interested in an event.",
  " followed ",
  " are now friends.",
  " like "
];
function replacePost(child, text) {
  const para = document.createElement("p");
  para.style.margin = "4px 16px";
  const node = document.createTextNode(text);
  para.appendChild(node);
  child.parentNode.replaceChild(para, child);
  console.log(`replaced a post with ${text}`);
}
// const removePost = child => child.parentNode.removeChild(child);
function friendlyFeed() {
  // "Suggested Post"
  Array.from(document.getElementsByClassName("_m8d")).forEach(x => {
    const child = x.parentElement.parentElement.parentElement.parentElement;
    replacePost(child, 'suggested post');
  });
  // "Suggested Post" and "A Video You May Like"
  Array.from(document.getElementsByClassName("_5g-l")).forEach(x => {
    const child = x.parentElement.parentElement.parentElement;
    replacePost(child, 'suggested post2');
  });
  // "Sponsored"
  Array.from(document.getElementsByClassName("o_niairssnk")).forEach(x => {
    const child = x.closest("._5pcr.userContentWrapper");
    replacePost(child, 'sponsored post');
  });
  // Anything with a text section above the post ("Suggested for you")
  Array.from(document.getElementsByClassName("p_niairspyz")).forEach(x => {
    const child = x.parentElement.parentElement.parentElement;
    replacePost(child, x.textContent);
  });
  // Keywords
  Array.from(document.getElementsByClassName("fwn fcg")).forEach(x => {
    const text = x.firstChild.textContent;
    if (firstKeywords.some(v => text.indexOf(v) >= 0)) {
      const p = x.parentElement.parentElement.parentElement;
      if (!p.className.includes("_42ef")) {
        replacePost(p.parentElement, `(${text})`);
      }
    } else if (secondKeywords.some(v => text.indexOf(v) >= 0)) {
      const child = x.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.parentElement.parentElement.parentElement
        .parentElement.parentElement.parentElement;
      replacePost(child, text);
    }
  });
}
friendlyFeed();
setInterval(friendlyFeed, 3000);
