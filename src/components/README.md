# Componentes Base

Biblioteca de componentes reutilizáveis seguindo o padrão do daisyUI.

## 📋 Índice

- [Button](#button)
- [Badge](#badge)
- [Input](#input)
- [Textarea](#textarea)
- [Checkbox](#checkbox)
- [Radio](#radio)
- [Label](#label)
- [Progress](#progress)
- [Loading](#loading)
- [Alert](#alert)
- [Divider](#divider)
- [Card](#card)
- [NavBar](#navbar)
- [Footer](#footer)

## Button

Componente de botão com múltiplas variantes e tamanhos.

### Props

- `variant`: `'primary' | 'secondary' | 'accent' | 'ghost'` (padrão: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (padrão: `'md'`)
- `disabled`: `boolean`
- `className`: `string`
- Todos os atributos padrão de `<button>`

### Exemplo

```tsx
import { Button } from '@/components';

export function MyComponent() {
  return (
    <>
      <Button>Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button size="lg">Large Button</Button>
      <Button disabled>Disabled</Button>
    </>
  );
}
```

## Badge

Componente de badge/label para destacar informações.

### Props

- `variant`: `'default' | 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info'` (padrão: `'default'`)
- `size`: `'sm' | 'md' | 'lg'` (padrão: `'md'`)
- `className`: `string`

### Exemplo

```tsx
import { Badge } from '@/components';

export function MyComponent() {
  return (
    <>
      <Badge variant="primary">New</Badge>
      <Badge variant="success" size="lg">Approved</Badge>
      <Badge variant="error">Error</Badge>
    </>
  );
}
```

## Input

Componente de input com validação e variantes.

### Props

- `variant`: `'bordered' | 'filled' | 'faded'` (padrão: `'bordered'`)
- `size`: `'sm' | 'md' | 'lg'` (padrão: `'md'`)
- `label`: `string`
- `error`: `string` (exibe mensagem de erro)
- `helperText`: `string` (texto auxiliar)
- Todos os atributos padrão de `<input>`

### Exemplo

```tsx
import { Input } from '@/components';
import { useState } from 'react';

export function MyComponent() {
  const [value, setValue] = useState('');

  return (
    <Input
      label="Email"
      placeholder="your@email.com"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      error={value.includes('@') ? '' : 'Invalid email'}
      helperText="We'll never share your email"
    />
  );
}
```

## Textarea

Componente de textarea com validação.

### Props

- `variant`: `'bordered' | 'filled' | 'faded'` (padrão: `'bordered'`)
- `size`: `'sm' | 'md' | 'lg'` (padrão: `'md'`)
- `label`: `string`
- `error`: `string`
- `helperText`: `string`
- `rows`: `number` (padrão: `4`)
- Todos os atributos padrão de `<textarea>`

## Checkbox

Componente de checkbox com label.

### Props

- `label`: `ReactNode`
- `size`: `'sm' | 'md' | 'lg'` (padrão: `'md'`)
- `color`: `'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info'` (padrão: `'primary'`)
- Todos os atributos padrão de `<input type="checkbox">`

### Exemplo

```tsx
import { Checkbox } from '@/components';

export function MyComponent() {
  return (
    <>
      <Checkbox label="Accept terms" />
      <Checkbox label="Subscribe" color="secondary" />
      <Checkbox label="Disabled" disabled />
    </>
  );
}
```

## Radio

Componente de radio button com label.

### Props

- `label`: `ReactNode`
- `size`: `'sm' | 'md' | 'lg'` (padrão: `'md'`)
- `color`: `'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info'` (padrão: `'primary'`)
- Todos os atributos padrão de `<input type="radio">`

## Label

Componente de label.

### Props

- `children`: `ReactNode`
- `required`: `boolean`
- `disabled`: `boolean`
- `size`: `'sm' | 'md' | 'lg'` (padrão: `'md'`)
- Todos os atributos padrão de `<label>`

## Progress

Componente de barra de progresso.

### Props

- `value`: `number` (valor atual)
- `max`: `number` (padrão: `100`)
- `variant`: `'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info'` (padrão: `'primary'`)
- `size`: `'sm' | 'md' | 'lg'` (padrão: `'md'`)
- `striped`: `boolean`
- `animated`: `boolean`
- `className`: `string`

### Exemplo

```tsx
import { Progress } from '@/components';

export function MyComponent() {
  return (
    <>
      <Progress value={50} />
      <Progress value={75} variant="success" striped animated />
      <Progress value={100} variant="error" size="lg" />
    </>
  );
}
```

## Loading

Componente de spinner/loading com múltiplas variantes.

### Props

- `variant`: `'spinner' | 'dots' | 'bars' | 'ring'` (padrão: `'spinner'`)
- `size`: `'sm' | 'md' | 'lg'` (padrão: `'md'`)
- `color`: `'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'info'` (padrão: `'primary'`)
- `label`: `string`
- `className`: `string`

### Exemplo

```tsx
import { Loading } from '@/components';

export function MyComponent() {
  return (
    <>
      <Loading />
      <Loading variant="dots" label="Carregando..." />
      <Loading variant="bars" size="lg" color="success" />
    </>
  );
}
```

## Alert

Componente de alerta com ícone.

### Props

- `children`: `ReactNode`
- `type`: `'info' | 'success' | 'warning' | 'error'` (padrão: `'info'`)
- `testId`: `string`

### Exemplo

```tsx
import { Alert } from '@/components';

export function MyComponent() {
  return (
    <>
      <Alert type="info">Informação</Alert>
      <Alert type="success">Sucesso!</Alert>
      <Alert type="warning">Atenção</Alert>
      <Alert type="error">Erro</Alert>
    </>
  );
}
```

## Divider

Componente de divisor com suporte a texto centralizado.

### Props

- `children`: `ReactNode` (texto do meio)
- `variant`: `'horizontal' | 'vertical'` (padrão: `'horizontal'`)
- `className`: `string`

## Card

Componente de card com composição.

### Props

- `children`: `ReactNode`
- `className`: `string`
- `testId`: `string`

### Sub-componentes

- `CardBody` - Corpo do card
- `CardTitle` - Título do card

### Exemplo

```tsx
import { Card, CardBody, CardTitle } from '@/components';

export function MyComponent() {
  return (
    <Card>
      <CardBody centered>
        <CardTitle>Meu Card</CardTitle>
        <p>Conteúdo aqui</p>
      </CardBody>
    </Card>
  );
}
```

## Navbar

Componente de barra de navegação.

### Props

- `title`: `string`
- `children`: `ReactNode` (elementos adicionais)

## Footer

Componente de rodapé.

## 🎨 Usando os componentes

### Importação

```tsx
// Importar componentes individuais
import { Button, Badge, Input } from '@/components';

// Ou do arquivo de índice
import * as Components from '@/components';
```

### Tipagem

Todos os componentes são totalmente tipados com TypeScript e suportam IntelliSense completo.

## 📦 Estrutura

```
src/components/
├── Alert/
├── Badge/
├── Button/
├── Card/
├── Checkbox/
├── Divider/
├── ExternalLink/
├── FeatureCard/
├── Footer/
├── Input/
├── Label/
├── Loading/
├── Logo/
├── Navbar/
├── Progress/
├── Radio/
├── Textarea/
├── ToolItem/
├── CounterCard/
└── index.ts
```
