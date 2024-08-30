import { GuiIcons, GuiThemes, ImageButton } from "@mattrbx/react-building-blocks";
import React, { forwardRef, useMemo } from "@rbxts/react";

export interface DragBtnProps {
	imageColour: Color3;
	isHovered: boolean;
}

export const DragBtn = forwardRef<ImageButton, DragBtnProps>(
	({ imageColour = GuiThemes["Dark Blue - Red Blush"].accent[2], isHovered }: DragBtnProps, ref) => {
		const imageTransparency = useMemo(() => {
			return isHovered ? 0 : 0.5;
		}, [isHovered]);

		return (
			<ImageButton
				ref={ref}
				anchorPoint={new Vector2(1, 1)}
				position={UDim2.fromScale(1, 1)}
				imageColor={imageColour}
				imageTransparency={imageTransparency}
				backgroundTransparency={1}
				size={UDim2.fromOffset(32, 32)}
				image={GuiIcons.notches_64.bold}
			/>
		);
	},
);
