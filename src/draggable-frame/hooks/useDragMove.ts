import { useHold } from "@mattrbx/react-building-blocks";
import { useCallback, useEffect, type Dispatch, type RefObject, type SetStateAction } from "@rbxts/react";
import { GuiService, RunService, UserInputService } from "@rbxts/services";

export function useDragMove(
	dragArea: RefObject<GuiObject>,
	mainElement: RefObject<GuiObject>,
	setPosition: Dispatch<SetStateAction<UDim2>>,
	isEnabled: boolean,
) {
	const { isHolding, isHovered } = useHold(dragArea, isEnabled);

	let dragStart: Vector2;
	const moveElement = useCallback(
		(elementNode: GuiObject) => {
			const elementPos = elementNode.AbsolutePosition;
			const elementAnchor = elementNode.AnchorPoint;
			dragStart = UserInputService.GetMouseLocation();
			const offset = elementPos.sub(dragStart);
			const inset = GuiService.GetGuiInset()[0];

			return RunService.PreRender.Connect(() => {
				const mousePos = UserInputService.GetMouseLocation().add(inset);
				const x = mousePos.X + offset.X + elementNode.AbsoluteSize.X * elementAnchor.X;
				const y = mousePos.Y + offset.Y + elementNode.AbsoluteSize.Y * elementAnchor.Y;
				setPosition(UDim2.fromOffset(x, y));
			});
		},
		[mainElement],
	);

	useEffect(() => {
		const dragNode = dragArea.current;
		const elementNode = mainElement.current;

		if (elementNode && dragNode && isHolding && isEnabled) {
			const stepped = moveElement(elementNode);
			return () => {
				stepped.Disconnect();
			};
		}
	}, [isHolding]);
}
