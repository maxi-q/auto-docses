import styled from 'styled-components'
import { COLORS } from '../../constants/style/COLORS';

export const PlaceholderMod =  styled.div<{focusVisible: boolean}>`
  position: absolute;
  max-width: ${props => props.focusVisible ? "200px": "0"};
  z-index: 0;
  top: -12px;
  left: 5px;

  background-color: ${ COLORS.gray100 };
  padding: 0  ${props => props.focusVisible ? "4px": "0"};

  border-radius: 3px;

  white-space: nowrap;
  overflow: hidden;
  font-size: 12px;
  color: ${ COLORS.gray900 };
  line-height: 15px;
  transition: all .3s linear;
`
