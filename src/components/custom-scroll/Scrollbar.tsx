import React from 'react';
import Box from '@mui/material/Box';
import useMediaQuery from '@mui/material/useMediaQuery';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

interface PropsType {
  children: React.ReactNode;
  sx?: object;
}

const Scrollbar = (props: PropsType) => {
  const { children, sx, ...other } = props;
  const lgDown = useMediaQuery('(max-width: 1279px)');

  if (lgDown) {
    return <Box sx={{ overflowX: 'auto' }}>{children}</Box>;
  }

  return (
    <SimpleBar style={{ maxHeight: '100%' }} {...other}>
      {children}
    </SimpleBar>
  );
};

export default Scrollbar;
