import { useContext, useState } from 'react'
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { Button } from '@/components/ui/button'
import { LayoutGrid, Sun, Moon } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import LocalStorageApi from './../../../../service/LocalStorageApi'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'

function ThemeColor() {
    const colors=[
        "#FF5733", "#33FF57", "#3357FF", "#FF33A1", "#A133FF",
        "#33FFA1", "#FF7133", "#71FF33", "#7133FF", "#FF3371",
        "#33FF71", "#3371FF", "#A1FF33", "#33A1FF", "#FF5733",
        "#5733FF", "#33FF5A", "#5A33FF", "#FF335A", "#335AFF"
    ]

    const themeTypes = [
        {
            id: 'modern',
            name: 'Modern/Light',
            icon: Sun,
            description: 'Clean and minimal design',
            bgColor: 'bg-white',
            textColor: 'text-gray-900',
            previewBg: '#ffffff'
        },
        {
            id: 'classic',
            name: 'Classic/Dark',
            icon: Moon,
            description: 'Professional dark theme',
            bgColor: 'bg-gray-900',
            textColor: 'text-white',
            previewBg: '#1f2937'
        }
    ]

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const [selectedColor,setSelectedColor]=useState(resumeInfo?.themeColor || "#3b82f6");
    const [selectedThemeType,setSelectedThemeType]=useState(resumeInfo?.themeType || 'modern');
    const {resumeId}=useParams();
    
    const onColorSelect=(color)=>{
        setSelectedColor(color)
        updateTheme(color, selectedThemeType);
    }

    const onThemeTypeSelect=(themeType)=>{
        setSelectedThemeType(themeType)
        updateTheme(selectedColor, themeType);
    }

    const updateTheme = (color, themeType) => {
        setResumeInfo({
            ...resumeInfo,
            themeColor: color,
            themeType: themeType
        });
        const data={
            data:{
                themeColor: color,
                themeType: themeType
            }
        }
        LocalStorageApi.UpdateResumeDetail(resumeId,data).then(resp=>{
            toast('Theme Updated Successfully')
        })
    }

  return (
    <Popover>
  <PopoverTrigger asChild>
  <Button variant="outline" size="sm" 
          className="flex gap-2" > <LayoutGrid/> Theme</Button>
  </PopoverTrigger>
  <PopoverContent className="w-80">
    <div className="space-y-4">
      {/* Theme Type Selection */}
      <div>
        <h3 className='mb-3 text-sm font-bold'>Theme Style</h3>
        <div className='grid grid-cols-1 gap-2'>
          {themeTypes.map((theme) => {
            const IconComponent = theme.icon;
            return (
              <div
                key={theme.id}
                onClick={() => onThemeTypeSelect(theme.id)}
                className={`p-3 rounded-lg cursor-pointer border-2 transition-all hover:shadow-md ${
                  selectedThemeType === theme.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${theme.bgColor} ${theme.textColor}`}>
                    <IconComponent className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{theme.name}</p>
                    <p className="text-xs text-gray-500">{theme.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Color Selection */}
      <div>
        <h3 className='mb-3 text-sm font-bold'>Accent Color</h3>
        <div className='grid grid-cols-5 gap-3'>
          {colors.map((item,index)=>(
            <div 
              key={index}
              onClick={()=>onColorSelect(item)}
              className={`h-8 w-8 rounded-full cursor-pointer
               hover:border-black border-2 transition-all hover:scale-110
               ${selectedColor==item ? 'border-black scale-110' : 'border-gray-300'}
               `}
              style={{
                background:item
              }}
            >
            </div>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div>
        <h3 className='mb-3 text-sm font-bold'>Preview</h3>
        <div 
          className="p-4 rounded-lg border"
          style={{
            backgroundColor: themeTypes.find(t => t.id === selectedThemeType)?.previewBg
          }}
        >
          <div 
            className="h-2 rounded mb-2"
            style={{ backgroundColor: selectedColor }}
          ></div>
          <div className={`text-xs ${themeTypes.find(t => t.id === selectedThemeType)?.textColor}`}>
            Sample resume text with {themeTypes.find(t => t.id === selectedThemeType)?.name.toLowerCase()} theme
          </div>
        </div>
      </div>
    </div>
  </PopoverContent>
</Popover>
  )
}

export default ThemeColor