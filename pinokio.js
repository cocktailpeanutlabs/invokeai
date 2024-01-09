const path = require("path")
module.exports = {
  version: 1,
  title: "InvokeAI",
  description: "Generative AI for Professional Creatives",
  icon: "icon.jpeg",
  menu: async (kernel) => {
    let installing = kernel.running(__dirname, "install.json")
    let installed = await kernel.exists(__dirname, "app", "env")
    if (installing) {
      return [{ icon: "fa-solid fa-plug", text: "Installing...", href: "install.json" }]
    } else if (installed) {
      let running = kernel.running(__dirname, "start.json")
      if (running) {
        let memory = kernel.memory.local[path.resolve(__dirname, "start.json")]
        if (memory && memory.url) {
          return [
            { icon: "fa-solid fa-rocket", text: "Web UI", href: memory.url },
            { icon: "fa-solid fa-terminal", text: "Terminal", href: "start.json" },
            { icon: "fa-solid fa-rotate", text: "Update", href: "update.json" },
          ]
        } else {
          return [
            { icon: "fa-solid fa-terminal", text: "Terminal", href: "start.json" },
            { icon: "fa-solid fa-rotate", text: "Update", href: "update.json" },
          ]
        }
      } else {
        return [{
          icon: "fa-solid fa-power-off",
          text: "Start",
          href: "start.json",
        }, {
          icon: "fa-solid fa-rotate", text: "Update", href: "update.json"
        }, {
          icon: "fa-solid fa-plug", text: "Reinstall", href: "install.json"
        }, {
          icon: "fa-solid fa-broom", text: "Factory Reset", href: "reset.json"
        }]
      }
    } else {
      return [
        { icon: "fa-solid fa-plug", text: "Install", href: "install.json" },
        { icon: "fa-solid fa-rotate", text: "Update", href: "update.json" }
      ]
    }
  }
}
