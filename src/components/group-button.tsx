import React from 'react';

import useViewMode from '../hooks/use-view-mode';
import GridModeButton from './grid-mode-button';
import ListModeButton from './list-mode-button';

export default function GroupButton(): React.ReactElement {
  const { viewMode, setViewMode } = useViewMode();

  return (
    <div className="flex gap-2">
      <ListModeButton active={viewMode === 'list'} onClick={() => setViewMode('list')} />
      <GridModeButton active={viewMode === 'grid'} onClick={() => setViewMode('grid')} />
    </div>
  );
}
