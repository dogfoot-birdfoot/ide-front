import React, { useEffect, useRef } from "react"
import { Terminal } from "xterm"
import "xterm/css/xterm.css"
import { FitAddon } from "@xterm/addon-fit"

const TerminalComponent: React.FC = React.memo(() => {
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const terminal = new Terminal({
      cursorBlink: true,
      convertEol: true
    })
    const fitAddon = new FitAddon()

    requestAnimationFrame(() => {
      if (terminalRef.current) {
        terminal.loadAddon(fitAddon)
        terminal.open(terminalRef.current)
        fitAddon.fit()
        terminal.focus()

        terminal.onData(data => {
          if (data.charCodeAt(0) === 13) {
            terminal.write("\r\n$ ")
          } else if (data.charCodeAt(0) === 127) {
            const cursorX = terminal.buffer.active.cursorX - 1
            if (cursorX >= 0) {
              terminal.write("\b \b")
            }
          } else {
            terminal.write(data)
          }
        })
        terminal.writeln("Hello from xterm.js")
      }
    })

    return () => {
      terminal.dispose()
    }
  }, [])

  return (
    <div className="text-white pl-5 bg-black">
      <div ref={terminalRef} />
    </div>
  )
})

TerminalComponent.displayName = "TerminalComponent"

export default TerminalComponent
