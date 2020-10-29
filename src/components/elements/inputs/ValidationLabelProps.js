import React from 'react';

export function getValidationLabelProps(meta, label) {
  const { touched, dirty, error } = meta;

  const isError = (dirty || touched) && error !== undefined;

  const errorSpan = <span className="text red">{error}</span>;
  const errorIcon = isError ? 'exclamation triangle' : undefined;

  const labelSpan = (
    <label>
      {label} {isError && errorSpan}
    </label>
  );

  return { label: labelSpan, isError, errorIcon };
}
