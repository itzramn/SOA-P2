import React from 'react';

const DetailsSelector = props => {
   const { item, onEditItem } = props;

   return (
      <select
         item={item}
         onEditItem={onEditItem}
      />
   );
};

export default DetailsSelector;
