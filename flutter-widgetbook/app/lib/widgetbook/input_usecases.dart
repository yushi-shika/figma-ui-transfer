// Widgetbook use-cases for AppInput.
//
// Figma上には Default 状態のみ存在する。Focus/Error/Disabled は
// design-system-rules.md のトークンからの外挿(☆)であり、
// AppInputVisualState で強制表示している(実際のFocusNode操作を伴わない
// Visual state)。Playgroundでは "auto" を選ぶと実際のフォーカス操作
// (Interactive state) を試せる。
library;

import 'package:flutter/material.dart';
import 'package:widgetbook/widgetbook.dart';
import 'package:widgetbook_annotation/widgetbook_annotation.dart' as widgetbook;

import '../widgets/app_input.dart';

/// ★ Default: signup screenの"Full Name"欄をそのまま再現。
@widgetbook.UseCase(name: 'Default', type: AppInput, path: '[Visual state]')
Widget inputDefaultUseCase(BuildContext context) {
  return const Center(
    child: AppInput(label: 'Full Name', initialValue: 'Reggie James'),
  );
}

/// ☆ Focus: ボーダー色→color.accent、幅→border.width.focusOrSelectedを強制適用。
@widgetbook.UseCase(name: 'Focus', type: AppInput, path: '[Visual state]')
Widget inputFocusUseCase(BuildContext context) {
  return const Center(
    child: AppInput(
      label: 'Full Name',
      initialValue: 'Reggie James',
      visualState: AppInputVisualState.focus,
    ),
  );
}

/// ☆ Error: ボーダー色→color.errorを強制適用。
@widgetbook.UseCase(name: 'Error', type: AppInput, path: '[Visual state]')
Widget inputErrorUseCase(BuildContext context) {
  return const Center(
    child: AppInput(
      label: 'Email',
      initialValue: 'invalid-email',
      visualState: AppInputVisualState.error,
    ),
  );
}

/// ☆ Disabled: opacity.disabledを強制適用し、実際に編集不可にする。
@widgetbook.UseCase(name: 'Disabled', type: AppInput, path: '[Visual state]')
Widget inputDisabledUseCase(BuildContext context) {
  return const Center(
    child: AppInput(
      label: 'Full Name',
      initialValue: 'Reggie James',
      visualState: AppInputVisualState.disabled,
    ),
  );
}

/// Playground: label/initialValue/obscureText/visualStateをknobsで操作。
/// visualStateを"auto"にすると実際のフォーカス(Interactive state)を試せる。
@widgetbook.UseCase(name: 'Playground', type: AppInput, path: '[Playground]')
Widget inputPlaygroundUseCase(BuildContext context) {
  final label = context.knobs.string(label: 'label', initialValue: 'Password');
  final initialValue = context.knobs.string(
    label: 'initialValue',
    initialValue: '',
  );
  final obscureText = context.knobs.boolean(
    label: 'obscureText',
    initialValue: true,
  );
  final visualState = context.knobs.object.dropdown<AppInputVisualState>(
    label: 'visualState',
    options: AppInputVisualState.values,
    labelBuilder: (v) => v.name,
  );

  return Center(
    child: AppInput(
      label: label,
      initialValue: initialValue,
      obscureText: obscureText,
      visualState: visualState,
    ),
  );
}
