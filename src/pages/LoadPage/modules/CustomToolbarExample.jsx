import React from 'react';
import { toolbarPlugin } from '@react-pdf-viewer/toolbar';

export const CustomToolbarExample = () => {
  const toolbarPluginInstance = toolbarPlugin();
  const { Toolbar } = toolbarPluginInstance;

  return (
    <Toolbar>
    </Toolbar>
  );
};

