(() => {
  // ES内置对象
  let a: String = "string";
  let b: Boolean = new Boolean(1);
  let e: Error = new Error("Error occurred");
  let d: Date = new Date();
  let r: RegExp = /[a-z]/;

  // DOM 和 BOM 的内置对象
  // 有 Document、HTMLElement、Event、NodeList 等
  let doc: Document = document; // 文档类型
  let body: HTMLElement = document.body; // HTML元素类型
  let head: HTMLElement = document.head;
  let allDiv: NodeList = document.querySelectorAll("div");

  console.log("doc:", doc);
  console.log("body: ");
  console.dir(body);

  console.log("allDiv:", allDiv);

  document.addEventListener("click", function (e: Event) {
    // Do something
    console.log(e);
  });
})();
