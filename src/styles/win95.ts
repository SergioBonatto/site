// Win95 component styles for reuse across the project
export const WIN95_COLORS = {
  background: '#008080', // Teal background
  windowBg: '#c0c0c0',   // Window gray
  titleBarBg: 'linear-gradient(to right, #0000aa, #4488dd)', // Blue gradient
  terminalBg: '#000000', // Black terminal
  terminalText: '#00ff00', // Green terminal text
} as const;

export const WIN95_BORDERS = {
  raised: "border-t-white border-l-white border-r-gray-800 border-b-gray-800",
  sunken: "border-t-gray-800 border-l-gray-800 border-r-white border-b-white",
  window: "border-2 border-gray-600",
} as const;

export const WIN95_CLASSES = {
  // Window frame
  window: `bg-gray-300 ${WIN95_BORDERS.window}`,
  windowRaised: `bg-gray-300 border-2 ${WIN95_BORDERS.raised}`,

  // Title bar
  titleBar: "bg-gradient-to-r from-blue-800 to-blue-600 px-3 py-1 flex items-center justify-between",
  titleBarIcon: "w-4 h-4 bg-white border border-gray-400 flex items-center justify-center text-xs",
  titleBarText: "text-white text-sm font-bold",

  // Window buttons (minimize, maximize, close)
  windowButton: `w-4 h-4 bg-gray-300 border border-gray-600 text-xs flex items-center justify-center ${WIN95_BORDERS.raised}`,

  // Terminal/DOS prompt styles
  terminal: `bg-black p-4 font-mono text-green-400 min-h-[500px] border-2 ${WIN95_BORDERS.sunken}`,
  terminalPrompt: "text-white",
  terminalCommand: "text-yellow-300",
  terminalOutput: "text-gray-300",
  terminalText: "text-green-400",

  // Buttons
  button: `px-3 py-1 bg-gray-300 text-black border-2 ${WIN95_BORDERS.raised}`,
  buttonPressed: `px-3 py-1 bg-gray-300 text-black border-2 ${WIN95_BORDERS.sunken}`,
} as const;

// Inline styles for complex borders (when Tailwind classes aren't enough)
export const WIN95_INLINE_STYLES = {
  windowRaised: {
    borderTopColor: '#ffffff',
    borderLeftColor: '#ffffff',
    borderRightColor: '#808080',
    borderBottomColor: '#808080'
  },
  windowSunken: {
    borderTopColor: '#808080',
    borderLeftColor: '#808080',
    borderRightColor: '#ffffff',
    borderBottomColor: '#ffffff'
  }
} as const;
