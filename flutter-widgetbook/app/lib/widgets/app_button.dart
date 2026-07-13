// AppButton — see docs/design-system-rules.md §2 "Button".
//
// variant (primary/secondary): ★ 両方Figmaに実例あり。
// size (s/m/l): ☆ Figmaは1サイズ(m)のみ。s/lはスケール外挿。
// disabled: ☆ opacity.disabled を適用。
library;

import 'package:flutter/material.dart';

import '../theme/tokens.dart';

enum AppButtonVariant { primary, secondary }

enum AppButtonSize { s, m, l }

class AppButton extends StatelessWidget {
  const AppButton({
    super.key,
    required this.label,
    this.variant = AppButtonVariant.primary,
    this.size = AppButtonSize.m,
    this.disabled = false,
    this.onPressed,
  });

  final String label;
  final AppButtonVariant variant;
  final AppButtonSize size;
  final bool disabled;
  final VoidCallback? onPressed;

  /// ★ mはFigma実測値。☆ s/lはmからのスケール外挿(±8pxを基準に按分)。
  double get _baseHeight => variant == AppButtonVariant.primary
      ? AppSizes.buttonHeightPrimary
      : AppSizes.buttonHeightSecondary;

  double get _height {
    switch (size) {
      case AppButtonSize.s:
        return _baseHeight - 9;
      case AppButtonSize.m:
        return _baseHeight;
      case AppButtonSize.l:
        return _baseHeight + 9;
    }
  }

  double get _fontSize {
    final base = variant == AppButtonVariant.primary
        ? AppTypography.sizeBody
        : AppTypography.sizeMedium;
    switch (size) {
      case AppButtonSize.s:
        return base - 1;
      case AppButtonSize.m:
        return base;
      case AppButtonSize.l:
        return base + 1;
    }
  }

  double get _horizontalPadding {
    switch (size) {
      case AppButtonSize.s:
        return 16;
      case AppButtonSize.m:
        return 24;
      case AppButtonSize.l:
        return 32;
    }
  }

  @override
  Widget build(BuildContext context) {
    final isPrimary = variant == AppButtonVariant.primary;
    final backgroundColor = isPrimary
        ? AppColors.buttonPrimaryBg
        : AppColors.buttonSecondaryBg;
    final border = isPrimary
        ? Border.all(
            color: AppColors.borderMuted,
            width: AppBorderWidth.defaultWidth,
          )
        : null;
    final fontWeight = isPrimary
        ? AppTypography.weightRegular
        : AppTypography.weightMedium;

    final content = Container(
      height: _height,
      alignment: Alignment.center,
      padding: EdgeInsets.symmetric(horizontal: _horizontalPadding),
      decoration: BoxDecoration(
        color: backgroundColor,
        borderRadius: BorderRadius.circular(AppRadius.sm),
        border: border,
      ),
      child: Text(
        label,
        textAlign: TextAlign.center,
        style: TextStyle(
          color: AppColors.textOnDark,
          fontSize: _fontSize,
          fontWeight: fontWeight,
        ),
      ),
    );

    return Opacity(
      opacity: disabled ? AppOpacity.disabled : 1.0,
      child: IgnorePointer(
        ignoring: disabled,
        child: GestureDetector(
          onTap: disabled ? null : onPressed,
          child: content,
        ),
      ),
    );
  }
}
