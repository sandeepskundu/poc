import { mergeProps, useFocusRing, useHover, usePress } from 'react-aria';
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

export default forwardRef(function Button(
  {
    children,
    className,
    isClicked,
    isDisabled = false,
    isFocused,
    isHovered,
    isPressed,
    leftIcon,
    rightIcon,
    tag,
    type = 'button',
    onClick,
    onStateChange,
  },
  ref,
) {
  const buttonRef = useRef(null);
  const clickedTimeout = useRef(null);
  const [localClicked, setLocalClicked] = useState(false);

  useImperativeHandle(ref, () => buttonRef.current);

  const { hoverProps, isHovered: hoverState } = useHover({
    isDisabled,
  });

  const { focusProps, isFocused: focusState, isFocusVisible } = useFocusRing({
    autoFocus: false,
    isTextInput: false,
  });

  const { pressProps, isPressed: pressState } = usePress({
    isDisabled,
    onPress() {
      onClick?.();
      setLocalClicked(true);

      if (clickedTimeout.current !== null) {
        window.clearTimeout(clickedTimeout.current);
      }

      clickedTimeout.current = window.setTimeout(() => {
        setLocalClicked(false);
      }, 220);
    },
  });

  useEffect(() => {
    return () => {
      if (clickedTimeout.current !== null) {
        window.clearTimeout(clickedTimeout.current);
      }
    };
  }, []);

  const resolvedHovered = isHovered ?? hoverState;
  const resolvedFocused = isFocused ?? focusState;
  const resolvedPressed = isPressed ?? pressState;
  const resolvedClicked = isClicked ?? localClicked;

  useEffect(() => {
    onStateChange?.({
      clicked: resolvedClicked,
      focused: resolvedFocused,
      focusVisible: isFocusVisible,
      hovered: resolvedHovered,
      pressed: resolvedPressed,
      disabled: isDisabled,
    });
  }, [
    isDisabled,
    isFocusVisible,
    onStateChange,
    resolvedClicked,
    resolvedFocused,
    resolvedHovered,
    resolvedPressed,
  ]);

  return (
    <button
      {...mergeProps(hoverProps, focusProps, pressProps)}
      ref={buttonRef}
      type={type}
      disabled={isDisabled}
      className={[
        'ra-button',
        resolvedHovered ? 'is-hovered' : '',
        resolvedFocused ? 'is-focused' : '',
        isFocusVisible ? 'is-focus-visible' : '',
        resolvedPressed ? 'is-pressed' : '',
        resolvedClicked ? 'is-clicked' : '',
        isDisabled ? 'is-disabled' : '',
        className ?? '',
      ]
        .filter(Boolean)
        .join(' ')}
      data-hovered={resolvedHovered}
      data-focused={resolvedFocused}
      data-focus-visible={isFocusVisible}
      data-pressed={resolvedPressed}
      data-clicked={resolvedClicked}
      data-disabled={isDisabled}
    >
      {leftIcon ? <span className="ra-button__icon">{leftIcon}</span> : null}
      <span className="ra-button__label">{children}</span>
      {tag ? <span className="ra-button__tag">{tag}</span> : null}
      {rightIcon ? <span className="ra-button__icon">{rightIcon}</span> : null}
    </button>
  );
});
