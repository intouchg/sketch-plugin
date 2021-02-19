import * as React from "react";
import { Svg } from '@i/components';

const Dot = props => <Svg viewBox="0 0 8 8" {...props}><circle cx={8} cy={8} r={4} transform="translate(-4 -4)" /></Svg>;

export default Dot;