import { useAutoSpring, useHasMounted } from "@mattrbx/react-building-blocks";
import { useEffect, useState, type Dispatch, type SetStateAction } from "@rbxts/react";
import type { SpringOptions } from "@rbxts/ripple";

const springConfig: SpringOptions = {
	frequency: 0.125,
};

export function useFullscreen(
	ref: React.RefObject<GuiObject>,
	setSize: Dispatch<SetStateAction<UDim2>>,
	setPosition: Dispatch<SetStateAction<UDim2>>,
	isFullscreen: boolean,
) {
	const hasMounted = useHasMounted();
	const [savedPosition, setSavedPosition] = useState<UDim2>(UDim2.fromScale(0.5, 0.5));
	const [savedSize, setSavedSize] = useState<UDim2>(UDim2.fromScale(1, 1));

	const { doMotion: doPositionMotion } = useAutoSpring(setPosition);
	const { doMotion: doSizeMotion } = useAutoSpring(setSize);

	useEffect(() => {
		if (!hasMounted) {
			return;
		}

		const node = ref.current;
		if (!node) {
			return;
		}

		if (isFullscreen) {
			setSavedPosition(node.Position);
			setSavedSize(node.Size);
			doPositionMotion(node.Position, UDim2.fromScale(0.5, 0.5), springConfig);
			doSizeMotion(node.Size, UDim2.fromScale(1, 1), springConfig);
		} else {
			doPositionMotion(node.Position, savedPosition, springConfig);
			doSizeMotion(node.Size, savedSize, springConfig);
		}
	}, [isFullscreen, ref]);
}
