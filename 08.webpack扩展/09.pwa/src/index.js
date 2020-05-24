import "./index.css";

import(/* webpackChunkName: "math" */ "./math").then().catch();

console.log("index.js文件加载了~~~~");

// 注册 servise worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
