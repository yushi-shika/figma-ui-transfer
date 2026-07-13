// Widgetbook use-cases for AppButton.
//
// "[Visual state]" 以下は design-system-rules.md §2 の variant/size/disabled
// を固定表示する UseCase。"[Playground]" は knobs で全パラメータを
// インタラクティブに試せる UseCase。
library;

import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';
import 'package:widgetbook_annotation/widgetbook_annotation.dart' as widgetbook;

import '../widgets/app_button.dart';

/// ★ Primary: signup screenの"Create Account"ボタンをそのまま再現。
@widgetbook.UseCase(name: 'Primary', type: AppButton, path: '[Visual state]')
Widget buttonPrimaryUseCase(BuildContext context) {
  return const Center(
    child: AppButton(
      label: 'Create Account',
      variant: AppButtonVariant.primary,
    ),
  );
}

/// ★ Secondary: product screenの"Buy for $338"セグメントボタンを再現。
@widgetbook.UseCase(name: 'Secondary', type: AppButton, path: '[Visual state]')
Widget buttonSecondaryUseCase(BuildContext context) {
  return const Center(
    child: AppButton(
      label: 'Buy for \$338',
      variant: AppButtonVariant.secondary,
    ),
  );
}

/// ☆ Disabled: Figmaにサンプルなし。opacity.disabledを外挿適用。
@widgetbook.UseCase(name: 'Disabled', type: AppButton, path: '[Visual state]')
Widget buttonDisabledUseCase(BuildContext context) {
  return const Center(
    child: AppButton(
      label: 'Create Account',
      variant: AppButtonVariant.primary,
      disabled: true,
    ),
  );
}

/// Playground: variant/size/disabled/labelをすべてknobsで操作できる。
@widgetbook.UseCase(name: 'Playground', type: AppButton, path: '[Playground]')
Widget buttonPlaygroundUseCase(BuildContext context) {
  final variant = context.knobs.object.dropdown<AppButtonVariant>(
    label: 'variant',
    options: AppButtonVariant.values,
    labelBuilder: (v) => v.name,
  );
  final size = context.knobs.object.dropdown<AppButtonSize>(
    label: 'size',
    options: AppButtonSize.values,
    labelBuilder: (v) => v.name,
  );
  final disabled = context.knobs.boolean(
    label: 'disabled',
    initialValue: false,
  );
  final label = context.knobs.string(
    label: 'label',
    initialValue: 'Create Account',
  );

  return Center(
    child: AppButton(
      label: label,
      variant: variant,
      size: size,
      disabled: disabled,
      onPressed: () {},
    ),
  );
}
