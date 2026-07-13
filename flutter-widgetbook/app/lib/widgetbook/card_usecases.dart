// Widgetbook use-cases for AppCard.
//
// Default(★)はproduct screenのカードをそのまま再現。
// Selected(☆)はFigmaにサンプルが無いため、design-system-rules.mdの
// アクセントカラー/枠幅トークンから外挿している。
library;

import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';
import 'package:widgetbook_annotation/widgetbook_annotation.dart' as widgetbook;

import '../widgets/app_card.dart';

const _title = "Air Jordan 1 Retro High OG 'University Blue'";
const _imageAssetPath = 'assets/images/product-hero.png';
// UseCase builders always render inside the `widgetbook/` workspace app, so
// the asset (declared in this `app` package's pubspec.yaml) must be looked
// up with the owning package name.
const _imagePackage = 'app';

/// ★ Default: product screenのカードをそのまま再現。
@widgetbook.UseCase(name: 'Default', type: AppCard, path: '[Visual state]')
Widget cardDefaultUseCase(BuildContext context) {
  return const Center(
    child: AppCard(
      title: _title,
      imageAssetPath: _imageAssetPath,
      imagePackage: _imagePackage,
    ),
  );
}

/// ☆ Selected: ボーダー色→color.accent、幅→border.width.focusOrSelectedを外挿適用。
@widgetbook.UseCase(name: 'Selected', type: AppCard, path: '[Visual state]')
Widget cardSelectedUseCase(BuildContext context) {
  return const Center(
    child: AppCard(
      title: _title,
      imageAssetPath: _imageAssetPath,
      imagePackage: _imagePackage,
      state: AppCardState.selected,
    ),
  );
}

/// Playground: title/stateをknobsで操作できる。
@widgetbook.UseCase(name: 'Playground', type: AppCard, path: '[Playground]')
Widget cardPlaygroundUseCase(BuildContext context) {
  final title = context.knobs.string(label: 'title', initialValue: _title);
  final state = context.knobs.object.dropdown<AppCardState>(
    label: 'state',
    options: AppCardState.values,
    labelBuilder: (v) => v.name,
  );

  return Center(
    child: AppCard(
      title: title,
      imageAssetPath: _imageAssetPath,
      imagePackage: _imagePackage,
      state: state,
      onTap: () {},
    ),
  );
}
