"use client"

import { useState } from "react"
import { Monitor, Smartphone, Tablet, Laptop } from "lucide-react"

const breakpoints = [
  { name: "Mobile", width: 375, height: 667, icon: Smartphone, description: "iPhone SE" },
  { name: "Mobile Large", width: 414, height: 896, icon: Smartphone, description: "iPhone 11 Pro Max" },
  { name: "Tablet", width: 768, height: 1024, icon: Tablet, description: "iPad" },
  { name: "Tablet Large", width: 1024, height: 768, icon: Tablet, description: "iPad Pro" },
  { name: "Laptop", width: 1366, height: 768, icon: Laptop, description: "Standard Laptop" },
  { name: "Desktop", width: 1920, height: 1080, icon: Monitor, description: "Full HD Desktop" },
]

const testPages = [
  { name: "Dashboard", path: "/" },
  { name: "About", path: "/home" },
  { name: "Services", path: "/services" },
  { name: "Resources", path: "/resources" },
  { name: "Team", path: "/team" },
  { name: "Get Involved", path: "/get-involved" },
  { name: "Contact", path: "/contact" },
  { name: "Report Incident", path: "/report-incident" },
  { name: "Admin Panel", path: "/admin" },
]

export default function ResponsiveTestPage() {
  const [selectedBreakpoint, setSelectedBreakpoint] = useState(breakpoints[0])
  const [selectedPage, setSelectedPage] = useState(testPages[0])
  const [showGrid, setShowGrid] = useState(false)

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Responsive Design Testing</h1>
          <p className="text-lg text-gray-600">
            Test the responsive design of Digishield platform across different screen sizes and devices.
          </p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Device Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Device</h3>
              <div className="grid grid-cols-2 gap-3">
                {breakpoints.map((breakpoint) => (
                  <button
                    key={breakpoint.name}
                    onClick={() => setSelectedBreakpoint(breakpoint)}
                    className={`p-3 rounded-lg border-2 transition-colors text-left ${
                      selectedBreakpoint.name === breakpoint.name
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center mb-2">
                      <breakpoint.icon className="h-5 w-5 mr-2" />
                      <span className="font-medium">{breakpoint.name}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {breakpoint.width} × {breakpoint.height}
                    </div>
                    <div className="text-xs text-gray-500">{breakpoint.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Page Selection */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Select Page</h3>
              <div className="space-y-2">
                {testPages.map((page) => (
                  <button
                    key={page.name}
                    onClick={() => setSelectedPage(page)}
                    className={`w-full p-3 rounded-lg border text-left transition-colors ${
                      selectedPage.name === page.name
                        ? "border-blue-500 bg-blue-50 text-blue-700"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <div className="font-medium">{page.name}</div>
                    <div className="text-sm text-gray-500">{page.path}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Controls */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showGrid}
                    onChange={(e) => setShowGrid(e.target.checked)}
                    className="mr-2"
                  />
                  <span className="text-sm">Show Grid Overlay</span>
                </label>
              </div>
              <div className="text-sm text-gray-600">
                Current: {selectedBreakpoint.name} ({selectedBreakpoint.width}×{selectedBreakpoint.height})
              </div>
            </div>
          </div>
        </div>

        {/* Device Frame */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              {selectedPage.name} - {selectedBreakpoint.name}
            </h3>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                {selectedBreakpoint.width} × {selectedBreakpoint.height}
              </span>
              <a
                href={selectedPage.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Open in New Tab →
              </a>
            </div>
          </div>

          {/* Device Frame */}
          <div className="flex justify-center">
            <div
              className="relative border-8 border-gray-800 rounded-lg overflow-hidden shadow-2xl"
              style={{
                width: Math.min(selectedBreakpoint.width + 16, window.innerWidth - 100),
                height: Math.min(selectedBreakpoint.height + 16, window.innerHeight - 300),
              }}
            >
              {/* Grid Overlay */}
              {showGrid && (
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(255, 0, 0, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255, 0, 0, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: "20px 20px",
                  }}
                />
              )}

              {/* Iframe */}
              <iframe
                src={selectedPage.path}
                className="w-full h-full border-none"
                style={{
                  width: selectedBreakpoint.width,
                  height: selectedBreakpoint.height,
                  transform: `scale(${Math.min(
                    (window.innerWidth - 100) / selectedBreakpoint.width,
                    (window.innerHeight - 300) / selectedBreakpoint.height,
                    1,
                  )})`,
                  transformOrigin: "top left",
                }}
                title={`${selectedPage.name} - ${selectedBreakpoint.name}`}
              />
            </div>
          </div>
        </div>

        {/* Responsive Testing Checklist */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Responsive Testing Checklist</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Layout & Structure</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Navigation collapses on mobile</li>
                <li>✓ Content stacks vertically on small screens</li>
                <li>✓ Images scale appropriately</li>
                <li>✓ Text remains readable at all sizes</li>
                <li>✓ No horizontal scrolling</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Interactive Elements</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Buttons are touch-friendly (44px min)</li>
                <li>✓ Forms work on mobile devices</li>
                <li>✓ Tabs scroll horizontally on mobile</li>
                <li>✓ Modals fit within viewport</li>
                <li>✓ Hover states work on touch devices</li>
              </ul>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">Performance & UX</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ Fast loading on mobile networks</li>
                <li>✓ Smooth scrolling and animations</li>
                <li>✓ Proper focus management</li>
                <li>✓ Accessible on all devices</li>
                <li>✓ Works without JavaScript</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Breakpoint Information */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold mb-4">Tailwind CSS Breakpoints</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 px-4">Breakpoint</th>
                  <th className="text-left py-2 px-4">Min Width</th>
                  <th className="text-left py-2 px-4">CSS</th>
                  <th className="text-left py-2 px-4">Description</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-b">
                  <td className="py-2 px-4 font-medium">sm</td>
                  <td className="py-2 px-4">640px</td>
                  <td className="py-2 px-4 font-mono text-xs">@media (min-width: 640px)</td>
                  <td className="py-2 px-4">Small devices (landscape phones)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-medium">md</td>
                  <td className="py-2 px-4">768px</td>
                  <td className="py-2 px-4 font-mono text-xs">@media (min-width: 768px)</td>
                  <td className="py-2 px-4">Medium devices (tablets)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-medium">lg</td>
                  <td className="py-2 px-4">1024px</td>
                  <td className="py-2 px-4 font-mono text-xs">@media (min-width: 1024px)</td>
                  <td className="py-2 px-4">Large devices (desktops)</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 px-4 font-medium">xl</td>
                  <td className="py-2 px-4">1280px</td>
                  <td className="py-2 px-4 font-mono text-xs">@media (min-width: 1280px)</td>
                  <td className="py-2 px-4">Extra large devices</td>
                </tr>
                <tr>
                  <td className="py-2 px-4 font-medium">2xl</td>
                  <td className="py-2 px-4">1536px</td>
                  <td className="py-2 px-4 font-mono text-xs">@media (min-width: 1536px)</td>
                  <td className="py-2 px-4">2X large devices</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Testing Instructions */}
        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Testing Instructions</h3>
          <div className="space-y-4 text-blue-800">
            <div>
              <h4 className="font-medium mb-2">1. Device Testing</h4>
              <p className="text-sm">
                Use the device selector above to test different screen sizes. Pay attention to layout changes,
                navigation behavior, and content readability.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">2. Browser Developer Tools</h4>
              <p className="text-sm">
                Press F12 and use the device toolbar to test responsive design. Try different devices and orientations.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">3. Real Device Testing</h4>
              <p className="text-sm">
                Test on actual devices when possible. Touch interactions, scrolling, and performance can vary
                significantly between simulated and real devices.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">4. Network Conditions</h4>
              <p className="text-sm">
                Test with different network speeds, especially on mobile devices. Use browser dev tools to simulate slow
                connections.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
