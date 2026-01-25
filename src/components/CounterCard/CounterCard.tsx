import type { ReactElement } from "react";
import { Button } from "../Button/Button";
import { Card, CardBody, CardTitle } from "../Card/Card";

interface CounterCardProps {
  count: number;
  onIncrement: () => void;
}

/**
 * Card com contador interativo
 *
 * @param count - Valor atual do contador
 * @param onIncrement - Função chamada ao incrementar
 */
export const CounterCard = ({
  count,
  onIncrement,
}: CounterCardProps): ReactElement => {
  return (
    <Card className="mb-8" testId="counter-card">
      <CardBody centered>
        <CardTitle>Contador de Exemplo</CardTitle>
        <Button
          size="lg"
          onClick={onIncrement}
          data-testid="counter-button"
          aria-label="Incrementar contador"
        >
          Contagem: {count}
        </Button>
        <div className="badge badge-secondary" data-testid="counter-hint">
          Clique no botão para incrementar
        </div>
      </CardBody>
    </Card>
  );
};
