/**
 * Exemplos de uso de todos os componentes base
 * Este arquivo serve como referência para como usar cada componente
 */

import {
  Alert,
  Badge,
  Button,
  Checkbox,
  Divider,
  Input,
  Label,
  Loading,
  Progress,
  Radio,
  Textarea,
} from "../components";

export const ComponentsDemo = (): React.JSX.Element => {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <h1 className="text-4xl font-bold">Componentes Base</h1>

      {/* Button Examples */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Buttons</h2>
        <div className="flex gap-4 flex-wrap">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="ghost">Ghost</Button>
          <Button size="sm">Small</Button>
          <Button size="lg">Large</Button>
          <Button disabled>Disabled</Button>
        </div>
      </section>

      <Divider />

      {/* Badge Examples */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Badges</h2>
        <div className="flex gap-4 flex-wrap">
          <Badge>Default</Badge>
          <Badge variant="primary">Primary</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="accent">Accent</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="info">Info</Badge>
          <Badge size="sm">Small</Badge>
          <Badge size="lg">Large</Badge>
        </div>
      </section>

      <Divider />

      {/* Form Components */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Form Components</h2>
        <div className="space-y-4">
          <div>
            <Label required>Bordered Input</Label>
            <Input
              placeholder="Enter text..."
              variant="bordered"
              helperText="This is a helper text"
            />
          </div>

          <div>
            <Label required>Filled Input</Label>
            <Input placeholder="Enter text..." variant="filled" />
          </div>

          <div>
            <Label required>Faded Input</Label>
            <Input placeholder="Enter text..." variant="faded" />
          </div>

          <div>
            <Label required>Input with Error</Label>
            <Input placeholder="Enter text..." error="This field is required" />
          </div>

          <div>
            <Label required>Textarea</Label>
            <Textarea
              placeholder="Enter your message..."
              helperText="Maximum 500 characters"
            />
          </div>

          <div className="space-y-2">
            <Label>Checkboxes</Label>
            <Checkbox label="Option 1" />
            <Checkbox label="Option 2" color="secondary" />
            <Checkbox label="Option 3" color="accent" disabled />
          </div>

          <div className="space-y-2">
            <Label>Radio Buttons</Label>
            <Radio name="demo" label="Option A" />
            <Radio name="demo" label="Option B" color="secondary" />
            <Radio name="demo" label="Option C" color="accent" />
          </div>
        </div>
      </section>

      <Divider />

      {/* Progress Examples */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Progress Bars</h2>
        <div className="space-y-4">
          <div>
            <p className="text-sm mb-2">Default - 25%</p>
            <Progress value={25} />
          </div>
          <div>
            <p className="text-sm mb-2">Primary - 50%</p>
            <Progress value={50} variant="primary" />
          </div>
          <div>
            <p className="text-sm mb-2">Success - 75%</p>
            <Progress value={75} variant="success" />
          </div>
          <div>
            <p className="text-sm mb-2">Warning - 90% (Striped)</p>
            <Progress value={90} variant="warning" animated />
          </div>
          <div>
            <p className="text-sm mb-2">Error - 100% (Large)</p>
            <Progress value={100} variant="error" size="lg" />
          </div>
        </div>
      </section>

      <Divider />

      {/* Loading Examples */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Loading Spinners</h2>
        <div className="grid grid-cols-4 gap-4">
          <Loading variant="spinner" label="Spinner" />
          <Loading variant="dots" label="Dots" />
          <Loading variant="bars" label="Bars" />
          <Loading variant="ring" label="Ring" />

          <Loading variant="spinner" size="sm" label="Small" />
          <Loading variant="spinner" size="lg" label="Large" />
          <Loading variant="spinner" color="secondary" label="Secondary" />
          <Loading variant="spinner" color="success" label="Success" />
        </div>
      </section>

      <Divider />

      {/* Alert Examples */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Alerts</h2>
        <div className="space-y-4">
          <Alert type="info">This is an informational message</Alert>
          <Alert type="success">Operation completed successfully!</Alert>
          <Alert type="warning">Warning: Please review before proceeding</Alert>
          <Alert type="error">Error: Something went wrong</Alert>
        </div>
      </section>

      <Divider />

      {/* Divider Examples */}
      <section>
        <h2 className="text-2xl font-bold mb-4">Dividers</h2>
        <div>
          <p>Content above divider</p>
          <Divider />
          <p>Content below divider</p>
        </div>
        <div>
          <p>Content with centered text</p>
          <Divider>OR</Divider>
          <p>More content</p>
        </div>
      </section>
    </div>
  );
};
