import{j as e}from"./jsx-runtime-D7oVMqXx.js";import"./iframe-Dp89hhtQ.js";import"./preload-helper-D9Z9MdNV.js";const d=({label:t,token:i,value:n,type:a="size",sampleText:r="The quick brown fox jumps over the lazy dog"})=>{const h=()=>{const o={fontFamily:"var(--ui-font-family-primary)",margin:0,padding:0};switch(a){case"size":return{...o,fontSize:`var(${i})`,lineHeight:"var(--ui-line-height-normal)"};case"weight":return{...o,fontSize:"var(--ui-font-size-base)",fontWeight:`var(${i})`,lineHeight:"var(--ui-line-height-normal)"};case"lineHeight":return{...o,fontSize:"var(--ui-font-size-base)",lineHeight:`var(${i})`,border:"1px dashed #e5e7eb",padding:"8px",borderRadius:"4px",backgroundColor:"#fafafa"};case"family":return{...o,fontFamily:`var(${i})`,fontSize:"var(--ui-font-size-base)",lineHeight:"var(--ui-line-height-normal)"};default:return o}};return e.jsxs("div",{style:{marginBottom:"24px"},children:[e.jsxs("div",{style:{marginBottom:"8px",display:"flex",alignItems:"baseline",gap:"12px"},children:[e.jsx("span",{style:{fontWeight:"600",fontSize:"14px"},children:t}),e.jsx("span",{style:{fontFamily:"monospace",fontSize:"12px",color:"#666"},children:i}),e.jsx("span",{style:{fontFamily:"monospace",fontSize:"12px",color:"#9ca3af"},children:n})]}),e.jsx("div",{style:h(),children:r})]})},s=({title:t,description:i,items:n,type:a="size"})=>e.jsxs("div",{style:{marginBottom:"48px"},children:[e.jsx("h3",{style:{marginBottom:"8px",fontSize:"20px",fontWeight:"600"},children:t}),i&&e.jsx("p",{style:{fontSize:"14px",color:"#666",marginBottom:"24px",lineHeight:"1.6"},children:i}),e.jsx("div",{children:n.map(r=>e.jsx(d,{...r,type:a},r.token))})]}),g=()=>{const t=[{label:"Extra Small",token:"--ui-font-size-xs",value:"13px"},{label:"Small",token:"--ui-font-size-sm",value:"14px"},{label:"Medium",token:"--ui-font-size-md",value:"15px"},{label:"Base",token:"--ui-font-size-base",value:"16px"},{label:"Large",token:"--ui-font-size-lg",value:"18px"},{label:"Extra Large",token:"--ui-font-size-xl",value:"20px"},{label:"2X Large",token:"--ui-font-size-2xl",value:"24px"},{label:"3X Large",token:"--ui-font-size-3xl",value:"30px"}],i=[{label:"Light",token:"--ui-font-weight-light",value:"300"},{label:"Regular",token:"--ui-font-weight-regular",value:"400"},{label:"Medium",token:"--ui-font-weight-medium",value:"500"},{label:"Semibold",token:"--ui-font-weight-semibold",value:"600"},{label:"Bold",token:"--ui-font-weight-bold",value:"700"}],n=[{label:"Tight",token:"--ui-line-height-tight",value:"120%",sampleText:"Tight line height for headlines and compact text. Creates dense, impactful typography for headings."},{label:"Normal",token:"--ui-line-height-normal",value:"150%",sampleText:"Normal line height for most body text. Provides good readability and comfortable spacing."},{label:"Relaxed",token:"--ui-line-height-relaxed",value:"160%",sampleText:"Relaxed line height for longer form content. Improves readability for extended reading."},{label:"Spacious",token:"--ui-line-height-spacious",value:"170%",sampleText:"Spacious line height for articles and documentation. Creates breathing room for comprehensive content."},{label:"Very Spacious",token:"--ui-line-height-very-spacious",value:"180%",sampleText:"Very spacious line height for accessibility and long-form reading. Maximum comfort for extended text consumption."}],a=[{label:"Primary",token:"--ui-font-family-primary",value:"'Hanken Grotesk', sans-serif",sampleText:"Hanken Grotesk - Our primary typeface for all interface text"}];return e.jsxs("div",{style:{padding:"20px",maxWidth:"1200px",fontFamily:"var(--ui-font-family-primary)"},children:[e.jsxs("div",{style:{marginBottom:"48px"},children:[e.jsx("h1",{style:{fontSize:"32px",fontWeight:"700",marginBottom:"16px"},children:"Typography Tokens"}),e.jsx("p",{style:{fontSize:"16px",color:"#666",lineHeight:"1.6",maxWidth:"600px"},children:"Our typography system provides consistent type scales, weights, and spacing to create readable and harmonious text hierarchy across the design system."})]}),e.jsx(s,{title:"Font Family",description:"Primary typeface for all interface elements",items:a,type:"family"}),e.jsx(s,{title:"Font Sizes",description:"Systematic scale from interface details to prominent headings",items:t,type:"size"}),e.jsx(s,{title:"Font Weights",description:"Weight variations for hierarchy and emphasis",items:i,type:"weight"}),e.jsx(s,{title:"Line Heights",description:"Spacing between lines optimized for different reading contexts",items:n,type:"lineHeight"}),e.jsxs("div",{style:{marginTop:"48px",padding:"24px",backgroundColor:"#f8f9fa",borderRadius:"8px"},children:[e.jsx("h3",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"16px"},children:"Typography Combinations"}),e.jsxs("div",{style:{marginBottom:"32px"},children:[e.jsx("h4",{style:{fontSize:"var(--ui-font-size-2xl)",fontWeight:"var(--ui-font-weight-bold)",lineHeight:"var(--ui-line-height-tight)",marginBottom:"8px"},children:"Page Heading"}),e.jsx("p",{style:{fontSize:"var(--ui-font-size-base)",fontWeight:"var(--ui-font-weight-regular)",lineHeight:"var(--ui-line-height-normal)",color:"#666",margin:0},children:"24px Bold, 120% line height for main page titles"})]}),e.jsxs("div",{style:{marginBottom:"32px"},children:[e.jsx("h4",{style:{fontSize:"var(--ui-font-size-lg)",fontWeight:"var(--ui-font-weight-semibold)",lineHeight:"var(--ui-line-height-normal)",marginBottom:"8px"},children:"Section Heading"}),e.jsx("p",{style:{fontSize:"var(--ui-font-size-base)",fontWeight:"var(--ui-font-weight-regular)",lineHeight:"var(--ui-line-height-relaxed)",color:"#666",margin:0},children:"18px Semibold, 150% line height for section titles and content groupings"})]}),e.jsxs("div",{style:{marginBottom:"32px"},children:[e.jsx("p",{style:{fontSize:"var(--ui-font-size-base)",fontWeight:"var(--ui-font-weight-regular)",lineHeight:"var(--ui-line-height-relaxed)",marginBottom:"8px"},children:"Body Text"}),e.jsx("p",{style:{fontSize:"var(--ui-font-size-sm)",fontWeight:"var(--ui-font-weight-regular)",lineHeight:"var(--ui-line-height-normal)",color:"#666",margin:0},children:"16px Regular, 160% line height for readable body content and paragraphs"})]}),e.jsxs("div",{children:[e.jsx("span",{style:{fontSize:"var(--ui-font-size-sm)",fontWeight:"var(--ui-font-weight-medium)",lineHeight:"var(--ui-line-height-normal)"},children:"UI Text"}),e.jsx("p",{style:{fontSize:"var(--ui-font-size-xs)",fontWeight:"var(--ui-font-weight-regular)",lineHeight:"var(--ui-line-height-normal)",color:"#666",margin:"4px 0 0 0"},children:"14px Medium, 150% line height for labels, buttons, and interface elements"})]})]}),e.jsxs("div",{style:{marginTop:"32px",padding:"24px",backgroundColor:"#f8f9fa",borderRadius:"8px"},children:[e.jsx("h3",{style:{fontSize:"18px",fontWeight:"600",marginBottom:"16px"},children:"Usage Examples"}),e.jsxs("div",{style:{fontFamily:"monospace",fontSize:"14px",lineHeight:"1.6",color:"#333"},children:[e.jsx("div",{style:{marginBottom:"12px"},children:e.jsx("strong",{children:"CSS Usage:"})}),e.jsx("div",{style:{marginBottom:"8px"},children:"font-family: var(--ui-font-family-primary);"}),e.jsxs("div",{style:{marginBottom:"8px"},children:["font-size: var(--ui-font-size-lg); ",e.jsx("span",{style:{color:"#666"},children:"/* 18px */"})]}),e.jsxs("div",{style:{marginBottom:"8px"},children:["font-weight: var(--ui-font-weight-semibold);"," ",e.jsx("span",{style:{color:"#666"},children:"/* 600 */"})]}),e.jsxs("div",{style:{marginBottom:"8px"},children:["line-height: var(--ui-line-height-relaxed);"," ",e.jsx("span",{style:{color:"#666"},children:"/* 160% */"})]}),e.jsx("div",{style:{marginTop:"20px",marginBottom:"12px"},children:e.jsx("strong",{children:"React Inline Styles:"})}),e.jsx("div",{style:{marginBottom:"8px"},children:"fontFamily: 'var(--ui-font-family-primary)',"}),e.jsx("div",{style:{marginBottom:"8px"},children:"fontSize: 'var(--ui-font-size-lg)',"}),e.jsx("div",{style:{marginBottom:"8px"},children:"fontWeight: 'var(--ui-font-weight-semibold)',"})]})]})]})},x={title:"Tokens/Typography",parameters:{layout:"fullscreen",docs:{description:{component:`
# Typography Tokens

Our typography system provides a comprehensive set of design tokens for consistent text styling across the design system.

## Typography Scale

### Font Sizes
The font size scale provides appropriate sizing for different content hierarchies:

- **xs-sm (13px-14px)**: Fine print, captions, and secondary interface text
- **md-base (15px-16px)**: Primary body text and standard interface elements
- **lg-xl (18px-20px)**: Subheadings and prominent interface text
- **2xl-3xl (24px-30px)**: Main headings and hero text

### Font Weights
Weight variations create hierarchy and emphasis:

- **Light (300)**: Subtle text, large headings where elegance is desired
- **Regular (400)**: Standard body text and most interface elements
- **Medium (500)**: Slightly emphasized text, form labels
- **Semibold (600)**: Subheadings, important interface elements
- **Bold (700)**: Main headings, strong emphasis

### Line Heights
Line height tokens optimize readability for different contexts:

- **Tight (120%)**: Headlines and display text where impact is priority
- **Normal (150%)**: Standard interface text and short content
- **Relaxed (160%)**: Body text and comfortable reading
- **Spacious (170%)**: Long-form content and articles
- **Very Spacious (180%)**: Accessibility-focused and maximum readability

## Design Principles

### Readability First
- All combinations tested for optimal readability across devices
- Line heights optimized for comfortable reading at each size
- Sufficient contrast and spacing for accessibility compliance

### Systematic Hierarchy
- Clear distinction between heading levels and body text
- Consistent proportional relationships between sizes
- Predictable visual hierarchy that guides user attention

### Hanken Grotesk
- Modern geometric sans-serif with excellent readability
- Variable font with complete weight range (100-900)
- Optimized for both digital screens and print applications
        `}}}},l={render:()=>e.jsx(g,{})};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => <TypographyTokens />
}`,...l.parameters?.docs?.source}}};const f=["TypographySystem"];export{l as TypographySystem,f as __namedExportsOrder,x as default};
