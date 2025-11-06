import{j as a}from"./jsx-runtime-D7oVMqXx.js";import"./iframe-Dp89hhtQ.js";import"./preload-helper-D9Z9MdNV.js";const m=({name:r,value:o,variable:e})=>a.jsxs("div",{style:{marginBottom:"16px",display:"flex",alignItems:"center",gap:"12px"},children:[a.jsx("div",{style:{width:"48px",height:"48px",backgroundColor:`var(${e})`,borderRadius:"8px",border:"1px solid #e5e7eb",flexShrink:0}}),a.jsxs("div",{children:[a.jsx("div",{style:{fontWeight:"600",marginBottom:"2px"},children:r}),a.jsx("div",{style:{fontFamily:"monospace",fontSize:"12px",color:"var(--ui-color-gray-800)"},children:e}),a.jsx("div",{style:{fontFamily:"monospace",fontSize:"12px",color:"var(--ui-color-gray-700)"},children:o})]})]}),l=({title:r,colors:o})=>a.jsxs("div",{style:{marginBottom:"32px"},children:[a.jsx("h2",{style:{marginBottom:"16px",fontSize:"18px",fontWeight:"600"},children:r}),a.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))",gap:"16px"},children:o.map(e=>a.jsx(m,{...e},e.variable))})]}),t=()=>{const r=[{name:"Background Base",value:"#fcfcfd",variable:"--ui-color-background-base"}],o=[{name:"Primary 50",value:"#e8f1f8",variable:"--ui-color-primary-50"},{name:"Primary 100",value:"#d0e3f1",variable:"--ui-color-primary-100"},{name:"Primary 200",value:"#b9d5eb",variable:"--ui-color-primary-200"},{name:"Primary 300",value:"#73acd6",variable:"--ui-color-primary-300"},{name:"Primary 400",value:"#4590c9",variable:"--ui-color-primary-400"},{name:"Primary 500",value:"#1674bb",variable:"--ui-color-primary-500"},{name:"Primary 600",value:"#125d96",variable:"--ui-color-primary-600"},{name:"Primary 700",value:"#0d4670",variable:"--ui-color-primary-700"},{name:"Primary 800",value:"#092e4b",variable:"--ui-color-primary-800"},{name:"Primary 900",value:"#041725",variable:"--ui-color-primary-900"}],e=[{name:"Gray 50",value:"#fafafd",variable:"--ui-color-gray-50"},{name:"Gray 100",value:"#f5f5fa",variable:"--ui-color-gray-100"},{name:"Gray 150",value:"#eeeef4",variable:"--ui-color-gray-150"},{name:"Gray 200",value:"#e2e2ea",variable:"--ui-color-gray-200"},{name:"Gray 250",value:"#d8d8e1",variable:"--ui-color-gray-250"},{name:"Gray 300",value:"#c4c4cf",variable:"--ui-color-gray-300"},{name:"Gray 400",value:"#aaaaba",variable:"--ui-color-gray-400"},{name:"Gray 500",value:"#9191a2",variable:"--ui-color-gray-500"},{name:"Gray 600",value:"#757587",variable:"--ui-color-gray-600"},{name:"Gray 700",value:"#5f5f6f",variable:"--ui-color-gray-700"},{name:"Gray 750",value:"#4f4f5a",variable:"--ui-color-gray-750"},{name:"Gray 800",value:"#33333f",variable:"--ui-color-gray-800"},{name:"Gray 900",value:"#22222f",variable:"--ui-color-gray-900"}],u=[{name:"Black",value:"#000000",variable:"--ui-color-black"},{name:"White",value:"#ffffff",variable:"--ui-color-white"}],y=[{name:"Text Primary",value:"var(--ui-color-gray-900)",variable:"--ui-color-text-primary"},{name:"Text Secondary",value:"var(--ui-color-gray-700)",variable:"--ui-color-text-secondary"},{name:"Text Muted",value:"var(--ui-color-gray-500)",variable:"--ui-color-text-muted"},{name:"Background",value:"var(--ui-color-background-base)",variable:"--ui-color-background"},{name:"Surface",value:"var(--ui-color-gray-50)",variable:"--ui-color-surface"},{name:"Border",value:"var(--ui-color-gray-200)",variable:"--ui-color-border"}];return a.jsxs("div",{style:{padding:"20px",maxWidth:"1200px"},children:[a.jsx("h1",{style:{marginBottom:"32px",fontSize:"32px",fontWeight:"700"},children:"Design System Colors"}),a.jsx(l,{title:"Background",colors:r}),a.jsx(l,{title:"Primary Colors",colors:o}),a.jsx(l,{title:"Grayscale Colors",colors:e}),a.jsx(l,{title:"Black & White",colors:u}),a.jsx(l,{title:"Component Tokens",colors:y})]})},d={title:"Tokens/Colors",component:t,parameters:{layout:"fullscreen",docs:{description:{component:`
# Color Palette

This is the complete color palette for the design system. All colors are available as CSS custom properties (variables) and can be used throughout your components.

## Usage

\`\`\`css
.my-component {
  background-color: var(--ui-color-primary-600);
  color: var(--ui-color-white);
  border: 1px solid var(--ui-color-border);
}
\`\`\`

## Color Categories

- **Background**: Base background color for the application
- **Primary Colors**: Blue color palette for primary actions and branding
- **Grayscale Colors**: Neutral colors for text, borders, and surfaces
- **Black & White**: Pure black and white colors
- **Component Tokens**: Semantic color tokens that reference other colors

## Accessibility

All color combinations have been tested for WCAG contrast compliance. When using colors for text, ensure proper contrast ratios:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
        `}}}},i={name:"All Colors",render:()=>a.jsx(t,{})},n={name:"Primary Palette",render:()=>a.jsxs("div",{style:{padding:"20px"},children:[a.jsx("h2",{style:{marginBottom:"24px",fontSize:"24px",fontWeight:"600"},children:"Primary Color Palette"}),[{name:"Primary 50",value:"#e8f1f8",variable:"--ui-color-primary-50"},{name:"Primary 100",value:"#d0e3f1",variable:"--ui-color-primary-100"},{name:"Primary 200",value:"#b9d5eb",variable:"--ui-color-primary-200"},{name:"Primary 300",value:"#73acd6",variable:"--ui-color-primary-300"},{name:"Primary 400",value:"#4590c9",variable:"--ui-color-primary-400"},{name:"Primary 500",value:"#1674bb",variable:"--ui-color-primary-500"},{name:"Primary 600",value:"#125d96",variable:"--ui-color-primary-600"},{name:"Primary 700",value:"#0d4670",variable:"--ui-color-primary-700"},{name:"Primary 800",value:"#092e4b",variable:"--ui-color-primary-800"},{name:"Primary 900",value:"#041725",variable:"--ui-color-primary-900"}].map(r=>a.jsx(m,{...r},r.variable))]})},c={name:"Grayscale Palette",render:()=>a.jsxs("div",{style:{padding:"20px"},children:[a.jsx("h2",{style:{marginBottom:"24px",fontSize:"24px",fontWeight:"600"},children:"Grayscale Color Palette"}),[{name:"Gray 50",value:"#fafafd",variable:"--ui-color-gray-50"},{name:"Gray 100",value:"#f5f5fa",variable:"--ui-color-gray-100"},{name:"Gray 150",value:"#eeeef4",variable:"--ui-color-gray-150"},{name:"Gray 200",value:"#e2e2ea",variable:"--ui-color-gray-200"},{name:"Gray 250",value:"#d8d8e1",variable:"--ui-color-gray-250"},{name:"Gray 300",value:"#c4c4cf",variable:"--ui-color-gray-300"},{name:"Gray 400",value:"#aaaaba",variable:"--ui-color-gray-400"},{name:"Gray 500",value:"#9191a2",variable:"--ui-color-gray-500"},{name:"Gray 600",value:"#757587",variable:"--ui-color-gray-600"},{name:"Gray 700",value:"#5f5f6f",variable:"--ui-color-gray-700"},{name:"Gray 750",value:"#4f4f5a",variable:"--ui-color-gray-750"},{name:"Gray 800",value:"#33333f",variable:"--ui-color-gray-800"},{name:"Gray 900",value:"#22222f",variable:"--ui-color-gray-900"}].map(r=>a.jsx(m,{...r},r.variable))]})};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'All Colors',
  render: () => <Colors />
}`,...i.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Primary Palette',
  render: () => <div style={{
    padding: '20px'
  }}>
      <h2 style={{
      marginBottom: '24px',
      fontSize: '24px',
      fontWeight: '600'
    }}>
        Primary Color Palette
      </h2>
      {[{
      name: 'Primary 50',
      value: '#e8f1f8',
      variable: '--ui-color-primary-50'
    }, {
      name: 'Primary 100',
      value: '#d0e3f1',
      variable: '--ui-color-primary-100'
    }, {
      name: 'Primary 200',
      value: '#b9d5eb',
      variable: '--ui-color-primary-200'
    }, {
      name: 'Primary 300',
      value: '#73acd6',
      variable: '--ui-color-primary-300'
    }, {
      name: 'Primary 400',
      value: '#4590c9',
      variable: '--ui-color-primary-400'
    }, {
      name: 'Primary 500',
      value: '#1674bb',
      variable: '--ui-color-primary-500'
    }, {
      name: 'Primary 600',
      value: '#125d96',
      variable: '--ui-color-primary-600'
    }, {
      name: 'Primary 700',
      value: '#0d4670',
      variable: '--ui-color-primary-700'
    }, {
      name: 'Primary 800',
      value: '#092e4b',
      variable: '--ui-color-primary-800'
    }, {
      name: 'Primary 900',
      value: '#041725',
      variable: '--ui-color-primary-900'
    }].map(color => <ColorSwatch key={color.variable} {...color} />)}
    </div>
}`,...n.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Grayscale Palette',
  render: () => <div style={{
    padding: '20px'
  }}>
      <h2 style={{
      marginBottom: '24px',
      fontSize: '24px',
      fontWeight: '600'
    }}>
        Grayscale Color Palette
      </h2>
      {[{
      name: 'Gray 50',
      value: '#fafafd',
      variable: '--ui-color-gray-50'
    }, {
      name: 'Gray 100',
      value: '#f5f5fa',
      variable: '--ui-color-gray-100'
    }, {
      name: 'Gray 150',
      value: '#eeeef4',
      variable: '--ui-color-gray-150'
    }, {
      name: 'Gray 200',
      value: '#e2e2ea',
      variable: '--ui-color-gray-200'
    }, {
      name: 'Gray 250',
      value: '#d8d8e1',
      variable: '--ui-color-gray-250'
    }, {
      name: 'Gray 300',
      value: '#c4c4cf',
      variable: '--ui-color-gray-300'
    }, {
      name: 'Gray 400',
      value: '#aaaaba',
      variable: '--ui-color-gray-400'
    }, {
      name: 'Gray 500',
      value: '#9191a2',
      variable: '--ui-color-gray-500'
    }, {
      name: 'Gray 600',
      value: '#757587',
      variable: '--ui-color-gray-600'
    }, {
      name: 'Gray 700',
      value: '#5f5f6f',
      variable: '--ui-color-gray-700'
    }, {
      name: 'Gray 750',
      value: '#4f4f5a',
      variable: '--ui-color-gray-750'
    }, {
      name: 'Gray 800',
      value: '#33333f',
      variable: '--ui-color-gray-800'
    }, {
      name: 'Gray 900',
      value: '#22222f',
      variable: '--ui-color-gray-900'
    }].map(color => <ColorSwatch key={color.variable} {...color} />)}
    </div>
}`,...c.parameters?.docs?.source}}};const p=["AllColors","PrimaryPalette","GrayscalePalette"];export{i as AllColors,c as GrayscalePalette,n as PrimaryPalette,p as __namedExportsOrder,d as default};
