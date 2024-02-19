import { FitAddon } from "@xterm/addon-fit"
import React, { useEffect, useRef } from "react"
import { Terminal } from "xterm"
import "xterm/css/xterm.css"

const TerminalComponent: React.FC = () => {
  const terminalRef = useRef<HTMLDivElement>(null) // 터미널을 위한 ref 생성

  useEffect(() => {
    const terminal = new Terminal({
      cursorBlink: true, // 커서 깜빡임 활성화
      convertEol: true
    })
    const fitAddon = new FitAddon()

    if (terminalRef.current) {
      terminal.loadAddon(fitAddon)
      terminal.open(terminalRef.current)
      fitAddon.fit()
      terminal.focus()

      // 터미널 입력 처리 예제
      terminal.onData(data => {
        if (data.charCodeAt(0) === 13) {
          terminal.write("\r\n$ ") // 새 줄에 프롬프트를 표시합니다.
        } else if (data.charCodeAt(0) === 127) {
          // 백스페이스 입력 처리
          const cursorX = terminal.buffer.active.cursorX - 1
          if (cursorX >= 0) {
            terminal.write("\b \b") // 백스페이스를 누르면 이전 문자를 지웁니다.
          }
        } else {
          terminal.write(data)
        }
      })

      // 터미널에 텍스트 출력 예제
      terminal.writeln("Hello from xterm.js")
    }

    return () => {
      terminal.dispose() // 컴포넌트 언마운트 시 터미널 인스턴스 정리
    }
  }, [])

  return (
    <div className=" pl-5 bg-black w-full">
      <div ref={terminalRef} />
    </div>
  )
}

export default TerminalComponent
