// AppCard — see docs/design-system-rules.md §2 "Card".
//
// state: default(★) | selected(☆ボーダー色→accent, 幅→focusOrSelected)
// 構成: 画像(size.card.image, object-fit: cover, radius.md) + タイトル
//       (font.size.medium, font.weight.medium)。
library;

import 'package:flutter/material.dart';

import '../theme/tokens.dart';

enum AppCardState { default_, selected }

class AppCard extends StatelessWidget {
  const AppCard({
    super.key,
    required this.title,
    required this.imageAssetPath,
    this.imagePackage,
    this.state = AppCardState.default_,
    this.onTap,
  });

  final String title;
  final String imageAssetPath;

  /// Pass `'app'` when this widget is consumed from a different root
  /// package (e.g. the `widgetbook/` workspace), so Flutter resolves the
  /// asset that's declared in this package's own pubspec.yaml. Leave null
  /// when `app` itself is the running root package.
  final String? imagePackage;
  final AppCardState state;
  final VoidCallback? onTap;

  bool get _isSelected => state == AppCardState.selected;

  @override
  Widget build(BuildContext context) {
    final borderColor = _isSelected
        ? AppColors.accent
        : AppColors.borderDefault;
    final borderWidth = _isSelected
        ? AppBorderWidth.focusOrSelected
        : AppBorderWidth.defaultWidth;

    return GestureDetector(
      onTap: onTap,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisSize: MainAxisSize.min,
        children: [
          Container(
            width: AppSizes.cardImage.width,
            height: AppSizes.cardImage.height,
            decoration: BoxDecoration(
              borderRadius: BorderRadius.circular(AppRadius.md),
              border: Border.all(color: borderColor, width: borderWidth),
            ),
            child: ClipRRect(
              borderRadius: BorderRadius.circular(AppRadius.md),
              child: Image.asset(
                imageAssetPath,
                package: imagePackage,
                fit: BoxFit.cover,
              ),
            ),
          ),
          const SizedBox(height: 8),
          SizedBox(
            width: AppSizes.cardImage.width,
            child: Text(
              title,
              style: const TextStyle(
                color: AppColors.textPrimary,
                fontSize: AppTypography.sizeMedium,
                fontWeight: AppTypography.weightMedium,
              ),
            ),
          ),
        ],
      ),
    );
  }
}
