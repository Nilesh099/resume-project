import { useContext } from 'react'
import { Button } from '@/components/ui/button'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useTheme } from '@/hooks/useTheme'
import { useParams } from 'react-router-dom'
import LocalStorageApi from './../../../../service/LocalStorageApi'
import { Palette, Undo, Redo } from 'lucide-react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

function EnhancedThemeSelector({ undoRedo }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const { currentTheme, theme, themes, selectedColor, switchTheme, setColor } = useTheme()
  const { resumeId } = useParams()
  const { undo, redo, canUndo, canRedo } = undoRedo || {}

  const onColorSelect = (color) => {
    setColor(color)
    const updatedInfo = { ...resumeInfo, themeColor: color }
    setResumeInfo(updatedInfo)
    
    // Save to localStorage
    const data = { data: { themeColor: color } }
    LocalStorageApi.UpdateResumeDetail(resumeId, data)
  }

  const onThemeSelect = (themeName) => {
    switchTheme(themeName)
    const newColor = themes[themeName].colors[0]
    const updatedInfo = { ...resumeInfo, themeColor: newColor }
    setResumeInfo(updatedInfo)
    
    // Save to localStorage
    const data = { data: { themeColor: newColor } }
    LocalStorageApi.UpdateResumeDetail(resumeId, data)
  }

  return (
    <div className="flex gap-2">
      {/* Undo/Redo Buttons */}
      {/* {undoRedo && (
        <>
          <Button
            variant="outline"
            size="sm"
            onClick={undo}
            disabled={!canUndo}
            title="Undo (Ctrl+Z)"
          >
            <Undo className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={redo}
            disabled={!canRedo}
            title="Redo (Ctrl+Y)"
          >
            <Redo className="w-4 h-4" />
          </Button>
        </>
      )} */}

      {/* Theme Selector */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm">
            <Palette className="w-4 h-4 mr-1" />
            Themes
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <div>
              <h3 className="font-medium text-sm mb-2">Theme Style</h3>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(themes).map(([key, themeData]) => (
                  <Button
                    key={key}
                    variant={currentTheme === key ? "default" : "outline"}
                    size="sm"
                    onClick={() => onThemeSelect(key)}
                    className="text-xs"
                  >
                    {themeData.name}
                  </Button>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-sm mb-2">Colors</h3>
              <div className="flex flex-wrap gap-2">
                {theme.colors.map((color, index) => (
                  <div
                    key={index}
                    className={`w-8 h-8 rounded-full cursor-pointer border-2 transition-all ${
                      selectedColor === color ? 'border-gray-800 scale-110' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => onColorSelect(color)}
                  />
                ))}
              </div>
            </div>

            <div className="text-xs text-gray-500">
              Current: {theme.name} • {selectedColor}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default EnhancedThemeSelector
