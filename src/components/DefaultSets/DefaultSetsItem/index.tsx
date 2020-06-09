import React from 'react';

import { Card, Text, TagInput, IconButton } from 'evergreen-ui';

import { useSetsState, useSetsDispatch } from '~/contexts/Sets';
import { SetsActionType, SetsState } from '~/contexts/Sets/types';

import { setWrapper, inputElements } from './styles';

interface Props {
  setKey: keyof SetsState;
}

const DefaultSetsItem = ({ setKey }: Props) => {
  const [setsState, setsDispatch] = [useSetsState(), useSetsDispatch()];

  return (
    <Card css={setWrapper}>
      <Text size={600}>{setsState[setKey]?.symbol} =</Text>
      <TagInput
        css={inputElements}
        separator="[\n\r]"
        values={[...setsState[setKey]?.values]}
        tagProps={(value: string) => {
          if (/^{.*}$/.test(value)) return { color: 'purple' };
          return { color: 'blue' };
        }}
        onChange={(values) =>
          setsDispatch({
            type: SetsActionType.OVERRIDE,
            payload: {
              key: setKey,
              value: new Set(
                values.map((value, i) => {
                  if (i === values.length - 1) {
                    value = value.replace(/^{\s*/, '{').replace(/\s*}$/, '}');
                    if (value.includes(',')) {
                      value = `{${[
                        ...new Set(
                          value
                            .toLowerCase()
                            .replace(/(^{)|(}$)/g, '')
                            .replace(/(^\s*,\s*)|(,\s*$)/g, '')
                            .split(',')
                            .map((e) => e.trim())
                            .filter((e) => e !== ''),
                        ),
                      ].join(', ')}}`;
                    }
                  }
                  return value.toLowerCase();
                }),
              ),
            },
          })
        }
      />
      <IconButton
        icon="cross"
        intent="danger"
        appearance="primary"
        onClick={() =>
          setsDispatch({
            type: SetsActionType.REMOVE_SET,
            payload: { key: setKey },
          })
        }
      />
    </Card>
  );
};

export default DefaultSetsItem;
