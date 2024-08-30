import { useHold } from "@mattrbx/react-building-blocks";
import { useCallback, useEffect, useRef, type Dispatch, type RefObject, type SetStateAction } from "@rbxts/react";
import { RunService, UserInputService } from "@rbxts/services";

function convertAnchorRelativeToPosition(node: GuiObject, newAnchor: Vector2) {
	const position = node.Position;
	const size = node.Size;
	const currentAnchor = node.AnchorPoint;

	const deltaAnchor = newAnchor.sub(currentAnchor);
	const newXOffset = position.X.Offset + deltaAnchor.X * size.X.Offset;
	const newXScale = position.X.Scale + deltaAnchor.X * size.X.Scale;
	const newYOffset = position.Y.Offset + deltaAnchor.Y * size.Y.Offset;
	const newYScale = position.Y.Scale + deltaAnchor.Y * size.Y.Scale;

	node.AnchorPoint = newAnchor;
	node.Position = new UDim2(newXScale, newXOffset, newYScale, newYOffset);
}

export function useDragResize(
	dragArea: RefObject<GuiObject>,
	element: RefObject<GuiObject>,
	minSize: UDim2,
	setSize: Dispatch<SetStateAction<UDim2>>,
	isEnabled: boolean,
) {
	const { isHolding, isHovered } = useHold(dragArea, isEnabled);

	const originalAnchorRef = useRef<Vector2>();

	let dragStart: Vector2;

	const resizeElement = useCallback(
		(elementNode: GuiObject) => {
			dragStart = UserInputService.GetMouseLocation();
			originalAnchorRef.current = elementNode.AnchorPoint;
			convertAnchorRelativeToPosition(elementNode, new Vector2(0, 0));
			const size = elementNode.Size;

			return RunService.PreRender.Connect(() => {
				const mousePos = UserInputService.GetMouseLocation();
				const delta = mousePos.sub(dragStart);
				const newSize = new UDim2(size.X.Scale, size.X.Offset + delta.X, size.Y.Scale, size.Y.Offset + delta.Y);
				elementNode.Size = newSize;
			});
		},
		[element],
	);

	useEffect(() => {
		const node = element.current;
		if (!node) {
			return;
		}

		if (isHolding) {
			const stepped = resizeElement(node);
			return () => {
				stepped.Disconnect();
				convertAnchorRelativeToPosition(node, originalAnchorRef.current!);
			};
		}
	}, [isHolding]);

	return { isHovered, isHolding };
}
