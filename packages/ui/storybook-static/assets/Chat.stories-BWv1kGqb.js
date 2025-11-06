import{j as e}from"./jsx-runtime-D7oVMqXx.js";import{r}from"./iframe-Dp89hhtQ.js";import{L as j}from"./Label-BHsjbZDl.js";import"./preload-helper-D9Z9MdNV.js";const k="Chat-module__chatContainer___BfqWM",w="Chat-module__label___lA9nQ",B="Chat-module__inputContainer___MBCAH",N="Chat-module__placeholderText___se2LH",H="Chat-module__input___9IPrF",E="Chat-module__bottomControls___fvSQy",D="Chat-module__leftButtonGroup___EHOCu",T="Chat-module__iconButton___Wczuu",q="Chat-module__sendButton___6Y4gm",l={chatContainer:k,label:w,inputContainer:B,placeholderText:N,input:H,bottomControls:E,leftButtonGroup:D,iconButton:T,sendButton:q},V="ModeModal-module__overlay___0i1h2",I="ModeModal-module__modal___yM8uh",z="ModeModal-module__modalHeader___7b8ZJ",L="ModeModal-module__modalTitle___fvHsN",R="ModeModal-module__closeButton___omwrb",O="ModeModal-module__modeOption___-9VlP",A="ModeModal-module__visuallyHidden___ivIxy",K="ModeModal-module__modeHeader___bJEdD",F="ModeModal-module__modeTitle___1Sq6B",P="ModeModal-module__checkIcon___jb1xr",G="ModeModal-module__modeDescription___p8fTE",a={overlay:V,modal:I,modalHeader:z,modalTitle:L,closeButton:R,modeOption:O,visuallyHidden:A,modeHeader:K,modeTitle:F,checkIcon:P,modeDescription:G},y=({isOpen:o,onClose:i,onModeSelect:C,selectedMode:u})=>{const p=r.useRef(null),d=r.useRef(null),h=r.useRef(null),g=r.useRef(null);if(r.useEffect(()=>{o&&d.current&&d.current.focus()},[o]),r.useEffect(()=>{const n=s=>{if(o){if(s.key==="Escape"){i();return}if(s.key==="Tab"){const c=p.current?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');if(c&&c.length>0){const t=c[0],S=c[c.length-1];s.shiftKey&&document.activeElement===t?(s.preventDefault(),S.focus()):!s.shiftKey&&document.activeElement===S&&(s.preventDefault(),t.focus())}}}};return document.addEventListener("keydown",n),()=>document.removeEventListener("keydown",n)},[o,i]),!o)return null;const m=n=>{C(n),i()},f=(n,s)=>{(n.key==="Enter"||n.key===" ")&&(n.preventDefault(),m(s))};return e.jsxs(e.Fragment,{children:[e.jsx("div",{className:a.overlay,onClick:i,"aria-hidden":"true"}),e.jsxs("div",{className:a.modal,ref:p,role:"dialog","aria-modal":"true","aria-labelledby":"modal-title","aria-describedby":"modal-description",children:[e.jsxs("div",{className:a.modalHeader,children:[e.jsx("h2",{id:"modal-title",className:a.modalTitle,children:"Select Response Mode"}),e.jsx("button",{ref:d,className:a.closeButton,onClick:i,"aria-label":"Close modal",children:e.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",children:e.jsx("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})})})]}),e.jsx("p",{id:"modal-description",className:a.visuallyHidden,children:"Choose between standard mode for detailed responses or fast mode for quick responses"}),e.jsxs("button",{ref:h,className:a.modeOption,onClick:()=>m("standard"),onKeyDown:n=>f(n,"standard"),"aria-pressed":u==="standard","aria-describedby":"standard-desc",children:[e.jsxs("div",{className:a.modeHeader,children:[e.jsx("span",{className:a.modeTitle,children:"Standard mode"}),u==="standard"&&e.jsx("svg",{className:a.checkIcon,viewBox:"0 0 24 24",fill:"currentColor","aria-label":"Selected",children:e.jsx("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})})]}),e.jsx("p",{id:"standard-desc",className:a.modeDescription,children:"More detailed responses with deeper analysis"})]}),e.jsxs("button",{ref:g,className:a.modeOption,onClick:()=>m("fast"),onKeyDown:n=>f(n,"fast"),"aria-pressed":u==="fast","aria-describedby":"fast-desc",children:[e.jsxs("div",{className:a.modeHeader,children:[e.jsx("span",{className:a.modeTitle,children:"Fast mode"}),u==="fast"&&e.jsx("svg",{className:a.checkIcon,viewBox:"0 0 24 24",fill:"currentColor","aria-label":"Selected",children:e.jsx("path",{d:"M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"})})]}),e.jsx("p",{id:"fast-desc",className:a.modeDescription,children:"Shorter responses, optimized for speed"})]})]})]})};try{y.displayName="ModeModal",y.__docgenInfo={description:"",displayName:"ModeModal",props:{isOpen:{defaultValue:null,description:"",name:"isOpen",required:!0,type:{name:"boolean"}},onClose:{defaultValue:null,description:"",name:"onClose",required:!0,type:{name:"() => void"}},onModeSelect:{defaultValue:null,description:"",name:"onModeSelect",required:!0,type:{name:'(mode: "standard" | "fast") => void'}},selectedMode:{defaultValue:null,description:"",name:"selectedMode",required:!0,type:{name:"enum",value:[{value:'"standard"'},{value:'"fast"'}]}}}}}catch{}const b=r.forwardRef(({placeholder:o,onSend:i,onModeChange:C,initialMode:u="standard",...p},d)=>{const[h,g]=r.useState(!1),[m,f]=r.useState(u),n=t=>{f(t),C?.(t)},s=()=>{if(d&&"current"in d&&d.current){const t=d.current.value;t.trim()&&(i(t),d.current.value="")}},c=t=>{t.key==="Enter"&&!t.shiftKey&&(t.preventDefault(),s())};return e.jsxs("div",{className:l.chatContainer,children:[e.jsx(j,{size:"sm",className:l.label,children:"Effortless conversations and refined insights that are engaging and refined with detail"}),e.jsxs("div",{className:l.inputContainer,children:[e.jsx("div",{className:l.placeholderText,children:o}),e.jsx("textarea",{ref:d,className:l.input,onKeyPress:c,rows:4,...p}),e.jsxs("div",{className:l.bottomControls,children:[e.jsxs("div",{className:l.leftButtonGroup,children:[e.jsx("button",{type:"button",className:l.iconButton,"aria-label":"Attach file or image",children:e.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",children:e.jsx("path",{d:"M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5a2.5 2.5 0 0 1 5 0v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5a2.5 2.5 0 0 0 5 0V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.31 2.69 6 6 6s6-2.69 6-6V6h-2.5z"})})}),e.jsx("button",{type:"button",className:l.iconButton,onClick:()=>g(!0),"aria-label":"Select response mode - currently set to standard mode","aria-expanded":h,"aria-haspopup":"dialog",children:e.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",children:e.jsx("path",{d:"M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"})})})]}),e.jsx("button",{type:"button",className:l.sendButton,onClick:s,"aria-label":"Send message",children:e.jsx("svg",{viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",children:e.jsx("path",{d:"M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"})})})]})]}),e.jsx(y,{isOpen:h,onClose:()=>g(!1),onModeSelect:n,selectedMode:m})]})});try{b.displayName="Chat",b.__docgenInfo={description:"",displayName:"Chat",props:{placeholder:{defaultValue:null,description:"",name:"placeholder",required:!0,type:{name:"string"}},onSend:{defaultValue:null,description:"",name:"onSend",required:!0,type:{name:"(message: string) => void"}},onModeChange:{defaultValue:null,description:"",name:"onModeChange",required:!1,type:{name:'((mode: "standard" | "fast") => void) | undefined'}},initialMode:{defaultValue:{value:"standard"},description:"",name:"initialMode",required:!1,type:{name:"enum",value:[{value:"undefined"},{value:'"standard"'},{value:'"fast"'}]}}}}}catch{}const Y={title:"Components/Chat",component:b,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
The Chat component is a complete chat interface with text input, action buttons, and mode selection. It provides an intuitive user experience for conversational interfaces.

## Features
- Text input with customizable placeholder
- Attachment button for file uploads
- Mode selection modal (Standard/Fast modes)
- Send functionality with keyboard shortcuts
- Responsive design matching modern chat interfaces
- Built-in mode persistence and callbacks

## Usage

\`\`\`tsx
import { Chat } from 'ui';

<Chat 
  placeholder="Ask a follow up..."
  onSend={(message) => console.log('Sending:', message)}
  onModeChange={(mode) => console.log('Mode changed to:', mode)}
  initialMode="standard"
/>
\`\`\`

## Interactive Elements
- **Attachment Button**: Click to trigger file attachment (first button)
- **Mode Button**: Click to open mode selection modal (second button) 
- **Send Button**: Click or press Enter to send message (arrow button)
- **Mode Modal**: Select between Standard and Fast response modes
        `}}},argTypes:{placeholder:{control:"text",description:"Placeholder text for the input field"},onSend:{action:"message sent",description:"Callback function called when a message is sent"},onModeChange:{action:"mode changed",description:"Callback function called when response mode is changed"},initialMode:{control:{type:"radio",options:["standard","fast"]},description:"Initial response mode selection"}}},_={args:{placeholder:"Ask a follow up...",onSend:o=>console.log("Sending message:",o),onModeChange:o=>console.log("Mode changed to:",o),initialMode:"standard"}},M={args:{placeholder:"Quick question...",onSend:o=>console.log("Sending message:",o),onModeChange:o=>console.log("Mode changed to:",o),initialMode:"fast"}},v={args:{placeholder:"What would you like to know?",onSend:o=>console.log("Sending message:",o),onModeChange:o=>console.log("Mode changed to:",o),initialMode:"standard"}},x={args:{placeholder:"Chat is currently disabled",onSend:o=>console.log("Sending message:",o),onModeChange:o=>console.log("Mode changed to:",o),initialMode:"standard",disabled:!0}};_.parameters={..._.parameters,docs:{..._.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Ask a follow up...',
    onSend: (message: string) => console.log('Sending message:', message),
    onModeChange: (mode: 'standard' | 'fast') => console.log('Mode changed to:', mode),
    initialMode: 'standard'
  }
}`,..._.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Quick question...',
    onSend: (message: string) => console.log('Sending message:', message),
    onModeChange: (mode: 'standard' | 'fast') => console.log('Mode changed to:', mode),
    initialMode: 'fast'
  }
}`,...M.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'What would you like to know?',
    onSend: (message: string) => console.log('Sending message:', message),
    onModeChange: (mode: 'standard' | 'fast') => console.log('Mode changed to:', mode),
    initialMode: 'standard'
  }
}`,...v.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    placeholder: 'Chat is currently disabled',
    onSend: (message: string) => console.log('Sending message:', message),
    onModeChange: (mode: 'standard' | 'fast') => console.log('Mode changed to:', mode),
    initialMode: 'standard',
    disabled: true
  }
}`,...x.parameters?.docs?.source}}};const Z=["Default","FastMode","CustomPlaceholder","Disabled"];export{v as CustomPlaceholder,_ as Default,x as Disabled,M as FastMode,Z as __namedExportsOrder,Y as default};
