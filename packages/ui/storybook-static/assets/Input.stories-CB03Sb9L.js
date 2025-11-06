import{j as e}from"./jsx-runtime-D7oVMqXx.js";import{I as t}from"./Input-wjnbaxUc.js";import"./iframe-Dp89hhtQ.js";import"./preload-helper-D9Z9MdNV.js";import"./Label-BHsjbZDl.js";const u={title:"Components/Input",component:t,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:`
A versatile input component with integrated label support. Supports both controlled and uncontrolled usage patterns for flexible form management.

## Usage Patterns

### Controlled vs Uncontrolled Inputs

Input components support both controlled and uncontrolled usage patterns, giving you flexibility based on your form management approach.

#### Controlled Inputs (Recommended)
Use controlled components when you need to manage the input state in React:

\`\`\`tsx
const [email, setEmail] = useState('');

<Input
  label="Email Address"
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Enter your email"
/>
\`\`\`

**Complete Form Example with State Management:**
\`\`\`tsx
function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  
  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };
  
  return (
    <form>
      <Input
        label="Full Name"
        value={formData.name}
        onChange={handleChange('name')}
        placeholder="Enter your name"
        required
      />
      <Input
        label="Email"
        type="email"
        value={formData.email}
        onChange={handleChange('email')}
        placeholder="Enter your email"
        required
      />
      <Input
        label="Phone"
        type="tel"
        value={formData.phone}
        onChange={handleChange('phone')}
        placeholder="Enter your phone"
      />
    </form>
  );
}
\`\`\`

**Benefits of Controlled:**
- Real-time validation and formatting
- Easy form state management
- Immediate UI updates
- Predictable behavior for complex forms

#### Uncontrolled Inputs
Use uncontrolled components for simpler forms or when integrating with form libraries:

\`\`\`tsx
// Basic uncontrolled with defaultValue
<Input
  label="Username"
  name="username"
  defaultValue="john_doe"
  onChange={(e) => console.log('Username:', e.target.value)}
  placeholder="Enter username"
/>
\`\`\`

**Form Submission Example:**
\`\`\`tsx
function LoginForm() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const credentials = {
      username: formData.get('username'),
      password: formData.get('password')
    };
    console.log('Login data:', credentials);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Username"
        name="username"
        placeholder="Enter username"
        required
      />
      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Enter password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}
\`\`\`

**With React Hook Form:**
\`\`\`tsx
import { useForm } from 'react-hook-form';

function RegistrationForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data: any) => {
    console.log('Registration data:', data);
  };
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Email"
        type="email"
        {...register('email', { required: 'Email is required' })}
        placeholder="Enter email"
      />
      <Input
        label="Password"
        type="password"
        {...register('password', { minLength: 8 })}
        placeholder="Enter password"
      />
      <button type="submit">Register</button>
    </form>
  );
}
\`\`\`

**Benefits of Uncontrolled:**
- Less boilerplate code
- Better performance for large forms
- Works seamlessly with form libraries
- Closer to native HTML behavior

#### Key Props for Both Patterns
- **\`name\`** (recommended): Form field name for submission
- **\`value\`**: For controlled components
- **\`defaultValue\`**: For uncontrolled components
- **\`onChange\`**: Handler for both patterns
- **\`label\`**: Accessible label text
- **\`type\`**: Input type (text, email, password, etc.)

## Design Specifications

### Input Structure
- **Input Field**: Full-width with minimum 200px width
- **Border**: 1px solid using \`--ui-color-gray-500\`
- **Border Radius**: Uses design token \`--ui-radius-md\`
- **Background**: \`--ui-color-text-primary\` (white)
- **Padding**: Uses design token \`--ui-space-md\`
- **Font**: Uses design token \`--ui-font-family-primary\` (Hanken Grotesk)
- **Font Size**: Uses design token \`--ui-font-size-sm\`
- **Transition**: All properties with 0.2s ease

### Label Integration
- **Label Component**: Uses shared Label component for consistency
- **Layout**: Vertical stack with \`--ui-space-xs\` gap
- **Association**: Proper \`htmlFor\` and \`id\` relationship
- **Size Variants**: xs, sm, md label sizes available
- **Disabled State**: Label automatically dims when input is disabled

### Interactive States

#### Focus State
- **Border**: Maintains current color
- **Box Shadow**: 3px focus ring using \`--ui-color-primary-100\`
- **Outline**: None (custom focus styling)

#### Hover State
- **Border**: Changes to \`--ui-color-gray-600\`
- **Background**: Changes to \`--ui-color-gray-50\`
- **Transition**: Smooth 0.2s ease transition

#### Disabled State
- **Background**: \`--ui-color-gray-100\`
- **Border**: \`--ui-color-gray-200\`
- **Text Color**: \`--ui-color-gray-400\`
- **Cursor**: \`not-allowed\`
- **Label**: Automatically inherits disabled styling

#### Placeholder Styling
- **Color**: \`--ui-color-gray-400\`
- **Opacity**: 1 (ensures consistent appearance)

## Input Types

### Text Input Types
- **text**: Standard text input
- **email**: Email validation and mobile keyboard
- **password**: Masked input for sensitive data
- **search**: Search-specific styling and behavior
- **tel**: Telephone number input
- **url**: URL input with validation

### Numeric Input Types
- **number**: Numeric input with increment/decrement controls

## Accessibility

### Label Association
- Proper \`htmlFor\` and \`id\` relationship between label and input
- Automatic ID generation when not provided
- Screen reader accessible label text

### Keyboard Navigation
- Standard Tab navigation to focus input
- All input types support appropriate keyboard input
- Focus states provide clear visual feedback

### Form Integration
- Proper \`name\` attributes for form submission
- Supports \`required\`, \`pattern\`, and other validation attributes
- Works with form validation libraries

### ARIA Support
- Supports \`aria-label\`, \`aria-describedby\`, and other ARIA attributes
- Proper semantic HTML input elements
- Disabled state properly communicated to assistive technologies

### Best Practices
- Always provide labels for form inputs
- Use appropriate input types for better UX and validation
- Include helpful placeholder text
- Provide clear error states and validation messages
- Test with keyboard navigation and screen readers
        `}}},argTypes:{label:{control:"text",description:"Label text for the input"},labelSize:{control:"select",options:["xs","sm","md"],description:"Size of the label text"},type:{control:"select",options:["text","email","password","number","search","tel","url"],description:"HTML input type"},placeholder:{control:"text",description:"Placeholder text for the input"},disabled:{control:"boolean",description:"Disables the input when true"},value:{control:"text",description:"Controlled value of the input"},defaultValue:{control:"text",description:"Uncontrolled default value of the input"},onChange:{action:"changed",description:"Callback fired when the input value changes"}}},a={args:{label:"Text Input",type:"text",placeholder:"Enter text"}},r={args:{type:"search",placeholder:"Search..."}},o={name:"Label Size Variants",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px",minWidth:"300px"},children:[e.jsx(t,{label:"Extra Small Label",labelSize:"xs",placeholder:"xs label size"}),e.jsx(t,{label:"Small Label",labelSize:"sm",placeholder:"sm label size"}),e.jsx(t,{label:"Medium Label",labelSize:"md",placeholder:"md label size (default)"})]})},n={name:"Input Types",render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"20px",minWidth:"300px"},children:[e.jsx(t,{label:"Email",type:"email",placeholder:"Enter email"}),e.jsx(t,{label:"Password",type:"password",placeholder:"Enter password"}),e.jsx(t,{label:"Number",type:"number",placeholder:"Enter number"}),e.jsx(t,{label:"Search",type:"search",placeholder:"Search..."})]})},l={args:{label:"Disabled Input",placeholder:"This input is disabled",disabled:!0}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Text Input',
    type: 'text',
    placeholder: 'Enter text'
  }
}`,...a.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    type: 'search',
    placeholder: 'Search...'
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Label Size Variants',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    minWidth: '300px'
  }}>
      <Input label="Extra Small Label" labelSize="xs" placeholder="xs label size" />
      <Input label="Small Label" labelSize="sm" placeholder="sm label size" />
      <Input label="Medium Label" labelSize="md" placeholder="md label size (default)" />
    </div>
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  name: 'Input Types',
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    minWidth: '300px'
  }}>
      <Input label="Email" type="email" placeholder="Enter email" />
      <Input label="Password" type="password" placeholder="Enter password" />
      <Input label="Number" type="number" placeholder="Enter number" />
      <Input label="Search" type="search" placeholder="Search..." />
    </div>
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    label: 'Disabled Input',
    placeholder: 'This input is disabled',
    disabled: true
  }
}`,...l.parameters?.docs?.source}}};const c=["TextInput","WithoutLabel","LabelSizes","InputTypes","Disabled"];export{l as Disabled,n as InputTypes,o as LabelSizes,a as TextInput,r as WithoutLabel,c as __namedExportsOrder,u as default};
