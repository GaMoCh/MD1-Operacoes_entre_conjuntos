import React from 'react';

import { Dialog } from 'evergreen-ui';

import { Props } from './types';

const SetsInputWarning = ({ isVisible, setVisibility, setParentVisibility, data, callback }: Props) => {
  return data !== undefined ? (
    <Dialog
      intent="warning"
      isShown={isVisible}
      title={data.title}
      hasFooter={data.confirmLabel !== undefined}
      hasCancel={data.cancelLabel !== undefined}
      confirmLabel={data.confirmLabel ?? ''}
      cancelLabel={data.cancelLabel ?? ''}
      onCloseComplete={() => setVisibility(false)}
      onConfirm={() => {
        setVisibility(false);
        setParentVisibility(false);
        callback();
      }}>
      {data.body}
    </Dialog>
  ) : null;
};

export default SetsInputWarning;
