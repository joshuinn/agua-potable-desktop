import { app, BrowserWindow, ipcMain, session } from "electron";
import path from "path";
import url from "url";
import fs from "fs";

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
    },
  });

  if (process.env.NODE_ENV === "development") {
    const rendererPort = process.argv[2];
    const devServerURL = `http://localhost:${rendererPort}`;

    mainWindow.loadURL(devServerURL);
  } else {
    const htmlPath = url.format({
      pathname: path.join(app.getAppPath(), "..", "renderer", "index.html"),
      protocol: "file:",
      slashes: true,
    });
    console.log(
      "Ruta del archivo preload:",
      path.join(__dirname, "preload.js")
    );
    console.log("Ruta del archivo index.html:", htmlPath);

    if (
      !fs.existsSync(
        path.join(app.getAppPath(), "..", "renderer", "index.html")
      )
    ) {
      console.error("El archivo index.html no existe en la ruta:", htmlPath);
    } else {
      try {
        mainWindow.loadURL(htmlPath).catch((err) => {
          console.error(
            "Error al cargar el archivo HTML:",
            err.message || "Error desconocido."
          );
        });
      } catch (err) {
        console.error("Excepción al cargar el archivo HTML:", err);
      }
    }
  }

  if (process.env.NODE_ENV === "development") {
    //mainWindow.webContents.openDevTools();
  }
  mainWindow.webContents.on(
    "did-fail-load",
    (event, errorCode, errorDescription, validatedURL) => {
      const mensajeError =
        errorDescription && errorDescription.trim()
          ? errorDescription
          : "Error desconocido o descripción vacía.";

      console.error("Error al cargar la ventana principal:", mensajeError);
      console.log("Código de error:", errorCode);
      console.log("URL validada:", validatedURL || "No se proporcionó URL.");
      console.log("Detalles del evento:", event);
    }
  );

  ipcMain.on("close-app", () => {
    app.quit();
  });
}

app.whenReady().then(() => {
  createWindow();

  session.defaultSession.webRequest.onBeforeRequest((details, callback) => {
    //console.log("Solicitud de recurso:", details.url);
    callback({ cancel: false });
  });
  // session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
  //   callback({
  //     responseHeaders: {
  //       ...details.responseHeaders,
  //       "Content-Security-Policy": ["script-src 'self'"],
  //     },
  //   });
  // });

  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", function () {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.on("message", (event, message) => {
  console.log(message);
});
