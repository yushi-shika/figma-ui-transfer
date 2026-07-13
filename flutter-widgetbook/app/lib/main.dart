import 'package:flutter/material.dart';
import 'package:widgetbook_annotation/widgetbook_annotation.dart' as widgetbook;

import 'theme/tokens.dart';
import 'widgets/app_button.dart';
import 'widgets/app_card.dart';
import 'widgets/app_input.dart';

// Marks this file as the widgetbook entry point: widgetbook_generator emits
// `main.directories.g.dart` (the `directories` list) next to this file,
// which the sibling `widgetbook/` workspace package imports.
@widgetbook.App()
void main() {
  runApp(const MyApp());
}

/// Minimal host app for the design-system components used in the
/// Figma-to-code comparison research (Flutter + Widgetbook track).
/// The actual component catalog lives in the sibling `widgetbook/` package.
class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Design System Components',
      theme: buildAppTheme(),
      home: const ComponentShowcasePage(),
    );
  }
}

class ComponentShowcasePage extends StatelessWidget {
  const ComponentShowcasePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Component Showcase')),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Button'),
            const SizedBox(height: 12),
            const AppButton(label: 'Create Account'),
            const SizedBox(height: 12),
            const AppButton(
              label: 'Buy for \$338',
              variant: AppButtonVariant.secondary,
            ),
            const SizedBox(height: 24),
            const Text('Input'),
            const SizedBox(height: 12),
            const AppInput(label: 'Full Name', initialValue: 'Reggie James'),
            const SizedBox(height: 24),
            const Text('Card'),
            const SizedBox(height: 12),
            const AppCard(
              title: "Air Jordan 1 Retro High OG 'University Blue'",
              imageAssetPath: 'assets/images/product-hero.png',
            ),
          ],
        ),
      ),
    );
  }
}
