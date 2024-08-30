import { Image, TextButton, useHover } from "@mattrbx/react-building-blocks";
import React, { useEffect, useRef, useState } from "@rbxts/react";

export interface TitleBtnProps {
	backgroundColour: Color3;
	iconColour: Color3;
	image: string;
	layoutOrder?: number;
	onClick: () => void;
}

export function TitleBarBtn({ onClick, image, iconColour, backgroundColour, layoutOrder }: TitleBtnProps) {
	const iconRef = useRef<TextButton>();
	const [backgroundTransparency, setBackgroundTransparency] = useState(1);

	const isHovered = useHover(iconRef, true);

	useEffect(() => {
		if (isHovered) {
			setBackgroundTransparency(0.5);
		} else {
			setBackgroundTransparency(1);
		}
	}, [isHovered]);

	return (
		<TextButton
			size={UDim2.fromScale(1, 1)}
			onClick={onClick}
			backgroundTransparency={backgroundTransparency}
			backgroundColor={backgroundColour}
			text=""
			ref={iconRef}
			layoutOrder={layoutOrder}
		>
			<uiaspectratioconstraint DominantAxis={"Height"} AspectRatio={1} />
			<Image
				size={UDim2.fromScale(0.75, 0.75)}
				anchorPoint={new Vector2(0.5, 0.5)}
				position={UDim2.fromScale(0.5, 0.5)}
				image={image}
				backgroundTransparency={1}
				imageColor={iconColour}
			/>
		</TextButton>
	);
}
