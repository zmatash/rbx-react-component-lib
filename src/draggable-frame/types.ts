import { GuiThemes } from "@mattrbx/react-building-blocks";

export interface DraggableFrameColourScheme {
	icon: Color3;
	iconBackground: Color3;
	closeIconBackground: Color3;
	titleBarBackground: Color3;
	background: Color3;
}

export const DEFAULT_COLOUR_SCHEME: DraggableFrameColourScheme = {
	icon: GuiThemes["Dark Blue - Red Blush"].text[2],
	iconBackground: GuiThemes["Dark Blue - Red Blush"].text[2],
	closeIconBackground: GuiThemes["Dark Blue - Red Blush"].accent[1],
	titleBarBackground: GuiThemes["Dark Blue - Red Blush"].background[3],
	background: GuiThemes["Dark Blue - Red Blush"].background[1],
};
