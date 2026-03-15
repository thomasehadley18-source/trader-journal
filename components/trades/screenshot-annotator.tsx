"use client"

import { useRef } from "react"
import { ReactSketchCanvas } from "react-sketch-canvas"

export default function ScreenshotAnnotator({image}:{image:string}){

const canvasRef:any = useRef(null)

function clear(){
canvasRef.current?.clearCanvas()
}

function undo(){
canvasRef.current?.undo()
}

return(

<div>

<div style={{position:"relative"}}>

<img
src={image}
style={{
width:"100%",
borderRadius:8
}}
/>

<div
style={{
position:"absolute",
top:0,
left:0,
right:0,
bottom:0
}}
>

<ReactSketchCanvas
ref={canvasRef}
strokeWidth={3}
strokeColor="red"
canvasColor="transparent"
/>

</div>

</div>

<div style={{marginTop:10}}>

<button onClick={undo}>Undo</button>

<button
onClick={clear}
style={{marginLeft:10}}
>
Clear
</button>

</div>

</div>

)

}
