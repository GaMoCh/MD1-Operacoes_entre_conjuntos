import React, { useState, FormEvent } from 'react';

import { Card, Button, SelectMenu, Position, Heading, toaster, Text } from 'evergreen-ui';

import { useSetsState, useSetsDispatch } from '~/contexts/Sets';
import { SetsState, SetType, SetsActionType } from '~/contexts/Sets/types';
import actions from '~/core/sets';
import operations from '~/model/sets';
import { SetsOperationsType, SetsOperations, SimpleSet } from '~/model/sets/types';

import { body, aside, main, setsInputs } from './styles';

type SetsInputValues = { setA?: keyof SetsState; setB?: keyof SetsState };

const messages = {
  selectMenuTitle: 'CONJUNTO',
  submitLabel: 'CALCULAR',
  setsInputsEmpty: 'Os conjuntos necessários não foram adicionados',
  questionMessage: {
    single: 'Qual o conjunto?',
    multi: 'Quais os conjuntos?',
  },
};

const Body = () => {
  const initialValue = { setA: undefined, setB: undefined };
  const [setsState, setsDispatch] = [useSetsState(), useSetsDispatch()];
  const [setsInputValues, setSetsInputValues] = useState<SetsInputValues>(initialValue);
  const [currentOperation, setCurrentOperation] = useState<SetsOperationsType>(SetsOperationsType.UNION);

  const currentOperandsAmount = operations[currentOperation].operandsAmount;

  function formSubmitHandler(event: FormEvent) {
    const toSimpleSet = (set: SetType | undefined) => {
      if (set === undefined) return undefined;
      return {
        symbol: set.symbol,
        values: set.values,
      };
    };

    event.preventDefault();

    const setA = setsState[setsInputValues.setA as keyof SetsState];
    const setB =
      currentOperation !== SetsOperationsType.COMPLEMENT
        ? setsState[setsInputValues.setB as keyof SetsState]
        : setsState.universe;

    const oneSetEmpty = currentOperandsAmount <= 1 && setA === undefined;
    const twoSetsEmpty = currentOperandsAmount === 2 && setB === undefined;

    if (oneSetEmpty || twoSetsEmpty) {
      toaster.warning(messages.setsInputsEmpty, { id: '' });
      return;
    }

    const { source, values } = actions[currentOperation](
      toSimpleSet(setA as SetType) as SimpleSet,
      toSimpleSet(setB as SetType) as SimpleSet,
    );

    setSetsInputValues(initialValue);

    setsDispatch({
      type: SetsActionType.CREATE_SET,
      payload: {
        source,
        values,
      },
    });
  }

  const InputsMenu = ({ id }: { id: 'setA' | 'setB' }) => (
    <SelectMenu
      hasTitle={false}
      hasFilter={false}
      position={Position.BOTTOM}
      options={(Object.keys(setsState) as (keyof SetsState)[]).map((setKey) => ({
        label: (setsState[setKey] as SetType).symbol,
        value: setKey,
      }))}
      onSelect={({ value }) => setSetsInputValues({ ...setsInputValues, [id]: value })}>
      <Button type="button">
        {setsState[setsInputValues[id] as keyof SetsState]?.symbol || messages.selectMenuTitle}
      </Button>
    </SelectMenu>
  );

  return (
    <section css={body}>
      <Card is="aside" elevation={1} css={aside}>
        {(Object.keys(operations) as (keyof SetsOperations)[]).map((operation, i) => (
          <Button
            key={i.toString()}
            appearance={operation === currentOperation ? 'primary' : 'default'}
            disabled={operation === SetsOperationsType.COMPLEMENT && setsState.universe.values.size === 0}
            onClick={() => {
              setSetsInputValues(initialValue);
              setCurrentOperation(operation);
            }}>
            {operations[operation].name}
          </Button>
        ))}
      </Card>
      <Card is="main" elevation={1} css={main}>
        <form onSubmit={formSubmitHandler}>
          <Heading is="h2" size={900}>
            {currentOperandsAmount > 1 ? messages.questionMessage.multi : messages.questionMessage.single}
          </Heading>
          <Card css={setsInputs}>
            <InputsMenu id="setA" />
            {currentOperandsAmount === 2 && (
              <>
                <Text size={600}>{operations[currentOperation].symbol}</Text>
                <InputsMenu id="setB" />
              </>
            )}
          </Card>
          <Button
            type="submit"
            appearance="primary"
            intent="success"
            disabled={Object.keys(setsState).length > 26}>
            {messages.submitLabel}
          </Button>
        </form>
      </Card>
    </section>
  );
};

export default Body;
