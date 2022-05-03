Hooks.once('ready', () => {
libWrapper.register('multiline-chat-macros', 'Macro.prototype.execute', async function(wrapped, ...args) { 
if (this.data.type === "script") return wrapped(...args);
let messages = this.data.command.split('\n/').map((e, i)=>{ if (e.trim().at(0)!=="/" && i>0) return "/"+e; else return e;})
  for (let m of messages)
    ui.chat.processMessage(m).catch(err => {
      Hooks.onError("Macro#_executeChat", err, {
        msg: "There was an error in your chat message syntax.",
        log: "error",
        notify: "error",
        command: this.data.command
      });
    });
}, libWrapper.OVERRIDE);
});