import React, { useState } from 'react';
import { PrimaryButton } from '../../../../shared/Buttons/PrimaryButton';

type Props = {
};

export const AddCartButton: React.FC<Props> = () => {
  const [isSelected, setIsSelected] = useState(false);

  return (
    <PrimaryButton
      isSelected={isSelected}
      onClick={() => setIsSelected(prevState => !prevState)}>
      Add to cart
    </PrimaryButton>
  );
};
