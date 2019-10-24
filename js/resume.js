const url = "/doc/BlessingSanusi_Resume.pdf";

let pdfDoc = null,
  pageNum = 1,
  pageIsRendering = false,
  pageNumIsPending = null;

const scale = 2.0,
  canvas = document.querySelector("#pdf-render"),
  ctx = canvas.getContext("2d");

//Rendering the page
const renderPage = num => {
  pageIsRendering = true;

  //Get page
  pdfDoc.getPage(num).then(page => {
    // console.log(page);
    const viewport = page.getViewport({
      scale
    });
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    const renderCtx = {
      canvasContext: ctx,
      viewport
    };

    page.render(renderCtx).promise.then(() => {
      pageIsRendering = false;

      if (pageNumIsPending !== null) {
        renderPage(pageNumIsPending);
        pageNumIsPending = null;
      }
    });

    //output current page
    // document.querySelector("#page-num").textContent = num;
  });
};

//Check for pages rendering
const queueRenderPage = num => {
  if (pageIsRendering) {
    pageNumIsPending = num;
  } else {
    renderPage(num);
  }
};

//show Previous page
const showPrevPage = () => {
  if (pageNum <= 1) {
    return;
  }
  pageNum--;
  queueRenderPage(pageNum);
};

//show Next page
const showNextPage = () => {
  if (pageNum >= pdfDoc.numPages) {
    return;
  }
  pageNum++;
  queueRenderPage(pageNum);
};

//Get Document
pdfjsLib.getDocument(url).promise.then(pdfDoc_ => {
  pdfDoc = pdfDoc_;
  //   console.log(pdfDoc);
  //   document.querySelector("#page-count").textContent = pdfDoc.numPages;

  renderPage(pageNum);
});
//   .catch(err => {
//     const div = document.createElement("div");
//     div.className = "error";
//     div.appendChild(document.createTextNode(err.message));
//     document.querySelector("body").insertBefore(div, canvas);

//     //Remove top bar
//     document.querySelector(".top-bar").style.display = "none";
//   });

//button Events
document.querySelector("#resume").addEventListener("click", renderPage);

// document.querySelector("#prev-page").addEventListener("click", showPrevPage);

// document.querySelector("#next-page").addEventListener("click", showNextPage);