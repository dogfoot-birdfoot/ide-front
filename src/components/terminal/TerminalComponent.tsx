import React, { useEffect, useRef } from "react"
import { Terminal } from "xterm"
import "xterm/css/xterm.css"

const xtermjsTheme = {
  foreground: "#F8F8F8",
  background: "#2e3235",
  selectionBackground: "#5DA5D533",
  selectionInactiveBackground: "#555555AA"
}

const TerminalComponent: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    console.log("useEffect - Component Mounted")

    const terminal = new Terminal({
      cursorBlink: true,
      convertEol: true,
      theme: xtermjsTheme
    })

    console.log("Terminal instance created")

    if (terminalRef.current) {
      console.log("terminalRef.current is not null, opening terminal")

      terminal.open(terminalRef.current)
      terminal.focus()
      console.log("Terminal opened and focused")

      terminal.onData(data => {
        console.log(`Data received: ${data}`)
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
    } else {
      console.log("terminalRef.current is null")
    }

    return () => {
      console.log("Cleaning up terminal instance")
      terminal.dispose()
    }
  }, [])

  return (
    <div>
      <div className="pl-5" style={{ background: "#2e3235", height: "200px", overflowY: "auto" }} ref={terminalRef} />
    </div>
  )
}

export default TerminalComponent
