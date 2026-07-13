// Widgetbook use-case for SignupScreen.
//
// Unlike button/input/card_usecases.dart (which catalog one component in
// isolation), this renders the *whole* signup screen assembled from the
// existing AppInput(default)/AppButton(primary) atoms, per
// docs/figma-fixtures/screens/signup/design-context.md. Lives under its own
// "Screens" category so it stays visually distinct from the
// per-component "Visual state"/"Playground" catalog.
library;

import 'package:flutter/material.dart';
import 'package:widgetbook_annotation/widgetbook_annotation.dart' as widgetbook;

import '../widgets/signup_screen.dart';

// UseCase builders always render inside the `widgetbook/` workspace app, so
// the background/logo assets (declared in this `app` package's pubspec.yaml)
// must be looked up with the owning package name.
const _imagePackage = 'app';

/// ★ Signup: fileKey cobQGyPNOOx3MyrDicL75d, node 2:4 をそのまま再現。
@widgetbook.UseCase(name: 'Signup', type: SignupScreen, path: '[Screens]')
Widget signupScreenUseCase(BuildContext context) {
  return const Center(
    child: SignupScreen(imagePackage: _imagePackage),
  );
}
