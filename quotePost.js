var quoteTweetInit = function quoteTweetInit() {
    var mutationObserver = new window.MutationObserver(mutations);
    mutationObserver.observe(document.querySelector('.columns-area__panels__main'), {
      childList: true,
      attributes: false,
      subtree: true
    });
  
    function createEmbed(src, node) {
      var iframe = document.createElement("iframe");
      iframe.setAttribute("src", src + "/embed");
      iframe.setAttribute("scrolling", "no");
      iframe.setAttribute("frameborder", "0");
      iframe.style.width = "100%";
      iframe.style.marginBlock = "0.75em";
      iframe.style.border = "none";
      iframe.style.overflow = "hidden";
      node.querySelector('.status__content').appendChild(iframe);
      iframe.addEventListener("load", () => {
        iframe.style.height = iframe.contentWindow.document.documentElement.scrollHeight + 'px';
      });
    }
  
    function mutations(mutationsList) {
      mutationsList.forEach(function (mutation) {
        var nodes = mutation.addedNodes;
        nodes.forEach(function (node) {
          const quotedPost = node.querySelector(".status-link[href^='https://'][href*='/@']");
          if (quotedPost) {
            createEmbed(quotedPost.getAttribute('href'), node);
            quotedPost.remove();
          }
        });
      });
    }
  };
  
  quoteTweetInit();