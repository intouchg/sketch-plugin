import React from 'react'
import { StyledIcon } from './StyledIcon'
import type { IconProps } from './StyledIcon'

const NotInSketchIcon = (props: IconProps) => (
	<StyledIcon
		viewBox="0 0 24 26"
		{...props}
	>
		<defs>
			<path
				d="M12,15.6590097 L21,24.6590097 L3,24.6590097 L12,15.6590097 Z M1.04402673e-08,3.65900974 L9,12.6590097 L3.55271368e-14,21.6590097 L1.04402673e-08,3.65900974 Z M24,3.65900974 L23.999,21.6580097 L15,12.6590097 L24,3.65900974 Z M21,0.659009735 L12,9.65900974 L3.00000001,0.659009741 L21,0.659009735 Z"
				id="path-1"
			/>
		</defs>
		<g transform="translate(-0.000000, 0.340990)">
			<path
				d="M3.10050507,2.10050506 L12.0853983,11.0846118 L21.0710678,2.10050506 C21.4615921,1.70998077 22.0947571,1.70998077 22.4852814,2.10050506 C22.8758057,2.49102936 22.8758057,3.12419433 22.4852814,3.51471863 L13.4993983,12.4996118 L21.4852814,20.4852814 C21.8758057,20.8758057 21.8758057,21.5089706 21.4852814,21.8994949 C21.0947571,22.2900192 20.4615921,22.2900192 20.0710678,21.8994949 L12.0853983,13.9136118 L4.10050507,21.8994949 C3.70998078,22.2900192 3.0768158,22.2900192 2.68629151,21.8994949 C2.29576722,21.5089706 2.29576722,20.8758057 2.68629151,20.4852814 L10.6703983,12.4996118 L1.68629151,3.51471863 C1.29576722,3.12419433 1.29576722,2.49102936 1.68629151,2.10050506 C2.0768158,1.70998077 2.70998078,1.70998077 3.10050507,2.10050506 Z"
				fill="#ff2660"
				fillRule="nonzero"
			/>
			<mask
				id="mask-2"
				fill="white"
			>
				<use xlinkHref="#path-1" />
			</mask>
			<g mask="url(#mask-2)">
				<g transform="translate(0.000000, 0.325676)">
					<polygon
						fill="#FDB300"
						fillRule="nonzero"
						points="5.22580648 0.713613496 11.9758065 0 18.7258065 0.713613496 23.9516129 7.72879699 11.9758065 21.674498 0 7.72879699"
					/>
					<g
						strokeWidth="1"
						fill="none"
						fillRule="evenodd"
						transform="translate(0.000000, 7.728797)"
					>
						<polygon
							fill="#EA6C00"
							fillRule="nonzero"
							points="4.85080203 0 11.9758173 13.9457056 0 0"
						/>
						<polygon
							fill="#EA6C00"
							fillRule="nonzero"
							transform="translate(17.963693, 6.972853) scale(-1, 1) translate(-17.963693, -6.972853) "
							points="16.8265869 0 23.9516021 13.9457056 11.9757849 0"
						/>
						<polygon
							fill="#FDAD00"
							fillRule="nonzero"
							points="4.85080203 0 19.1008325 0 11.9758173 13.9457056"
						/>
					</g>
					<g
						strokeWidth="1"
						fill="none"
						fillRule="evenodd"
					>
						<polygon
							fill="#FDD231"
							fillRule="nonzero"
							points="11.9758173 0 5.2257868 0.713604061 4.85080203 7.72879188"
						/>
						<polygon
							fill="#FDD231"
							fillRule="nonzero"
							transform="translate(15.538288, 3.864396) scale(-1, 1) translate(-15.538288, -3.864396) "
							points="19.1007957 0 12.3507652 0.713604061 11.9757805 7.72879188"
						/>
						<polygon
							fill="#FDAD00"
							fillRule="nonzero"
							transform="translate(21.338709, 4.221198) scale(-1, 1) translate(-21.338709, -4.221198) "
							points="18.7257849 7.72879188 23.9516326 0.713604061 23.5765869 7.72879188"
						/>
						<polygon
							fill="#FDAD00"
							fillRule="nonzero"
							points="0 7.72879188 5.2257868 0.713604061 4.85080203 7.72879188"
						/>
						<polygon
							fill="#FEEEB7"
							fillRule="nonzero"
							points="11.9758173 0 4.85080203 7.72879188 19.1008325 7.72879188"
						/>
					</g>
				</g>
			</g>
		</g>
	</StyledIcon>
)

export { NotInSketchIcon }