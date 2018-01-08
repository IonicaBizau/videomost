const { BrowserWindow, app } = require("electron")
    , path = require("path")
    , url = require("url")

let mainWindow

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 800
      , height: 600
      , frame: false
      , resizable: true
      , alwaysOnTop: true
    })
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true,
    }))

    // Emitted when the window is closed.
    mainWindow.on("closed", () => {
        mainWindow = null
    })
}

app.on("ready", createWindow)
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit()
    }
})

app.on("activate", () => {
    if (mainWindow === null) {
        createWindow()
    }
})
