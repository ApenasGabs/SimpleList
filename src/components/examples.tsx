/**
 * Exemplos de combinações e padrões de uso com os componentes
 */

import { useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardTitle,
  Checkbox,
  Divider,
  Input,
  Label,
  Loading,
  Progress,
  Radio,
  Textarea,
} from "./index";

/**
 * Exemplo 1: Form com validação
 */
export const FormExample = (): React.JSX.Element => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular API call
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading(false);
    setSubmitted(true);
  };

  return (
    <Card className="max-w-md">
      <CardBody centered>
        <CardTitle>Formulário de Contato</CardTitle>

        {submitted && (
          <Alert type="success">Mensagem enviada com sucesso!</Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <Input
            label="Email"
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={email && !email.includes("@") ? "Email inválido" : undefined}
            required
          />

          <Textarea
            label="Mensagem"
            placeholder="Sua mensagem aqui..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            helperText="Máximo 500 caracteres"
            rows={4}
          />

          <div className="space-y-2">
            <Checkbox label="Concordo com os termos" />
            <Checkbox label="Desejo receber emails" />
          </div>

          <div className="flex gap-2">
            <Button
              type="submit"
              disabled={isLoading || !email || !message}
              className="flex-1"
            >
              {isLoading ? "Enviando..." : "Enviar"}
            </Button>
          </div>

          {isLoading && <Loading label="Processando..." />}
        </form>
      </CardBody>
    </Card>
  );
};

/**
 * Exemplo 2: Progress com steps
 */
export const ProgressStepsExample = (): React.JSX.Element => {
  const [step, setStep] = useState(0);
  const steps = [
    { label: "Dados", progress: 0 },
    { label: "Confirmação", progress: 33 },
    { label: "Pagamento", progress: 66 },
    { label: "Concluído", progress: 100 },
  ];

  return (
    <Card>
      <CardBody>
        <CardTitle>Checkout</CardTitle>
        <p className="text-sm text-base-content/60 mb-4">
          Etapa {step + 1} de {steps.length}: {steps[step].label}
        </p>
        <Progress value={steps[step].progress} variant="primary" />
        <div className="flex gap-2 mt-6">
          <Button
            size="sm"
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
          >
            Anterior
          </Button>
          <Button
            size="sm"
            onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
            disabled={step === steps.length - 1}
          >
            Próximo
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

/**
 * Exemplo 3: Settings com radio options
 */
export const SettingsExample = (): React.JSX.Element => {
  const [theme, setTheme] = useState("light");
  const [frequency, setFrequency] = useState("daily");

  return (
    <Card className="max-w-md">
      <CardBody>
        <CardTitle>Configurações</CardTitle>

        <div className="space-y-4">
          <div>
            <Label className="mb-3">Tema</Label>
            <div className="space-y-2">
              <Radio
                name="theme"
                value="light"
                checked={theme === "light"}
                onChange={(e) => setTheme(e.target.value)}
                label="Claro"
              />
              <Radio
                name="theme"
                value="dark"
                checked={theme === "dark"}
                onChange={(e) => setTheme(e.target.value)}
                label="Escuro"
              />
              <Radio
                name="theme"
                value="auto"
                checked={theme === "auto"}
                onChange={(e) => setTheme(e.target.value)}
                label="Automático"
              />
            </div>
          </div>

          <Divider />

          <div>
            <Label className="mb-3">Frequência de Notificações</Label>
            <div className="space-y-2">
              <Radio
                name="frequency"
                value="instant"
                checked={frequency === "instant"}
                onChange={(e) => setFrequency(e.target.value)}
                label="Instantânea"
                color="primary"
              />
              <Radio
                name="frequency"
                value="daily"
                checked={frequency === "daily"}
                onChange={(e) => setFrequency(e.target.value)}
                label="Diária"
                color="primary"
              />
              <Radio
                name="frequency"
                value="weekly"
                checked={frequency === "weekly"}
                onChange={(e) => setFrequency(e.target.value)}
                label="Semanal"
                color="primary"
              />
            </div>
          </div>

          <Divider />

          <Button className="w-full">Salvar Configurações</Button>
        </div>
      </CardBody>
    </Card>
  );
};

/**
 * Exemplo 4: Status badge com cards
 */
export const StatusCardsExample = (): React.JSX.Element => {
  type StatusVariant = "success" | "warning" | "error" | "info";

  const items: Array<{
    name: string;
    status: StatusVariant;
    progress: number;
  }> = [
    { name: "Pedido #123", status: "success", progress: 100 },
    { name: "Pedido #124", status: "warning", progress: 60 },
    { name: "Pedido #125", status: "error", progress: 30 },
    { name: "Pedido #126", status: "info", progress: 90 },
  ];

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <Card key={item.name}>
          <CardBody>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold">{item.name}</h3>
              <Badge variant={item.status}>{item.status}</Badge>
            </div>
            <Progress value={item.progress} variant={item.status} />
            <p className="text-sm text-base-content/60 mt-2">
              {item.progress}% completo
            </p>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

/**
 * Exemplo 5: Alert com ações
 */
export const AlertActionsExample = (): React.JSX.Element => {
  const [alerts, setAlerts] = useState([
    { id: 1, type: "info" as const, message: "Informação importante" },
    { id: 2, type: "success" as const, message: "Ação concluída com sucesso" },
    { id: 3, type: "warning" as const, message: "Atenção requerida" },
    { id: 4, type: "error" as const, message: "Erro ao processar" },
  ]);

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <div key={alert.id} className="flex gap-2 items-start">
          <div className="flex-1">
            <Alert type={alert.type}>{alert.message}</Alert>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setAlerts(alerts.filter((a) => a.id !== alert.id))}
          >
            ✕
          </Button>
        </div>
      ))}
    </div>
  );
};
