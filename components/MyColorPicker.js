import React from 'react'

import { ColorPicker, createColor } from "material-ui-color"

export default function MyColorPicker(props) {
  const [color, setColor] = React.useState(null)

  React.useEffect(() => {
    if (!color || props.value !== `#${color.hex}`) {
      setColor(createColor(props.value || '#000'))
    }
  }, [props.value])

  const handleNewColor = (color) => {
    props.onChange(`#${color.hex}`)
    setColor(color)
  }

  return (
   <ColorPicker value={color} hideTextfield onChange={handleNewColor}/>
  )
}