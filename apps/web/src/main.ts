// import('./bootstrap')
// 	.catch(err => console.error(err));
import { initFederation } from "@angular-architects/native-federation";

initFederation("/federation.manifest.json")
  .catch((err) => console.error("Federation init error:", err))
  .then(() => import("./bootstrap"))
  .catch((err) => console.error("Bootstrap error:", err));
