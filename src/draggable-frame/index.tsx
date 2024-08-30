import { Frame, GuiThemes, useHold } from "@mattrbx/react-building-blocks";
import React, { useEffect, useMemo, useRef, useState, type PropsWithChildren } from "@rbxts/react";
import { DragBtn } from "./components/drag-btn";
import { TitleBar } from "./components/title-bar";
import { useDragMove } from "./hooks/useDragMove";
import { useDragResize } from "./hooks/useDragResize";
import { DEFAULT_COLOUR_SCHEME, type DraggableFrameColourScheme } from "./types";
import { useFullscreen } from "./hooks/useFullscreen";

export interface DraggableFrameProps extends PropsWithChildren {
	fullscreen?: boolean;
	position?: UDim2;
	size?: UDim2;
	colours?: DraggableFrameColourScheme;
	titleHeightOffset?: number;
	titleHeightScale?: number;
	minimumSize?: UDim2;
}

export function DraggableFrame({
	fullscreen = false,
	position = UDim2.fromScale(0.5, 0.5),
	size = UDim2.fromOffset(600, 800),
	colours = DEFAULT_COLOUR_SCHEME,
	titleHeightOffset = 38,
	titleHeightScale = 0,
	minimumSize = UDim2.fromOffset(200, 200),
	children,
}: DraggableFrameProps) {
	const titleRef = useRef<Frame>();
	const windowRef = useRef<Frame>();
	const resizeBtnRef = useRef<ImageButton>();

	const [isFullscreen, setIsFullscreen] = useState(fullscreen);
	const [isDraggingEnabled, setIsDraggingEnabled] = useState(!isFullscreen);
	const { isHolding: isResizeHeld, isHovered: isResizeHovered } = useHold(resizeBtnRef, isDraggingEnabled);

	const [windowSize, setWindowSize] = useState(size);
	const [windowPosition, setWindowPosition] = useState(position);

	useDragMove(titleRef, windowRef, setWindowPosition, isDraggingEnabled);
	useFullscreen(windowRef, setWindowSize, setWindowPosition, isFullscreen);
	const { isHolding: isDragHeld, isHovered: isDragHovered } = useDragResize(
		resizeBtnRef,
		windowRef,
		minimumSize,
		setWindowSize,
		isDraggingEnabled,
	);

	const isResizeActive = useMemo(() => isResizeHeld || isDragHovered, [isResizeHeld, isDragHovered]);

	useEffect(() => (isFullscreen ? setIsDraggingEnabled(false) : setIsDraggingEnabled(true)), [isFullscreen]);

	const onClose = () => {
		print("Close");
	};
	const onMinimise = () => {
		print("Min");
	};
	const onFullScreen = () => setIsFullscreen((prev) => !prev);

	return (
		<Frame
			key={"draggable-frame"}
			size={windowSize}
			position={windowPosition}
			anchorPoint={new Vector2(0.5, 0.5)}
			backgroundTransparency={1}
			ref={windowRef}
		>
			<TitleBar
				colours={colours}
				ref={titleRef}
				isFullscreen={isFullscreen}
				onFullScreenClick={onFullScreen}
				onMinimiseClick={onMinimise}
				onCloseClick={onClose}
				heightOffset={titleHeightOffset}
				heightScale={titleHeightScale}
			/>
			<Frame
				key={"content-container"}
				backgroundTransparency={0}
				backgroundColor={colours.background}
				size={new UDim2(1, 0, 1, -titleHeightOffset)}
				position={new UDim2(0, 0, titleHeightScale, titleHeightOffset)}
			>
				{children}
			</Frame>
			<DragBtn
				ref={resizeBtnRef}
				imageColour={GuiThemes["Dark Blue - Red Blush"].text[2]}
				isHovered={isResizeActive}
			/>
		</Frame>
	);
}
