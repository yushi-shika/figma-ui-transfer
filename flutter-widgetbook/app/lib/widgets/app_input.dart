// AppInput — see docs/design-system-rules.md §2 "Input".
//
// state: default(★) | focus(☆ボーダー色→accent, 幅→focusOrSelected)
//        | error(☆ボーダー色→error) | disabled(☆opacity.disabled)
//
// "Visual state" (この enum) は Widgetbook の knobs で強制表示するための
// 見た目の上書きに使う。実際のタップ/フォーカス/文字入力といった
// "Interactive state" は通常の FocusNode/TextEditingController に委ねる
// (design-system-rules.md §2 "Visual state vs Interactive state" 参照)。
library;

import 'package:flutter/material.dart';

import '../theme/tokens.dart';

enum AppInputVisualState {
  /// 強制表示なし。実際のFocusNodeの状態をそのまま反映する(Interactive)。
  auto,
  focus,
  error,
  disabled,
}

class AppInput extends StatefulWidget {
  const AppInput({
    super.key,
    required this.label,
    this.initialValue,
    this.obscureText = false,
    this.visualState = AppInputVisualState.auto,
    this.onChanged,
  });

  final String label;
  final String? initialValue;
  final bool obscureText;
  final AppInputVisualState visualState;
  final ValueChanged<String>? onChanged;

  @override
  State<AppInput> createState() => _AppInputState();
}

class _AppInputState extends State<AppInput> {
  late final TextEditingController _controller;
  late final FocusNode _focusNode;
  bool _obscured = true;
  bool _hasRealFocus = false;

  @override
  void initState() {
    super.initState();
    _controller = TextEditingController(text: widget.initialValue);
    _obscured = widget.obscureText;
    _focusNode = FocusNode()
      ..addListener(() {
        setState(() => _hasRealFocus = _focusNode.hasFocus);
      });
  }

  @override
  void dispose() {
    _controller.dispose();
    _focusNode.dispose();
    super.dispose();
  }

  bool get _isDisabled => widget.visualState == AppInputVisualState.disabled;
  bool get _isError => widget.visualState == AppInputVisualState.error;
  bool get _isForcedFocus => widget.visualState == AppInputVisualState.focus;
  bool get _isAuto => widget.visualState == AppInputVisualState.auto;

  Color get _borderColor {
    if (_isDisabled) return AppColors.borderDefault;
    if (_isError) return AppColors.error;
    if (_isForcedFocus) return AppColors.accent;
    if (_isAuto && _hasRealFocus) return AppColors.accent;
    return AppColors.borderDefault;
  }

  double get _borderWidth {
    if (_isError || _isForcedFocus) return AppBorderWidth.focusOrSelected;
    if (_isAuto && _hasRealFocus) return AppBorderWidth.focusOrSelected;
    return AppBorderWidth.defaultWidth;
  }

  @override
  Widget build(BuildContext context) {
    final field = Container(
      height: AppSizes.inputHeight,
      padding: const EdgeInsets.symmetric(horizontal: 12),
      decoration: BoxDecoration(
        color: AppColors.surfaceInput,
        borderRadius: BorderRadius.circular(AppRadius.sm),
        border: Border.all(color: _borderColor, width: _borderWidth),
      ),
      child: Row(
        children: [
          Expanded(
            child: TextField(
              controller: _controller,
              focusNode: _focusNode,
              enabled: !_isDisabled,
              obscureText: widget.obscureText && _obscured,
              onChanged: widget.onChanged,
              style: const TextStyle(
                color: AppColors.textPrimary,
                fontSize: AppTypography.sizeBody,
                fontWeight: AppTypography.weightRegular,
              ),
              decoration: const InputDecoration(
                border: InputBorder.none,
                isDense: true,
              ),
            ),
          ),
          if (widget.obscureText)
            GestureDetector(
              onTap: _isDisabled
                  ? null
                  : () => setState(() => _obscured = !_obscured),
              child: Text(
                _obscured ? 'hide' : 'show',
                style: const TextStyle(
                  color: AppColors.textMuted,
                  fontSize: AppTypography.sizeBody,
                  fontWeight: AppTypography.weightRegular,
                ),
              ),
            ),
        ],
      ),
    );

    return Opacity(
      opacity: _isDisabled ? AppOpacity.disabled : 1.0,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Text(
            widget.label,
            style: const TextStyle(
              color: AppColors.textPrimary,
              fontSize: AppTypography.sizeBody,
              fontWeight: AppTypography.weightRegular,
            ),
          ),
          const SizedBox(height: 6),
          field,
        ],
      ),
    );
  }
}
