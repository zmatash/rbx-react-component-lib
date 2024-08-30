import { Frame, GuiIcons } from "@mattrbx/react-building-blocks";
import React, { forwardRef } from "@rbxts/react";
import { DEFAULT_COLOUR_SCHEME, type DraggableFrameColourScheme } from "../types";
import { TitleBarBtn } from "./titlebar-btn";

export interface TitleBarProps {
	isFullscreen?: boolean;
	heightOffset?: number;
	heightScale?: number;
	colours: DraggableFrameColourScheme;
	text?: string;
	logoId?: string;
	onFullScreenClick: () => void;
	onMinimiseClick: () => void;
	onCloseClick: () => void;
}

export const TitleBar = forwardRef<Frame, TitleBarProps>(
	(
		{
			colours = DEFAULT_COLOUR_SCHEME,
			isFullscreen = false,
			heightOffset = 38,
			heightScale = 0,
			onFullScreenClick,
			onMinimiseClick,
			onCloseClick,
		}: TitleBarProps,
		ref,
	) => {
		return (
			<Frame
				key={"bar"}
				ref={ref}
				size={new UDim2(1, 0, heightScale, heightOffset)}
				backgroundColor={colours.titleBarBackground}
			>
				<uilistlayout HorizontalAlignment={"Right"} FillDirection={"Horizontal"} SortOrder={"LayoutOrder"} />
				<TitleBarBtn
					backgroundColour={colours.iconBackground}
					iconColour={colours.icon}
					image={GuiIcons.minus_64.bold}
					onClick={() => onMinimiseClick()}
					layoutOrder={1}
				/>
				{isFullscreen === false ? (
					<TitleBarBtn
						backgroundColour={colours.iconBackground}
						iconColour={colours.icon}
						image={GuiIcons.corners_out_64.bold}
						onClick={() => onFullScreenClick()}
						layoutOrder={2}
					/>
				) : (
					<TitleBarBtn
						backgroundColour={colours.iconBackground}
						iconColour={colours.icon}
						image={GuiIcons.corners_in_64.bold}
						onClick={() => onFullScreenClick()}
						layoutOrder={2}
					/>
				)}
				<TitleBarBtn
					backgroundColour={colours.closeIconBackground}
					iconColour={colours.icon}
					image={GuiIcons.x_64.bold}
					onClick={() => onCloseClick()}
					layoutOrder={3}
				/>
			</Frame>
		);
	},
);
