import{j as e}from"./jsx-runtime-D7oVMqXx.js";import"./iframe-Dp89hhtQ.js";import"./preload-helper-D9Z9MdNV.js";const l=({name:i,value:n,variable:s,type:a="spacing"})=>e.jsxs("div",{style:{marginBottom:"16px",display:"flex",alignItems:"center",gap:"16px"},children:[e.jsx("div",{style:{width:a==="spacing"?`var(${s})`:"48px",height:a==="spacing"?`var(${s})`:"48px",backgroundColor:a==="spacing"?"#1674bb":"#f5f5f5",border:a==="spacing"?"none":"2px solid #1674bb",borderRadius:a==="radius"?`var(${s})`:"2px",minWidth:a==="spacing"?"8px":"48px",minHeight:a==="spacing"?"8px":"48px",flexShrink:0}}),e.jsxs("div",{children:[e.jsx("div",{style:{fontWeight:"600",marginBottom:"2px"},children:i}),e.jsx("div",{style:{fontFamily:"monospace",fontSize:"12px",color:"#666"},children:s}),e.jsx("div",{style:{fontFamily:"monospace",fontSize:"12px",color:"#9ca3af"},children:n})]})]}),t=({title:i,items:n,type:s="spacing"})=>e.jsxs("div",{style:{marginBottom:"32px"},children:[e.jsx("h3",{style:{marginBottom:"16px",fontSize:"18px",fontWeight:"600"},children:i}),e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"16px"},children:n.map(a=>e.jsx(l,{...a,type:s},a.variable))})]}),o=()=>{const i=[{name:"None",value:"0",variable:"--ui-space-none"},{name:"Extra Small",value:"2px",variable:"--ui-space-xs"},{name:"Small",value:"4px",variable:"--ui-space-sm"},{name:"Medium",value:"10px",variable:"--ui-space-md"},{name:"Large",value:"12px",variable:"--ui-space-lg"},{name:"Extra Large",value:"16px",variable:"--ui-space-xl"},{name:"2X Large",value:"20px",variable:"--ui-space-2xl"},{name:"3X Large",value:"24px",variable:"--ui-space-3xl"},{name:"4X Large",value:"32px",variable:"--ui-space-4xl"},{name:"5X Large",value:"48px",variable:"--ui-space-5xl"},{name:"6X Large",value:"64px",variable:"--ui-space-6xl"}],n=[{name:"None",value:"0",variable:"--ui-radius-none"},{name:"Extra Small",value:"2px",variable:"--ui-radius-xs"},{name:"Small",value:"4px",variable:"--ui-radius-sm"},{name:"Medium",value:"6px",variable:"--ui-radius-md"},{name:"Large",value:"8px",variable:"--ui-radius-lg"},{name:"Extra Large",value:"12px",variable:"--ui-radius-xl"},{name:"2X Large",value:"16px",variable:"--ui-radius-2xl"},{name:"3X Large",value:"24px",variable:"--ui-radius-3xl"},{name:"Full",value:"100px",variable:"--ui-radius-full"}];return e.jsxs("div",{style:{padding:"20px",maxWidth:"1200px"},children:[e.jsxs("div",{style:{marginBottom:"32px"},children:[e.jsx("h1",{style:{fontSize:"32px",fontWeight:"700",marginBottom:"16px"},children:"Spacing & Layout Tokens"}),e.jsx("p",{style:{fontSize:"16px",color:"#666",lineHeight:"1.6",maxWidth:"600px"},children:"Our spacing system provides consistent spacing and layout values across the design system. These tokens ensure visual harmony and systematic spacing relationships."})]}),e.jsx(t,{title:"Spacing Scale",items:i,type:"spacing"}),e.jsx(t,{title:"Border Radius",items:n,type:"radius"}),e.jsxs("div",{style:{marginTop:"48px",padding:"24px",backgroundColor:"#f8f9fa",borderRadius:"8px"},children:[e.jsx("h3",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"16px"},children:"Usage Examples"}),e.jsxs("div",{style:{fontFamily:"monospace",fontSize:"14px",lineHeight:"1.6",color:"#333"},children:[e.jsx("div",{style:{marginBottom:"12px"},children:e.jsx("strong",{children:"CSS Usage:"})}),e.jsxs("div",{style:{marginBottom:"8px"},children:["padding: var(--ui-space-md); ",e.jsx("span",{style:{color:"#666"},children:"/* 10px */"})]}),e.jsxs("div",{style:{marginBottom:"8px"},children:["margin: var(--ui-space-lg); ",e.jsx("span",{style:{color:"#666"},children:"/* 12px */"})]}),e.jsxs("div",{style:{marginBottom:"8px"},children:["gap: var(--ui-space-xl); ",e.jsx("span",{style:{color:"#666"},children:"/* 16px */"})]}),e.jsxs("div",{style:{marginBottom:"8px"},children:["border-radius: var(--ui-radius-md); ",e.jsx("span",{style:{color:"#666"},children:"/* 6px */"})]}),e.jsx("div",{style:{marginTop:"20px",marginBottom:"12px"},children:e.jsx("strong",{children:"React Inline Styles:"})}),e.jsx("div",{style:{marginBottom:"8px"},children:"padding: 'var(--ui-space-md)',"}),e.jsx("div",{style:{marginBottom:"8px"},children:"borderRadius: 'var(--ui-radius-lg)',"})]})]})]})},x={title:"Tokens/Spacing",parameters:{layout:"fullscreen",docs:{description:{component:`
# Spacing & Layout Tokens

Our spacing system provides a systematic approach to spacing and layout consistency across the design system.

## Spacing Scale

The spacing scale follows a purposeful progression that provides flexibility while maintaining visual harmony:

- **xs-lg (2px-12px)**: Fine-tuned spacing for compact interfaces and precise adjustments
- **xl-2xl (16px-20px)**: Standard spacing for most interface elements
- **3xl-6xl (24px-64px)**: Generous spacing for section separation and layout structure

## Border Radius

Border radius tokens provide consistent corner rounding across components:

- **xs-md (2px-6px)**: Subtle rounding for form controls and buttons
- **lg-xl (8px-12px)**: Moderate rounding for cards and containers
- **2xl-3xl (16px-24px)**: Prominent rounding for hero elements
- **full (100px)**: Pill-shaped elements and circular avatars

## Design Principles

### Systematic Spacing
- All spacing values are systematically defined to create visual rhythm
- Consistent spacing improves scan-ability and user comprehension
- Spacing relationships create clear content hierarchy

### Flexibility
- Multiple scale options accommodate different interface densities
- Fine-grained control for precise layout adjustments
- Scalable system works across different screen sizes

### Token Usage
- Use tokens instead of hardcoded values for consistency
- Tokens make global spacing changes easy to implement
- Design-to-development handoff is more precise
        `}}}},r={render:()=>e.jsx(o,{})};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  render: () => <SpacingTokens />
}`,...r.parameters?.docs?.source}}};const m=["SpacingSystem"];export{r as SpacingSystem,m as __namedExportsOrder,x as default};
