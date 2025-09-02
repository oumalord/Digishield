"use client"

import { useState, useEffect } from "react"
import { Eye, EyeOff } from "lucide-react"

interface ViewportSize {
  width: number
  height: number
}

const commonViewports = [
  { name: "iPhone SE", width: 375, height: 667, category: "mobile" },
  { name: "iPhone 12", width: 390, height: 844, category: "mobile" },
  { name: "iPhone 12 Pro Max", width: 428, height: 926, category: "mobile" },
  { name: "Samsung Galaxy S21", width: 384, height: 854, category: "mobile" },
  { name: "iPad Mini", width: 768, height: 1024, category: "tablet" },
  { name: "iPad Pro", width: 1024, height: 1366, category: "tablet" },
  { name: "MacBook Air", width: 1440, height: 900, category: "desktop" },
  { name: "Desktop HD", width: 1920, height: 1080, category: "desktop" },
]

export default function ResponsiveTestWidget() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentViewport, setCurrentViewport] = useState<ViewportSize>({ width: 0, height: 0 })
  const [selectedViewport, setSelectedViewport] = useState(commonViewports[0])

  useEffect(() => {
    const updateViewport = () => {
      setCurrentViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }

    updateViewport()
    window.addEventListener("resize", updateViewport)
    return () => window.removeEventListener("resize", updateViewport)
  }, [])

  const getBreakpointInfo = (width: number) => {
    if (width < 640) return { name: "xs", color: "bg-red-500", description: "Extra Small" }
    if (width < 768) return { name: "sm", color: "bg-orange-500", description: "Small" }
    if (width < 1024) return { name: "md", color: "bg-yellow-500", description: "Medium" }
    if (width < 1280) return { name: "lg", color: "bg-green-500", description: "Large" }
    if (width < 1536) return { name: "xl", color: "bg-blue-500", description: "Extra Large" }
    return { name: "2xl", color: "bg-purple-500", description: "2X Large" }
  }

  const breakpoint = getBreakpointInfo(currentViewport.width)

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 z-50 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        title="Show Responsive Test Widget"
      >
        <Eye className="h-5 w-5" />
      </button>
    )
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Responsive Test</h3>
        <button onClick={() => setIsVisible(false)} className="text-gray-400 hover:text-gray-600" title="Hide Widget">
          <EyeOff className="h-4 w-4" />
        </button>
      </div>

      {/* Current Viewport Info */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Current Viewport</span>
          <div className={`px-2 py-1 rounded text-xs text-white ${breakpoint.color}`}>{breakpoint.name}</div>
        </div>
        <div className="text-sm text-gray-600">
          {currentViewport.width} × {currentViewport.height}
        </div>
        <div className="text-xs text-gray-500">{breakpoint.description}</div>
      </div>

      {/* Breakpoint Indicators */}
      <div className="mb-4">
        <div className="text-sm font-medium mb-2">Tailwind Breakpoints</div>
        <div className="space-y-1">
          {[
            { name: "sm", min: 640, color: "bg-orange-500" },
            { name: "md", min: 768, color: "bg-yellow-500" },
            { name: "lg", min: 1024, color: "bg-green-500" },
            { name: "xl", min: 1280, color: "bg-blue-500" },
            { name: "2xl", min: 1536, color: "bg-purple-500" },
          ].map((bp) => (
            <div key={bp.name} className="flex items-center justify-between text-xs">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-2 ${bp.color}`} />
                <span>{bp.name}</span>
              </div>
              <span className="text-gray-500">{bp.min}px+</span>
              <span className={currentViewport.width >= bp.min ? "text-green-600" : "text-gray-400"}>
                {currentViewport.width >= bp.min ? "✓" : "✗"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Common Device Sizes */}
      <div className="mb-4">
        <div className="text-sm font-medium mb-2">Test Common Devices</div>
        <div className="grid grid-cols-2 gap-2">
          {commonViewports.slice(0, 6).map((viewport) => (
            <button
              key={viewport.name}
              onClick={() => {
                // This would typically open in a new window or iframe
                window.open(
                  window.location.href,
                  "_blank",
                  `width=${viewport.width},height=${viewport.height},scrollbars=yes,resizable=yes`,
                )
              }}
              className="p-2 text-xs border border-gray-200 rounded hover:bg-gray-50 text-left"
            >
              <div className="font-medium truncate">{viewport.name}</div>
              <div className="text-gray-500">
                {viewport.width}×{viewport.height}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-2">
        <button
          onClick={() => window.open("/responsive-test", "_blank")}
          className="w-full bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors"
        >
          Open Full Test Suite
        </button>
        <button
          onClick={() => {
            const userAgent = navigator.userAgent
            const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)
            alert(`Device Type: ${isMobile ? "Mobile" : "Desktop"}\nUser Agent: ${userAgent}`)
          }}
          className="w-full bg-gray-600 text-white py-2 px-3 rounded text-sm hover:bg-gray-700 transition-colors"
        >
          Device Info
        </button>
      </div>

      {/* Responsive Issues Detector */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="text-sm font-medium mb-2">Quick Checks</div>
        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span>Horizontal Scroll</span>
            <span className={document.body.scrollWidth > window.innerWidth ? "text-red-600" : "text-green-600"}>
              {document.body.scrollWidth > window.innerWidth ? "⚠️ Yes" : "✓ No"}
            </span>
          </div>
          <div className="flex justify-between">
            <span>Touch Device</span>
            <span className="text-blue-600">{"ontouchstart" in window ? "✓ Yes" : "✗ No"}</span>
          </div>
          <div className="flex justify-between">
            <span>Viewport Meta</span>
            <span className={document.querySelector('meta[name="viewport"]') ? "text-green-600" : "text-red-600"}>
              {document.querySelector('meta[name="viewport"]') ? "✓ Present" : "⚠️ Missing"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
