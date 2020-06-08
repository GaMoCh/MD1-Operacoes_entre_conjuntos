import React, { useState } from 'react';

import { Dialog, Card, Button, Alert, Text } from 'evergreen-ui';

import { useSetsState, useSetsDispatch } from '~/contexts/Sets';
import { SetsState, SetsActionType, SetType } from '~/contexts/Sets/types';

import DefaultSetsItem from './DefaultSetsItem';
import SetsInputWarning from './SetsInputWarning';
import { incrementButtonWrapper, setsContainer } from './styles';

import { SetsInputWarningData } from './SetsInputWarning/types';

interface Props {
  callback: () => void;
}

const messages = {
  title: 'Conjuntos iniciais',
  confirmLabel: 'Pronto',
  universeLabel: 'Conjunto universo',
  setsLabel: 'Outros conjuntos',
  incrementButton: 'Adicionar novo conjunto',
  warning: {
    universeEmpty: {
      title: 'Tem certeza?',
      body: 'Se o conjunto universo estiver vazio, a funcionalide "complementar" estará desabilitada.',
      confirmLabel: 'Tenho',
      cancelLabel: 'Não',
    },
    setsEmpty: {
      title: 'Não esqueceu de algo?',
      body: 'Pelo menos um conjunto deve conter algum elemento.',
    },
  },
  instructions: [
    {
      title: 'Como inserir os elementos?',
      body:
        'Insira o valor de cada elemento e aperte enter. ' +
        'Se o valor digitado conter vírgulas, o elemento será ' +
        'conjunto com os seus elementos separados pelas vírgulas.',
    },
  ],
};

const DefaultSets = ({ callback }: Props) => {
  const [{ universe, ...sets }, setsDispatch] = [useSetsState(), useSetsDispatch()];
  const [isVisible, setVisibility] = useState(true);
  const [setsInputWarningVisibility, setSetsInputWarningVisibility] = useState(false);
  const [setsInputWarningData, setSetsInputWarningData] = useState<SetsInputWarningData | undefined>(
    undefined,
  );

  return (
    <>
      <Dialog
        intent="success"
        hasClose={false}
        hasCancel={false}
        isShown={isVisible}
        title={messages.title}
        shouldCloseOnEscapePress={false}
        shouldCloseOnOverlayClick={false}
        confirmLabel={messages.confirmLabel}
        onCloseComplete={() => setVisibility(false)}
        onConfirm={() => {
          const setsValues = Object.values(sets) as SetType[];
          if (setsValues.every(({ values }) => values.size === 0)) {
            setSetsInputWarningData(messages.warning.setsEmpty);
            setSetsInputWarningVisibility(true);
          } else if (universe.values.size === 0) {
            setSetsInputWarningData(messages.warning.universeEmpty);
            setSetsInputWarningVisibility(true);
          } else {
            callback();
            setVisibility(false);
          }
        }}>
        {messages.instructions.map((message, i) => (
          <Alert key={i.toString()} appearance="card" title={message.title}>
            {message.body}
          </Alert>
        ))}
        <Card elevation={2} css={setsContainer}>
          <Text size={500}>{messages.universeLabel}</Text>
          <DefaultSetsItem setKey="universe" />
        </Card>
        <Card elevation={2} css={setsContainer}>
          <Text size={500}>{messages.setsLabel}</Text>
          {(Object.keys(sets) as Exclude<keyof SetsState, 'universe'>[]).map((key) => (
            <DefaultSetsItem key={key} setKey={key} />
          ))}
        </Card>
        <Card css={incrementButtonWrapper}>
          <Button
            iconBefore="plus"
            appearance="primary"
            disabled={Object.keys(sets).length >= 26}
            onClick={() => setsDispatch({ type: SetsActionType.ADD_SET })}>
            {messages.incrementButton}
          </Button>
        </Card>
      </Dialog>
      <SetsInputWarning
        isVisible={setsInputWarningVisibility}
        setVisibility={setSetsInputWarningVisibility}
        setParentVisibility={setVisibility}
        data={setsInputWarningData}
        callback={callback}
      />
    </>
  );
};

export default DefaultSets;
